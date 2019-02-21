/**
 * tab-synch.js
 *
 * Synchronizes the project selection with the selected editor
 * (when the selected editor changes, it is selected in the
 * project view when possible; when the project selection
 * changes, it is becomes the selected editor tab when possible).
 */

useLibrary( 'project' );
importClass( arkham.StrangeEonsEditor );
const AppMenu = arkham.StrangeEonsAppWindow.AppMenu;
const ProjectEventListener = arkham.StrangeEonsAppWindow.ProjectEventListener;
const SelectionListener = ProjectView.SelectionListener;

const SETTING_KEY = 'tab-synch-enabled';

function getName() {
	return 'Synchronize Project Selection';
}

function getDescription() {
	return 'Synchronizes the project selection and selected editor tab';
}

function getVersion() {
	return 1.0;
}

function getPluginType() {
	// INJECTED because we will add our own custom menu item
	// to the view menu rather than using the Toolbox menu
	return arkham.plugins.Plugin.INJECTED;
}

function initialize() {
}

// a custom menu item added to the View menu
// to control whether syncing is enabled
var menuItem;

// listens for changes to the active editor
// so it can sync the project selection
var editorListener;

// listens for changes in the open project;
// whenever the current project changes,
// we need to detach the selection listener
// from the old project view (and add it to the one,
// if any)
var projListener;

// listens for changes to the project selection
// so it can sync the selected editor
var selListener;

// tracks the view that the selection listener is
// attached to
var attachedView;

function run() {
	// if this is being run for the first time, there
	// is no default for the sync option so we enable it
	if( Settings.user.get( SETTING_KEY ) == null ) {
		Settings.user.set( SETTING_KEY, 'yes' );
	}	
	try {
		installEditorListener();
		installProjectListener();
		installMenuItem();
	} catch( ex ) {
		Error.handleUncaught( ex );
	}
}

function unload() {
	try {
		uninstallMenuItem();
		uninstallProjectListener();
		uninstallEditorListener();
	} catch( ex ) {
		Error.handleUncaught( ex );
	}
}

/**
 * Creates and installs a checkable menu item in the View menu.
 */
function installMenuItem() {
	if( menuItem != null ) uninstallMenuItem();

	menuItem = new swing.JCheckBoxMenuItem( getName() );
	menuItem.toolTipText = getDescription();
	menuItem.icon = ResourceKit.getIcon( '/resources/cgj/tabsynch/tab-synch.png' );
	// set whether it is checked initially based on user preference
	menuItem.selected = Settings.user.getYesNo( SETTING_KEY );
	// add the menu item to the app window
	Eons.window.addMenuItem( AppMenu.VIEW, menuItem );
}

/**
 * Uninstalls the View menu item, if installed.
 */
function uninstallMenuItem() {
	if( menuItem == null ) return;
	// store whether syncing is enabled as the new default
	Settings.user.set( SETTING_KEY, menuItem.selected ? 'yes' : 'no' );
	// remove the menu item from the app window
	Eons.window.removeMenuItem( AppMenu.VIEW, menuItem );
	menuItem = null;
}

/**
 * A convenience function that returns true if the plug-in
 * is completely installed and syncing is enabled.
 */
function isEnabled() {
	return menuItem != null && menuItem.selected;
}

/**
 * Installs an editor listener that is called when the selected tab changes
 * and will update the selected project member accordingly.
 */
function installEditorListener() {
	if( editorListener != null ) uninstallEditorListener();
	editorListener = new StrangeEonsEditor.EditorListener {
		editorSelected: function editorSelected( ed ) {
			// check is syncing enabled and there is a new editor
			if( ed == null || !isEnabled() ) return;
			// check if the editor has a file
			var f = ed.file;
			if( f == null ) return;
			// check if there is a project view and if the file is in the project
			var pv = Eons.window.openProjectView;
			if( pv == null ) return;
			var m = pv.project.findMember( f );
			if( m == null ) return;
			// check if the member is already selected; if not, change the selection
			var sel = pv.selectedMembers;
			for( let i=0; i<sel.length; ++i ) {
				if( sel[i] == m ) return;
			}
			pv.select( m );
		}
	};
	Eons.window.addEditorListener( editorListener );
}

/**
 * Uninstalls the editor listener that listens for changes to
 * the active tab, if any.
 */
function uninstallEditorListener() {
	if( editorListener == null ) return;
	Eons.window.removeEditorListener( editorListener );
	editorListener = null;
}

/**
 * Installs a listener that monitors for project changes
 * and attaches a selection listener to the new project view
 * when a project is opened.
 */
function installProjectListener() {
	if( projListener != null || selListener != null ) uninstallProjectListener();
	// when attached to a project view, listens for selection changes and
	// selects the matching editor, if any
	selListener = new SelectionListener {
		projectSelectionChanged: function projectSelectionChanged( viewEvent ) {
			if( !isEnabled() ) return;

			var m = viewEvent.selection;
			if( m.length == 0 ) return;
			// only consider the last-selected thing
			m = m[ m.length-1 ];
			var editors = Eons.window.getEditorsShowingFile( m.file );
			if( editors.length == 0 ) return;
			// if any editor showing the file is already selected,
			// don't change the selection
			for( let i=0; i<editors.length; ++i ) {
				if( Editor == editors[i] ) return;
			}
			// there are one or more editors showing the file, and
			// none of them is selected, so select the first one
			editors[0].select();
		}
	};
	// when the project changes, detach selListener from the old one
	// and attach it to the new one
	projListener = new ProjectEventListener {
		projectOpened: function projectOpened( proj ) {
			reattachSelectionListener();
		},
		projectClosing: function projectClosing( proj ) {
			reattachSelectionListener();
		}
	};
	Eons.window.addProjectEventListener( projListener );
	// if there is project open now, attach a selection listener immediately
	reattachSelectionListener();
}

/**
 * Uninstalls the listener that listens for the project to change
 * in order to attach a selection listener. Also removes the current
 * selection listener, if one is installed.
 */
function uninstallProjectListener() {
	if( selListener != null ) {
		if( attachedView != null ) {
			attachedView.removeSelectionListener( selListener );
		}
		selListener == null;
	}
	if( projListener == null ) return;
	Eons.window.removeProjectEventListener( projListener );
	projListener = null;
}

/**
 * Detaches the project selection listener from the previous
 * project view, if any, and attaches it to the new view, if any.
 * Called when the open project changes.
 */
function reattachSelectionListener() {
	if( selListener == null ) return;

	var pv = Eons.window.openProjectView;
	if( attachedView != pv ) {
		if( attachedView != null ) {
			attachedView.removeSelectionListener( selListener );
		}
		if( pv != null ) {
			pv.addSelectionListener( selListener );
		}
		attachedView = pv;
	}
}

testProjectScript();