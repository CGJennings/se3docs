/*
 * region-hacker.js
 * An example plug-in that allows you to modify the regions
 * on a component and write your changes to its private settings.
 */

useLibrary( 'uilayout' );
useLibrary( 'uicontrols' );
useLibrary( 'imageutils' );
useLibrary( 'threads' );

importClass( java.lang.Integer );
importClass( ca.cgjennings.ui.dnd.ScrapBook );

const RegionChooser = arkham.RegionPicker.RegionChooser;


function getName() {
	return 'Region Hacker';
}

function getDescription() {
	return 'Edit regions on a component interactively';
}

function getVersion() {
	return 3.0;
}

/**
 * Returns true if the current component can be hacked. This allows the Toolbox
 * menu item to be enabled/disabled appropriately.
 */
function isUsable() {
	return getEditor() != null;
}





/**
 * If the active editor has a game component with at least one face,
 * returns the editor. Otherwise returns null.
 */
function getEditor() {
	var editor = Eons.activeEditor;
	if( editor == null ) return null;
	var component = editor.gameComponent;
	if( component == null ) return null;
	// decks and case books have no sheets
	try {
		if( component.sheets != null ) {
			return editor;
		}
	} catch( ex ) {}
	return null;
}





/**
 * Adjust the relative font size of a component.
 * comp : component to adjust
 * dSize : change in size
 * returns the component
 */
function changeFontSize( comp, dSize ) {
	if( !(comp instanceof swing.JComponent) ) {
		comp = new swing.JLabel( comp.toString() );
	}
	var font = comp.font;
	font = font.deriveFont( font.size2D + dSize );
	comp.font = font;
	return comp;
}





/**
 * Returns a sorted array of all of the -region setting keys
 * visible from a component. The "-region" suffix is left off.
 * component : the component to get region keys from
 */
function getRegionKeys( component ) {
	function appendRegionKeys( list, keys ) {
		var filter = /\-region$/;
		var suffixLength = '-region'.length;
		for( let i=0; i<keys.length; ++i ) {
			if( filter.test( keys[i] ) ) {
				regionKeys.add( keys[i].substring( 0, keys[i].length() - suffixLength ) );
			}
		}
	}

	var regionKeys = new java.util.TreeSet();
	var settingsChain = [ component.settings ];
	while( settingsChain[ settingsChain.length-1 ].parent != null ) {
		settingsChain[ settingsChain.length ] = settingsChain[ settingsChain.length-1 ].parent;
	}
	for( let i=settingsChain.length-1; i>=0; --i ) {
		appendRegionKeys( regionKeys, settingsChain[i].keySet.toArray() );
	}
	return regionKeys.toArray();
}




/**
 * Creates and displays a region hacker for the current component.
 */
function run() {
	var editor = getEditor();
	if( editor == null ) {
		alert( 'Select a component editor first', true );
		return;
	}

	var component = editor.gameComponent;
	var sheets = component.sheets;
	var settings = component.settings;
	var regionKeys = getRegionKeys( component );

	// create the hacker window
	var regionPanel = new Grid( 'fillx' );
	var regionField = autocompletionField( regionKeys, true );
	var xField = changeFontSize( spinner( -1000, 9999, 1, 0, updateEditedRegion ), -2);
	var yField = changeFontSize( spinner( -1000, 9999, 1, 0, updateEditedRegion ), -2);
	var wField = changeFontSize( spinner(     1, 9999, 1, 1, updateEditedRegion ), -2);
	var hField = changeFontSize( spinner(     1, 9999, 1, 1, updateEditedRegion ), -2);
	var doNotUpdatePicker = false;

	var closeBtn = button( @close, null, function actionPerformed( evt ) { dialog.dispose(); } );
	var mousePos = new swing.JLabel( 'x: , y: ' );

	// sets the current region in the spinner fields
	function setRegion( r ) {
		xField.value = Integer.valueOf( r.x );
		yField.value = Integer.valueOf( r.y );
		wField.value = Math.max( 1, Integer.valueOf( r.width ) );
		hField.value = Math.max( 1, Integer.valueOf( r.height ) );
		if( !doNotUpdatePicker ) {
			picker.region = r;
		}
	}

	// returns the current region from the spinner fields
	function getRegion() {
		return new Region( xField.value, yField.value, wField.value, hField.value );
	}

	// A RegionChooser is a component that displays a zoomable, scrollable view of an
	// image and allows a region to be defined over it using a pointing device.
	var picker = new RegionChooser();
	picker.addRegionChangeListener( function regionChanged( source, region ) {
		doNotUpdatePicker = true;
		try {
			setRegion( region );
		} finally {
			doNotUpdatePicker = false;
		}
	});
	
	function mouseMovedHandler( evt ) {
		var p = picker.mousePosition;
		if( p != null ) {
			picker.viewToModel( p, p );
			mousePos.text = 'x: ' + p.x + ', y: ' + p.y;
		} else {
			mousePos.text = 'x: , y: ';
		}		
	}
	picker.addMouseMotionListener({
		mouseMoved: mouseMovedHandler,
		mouseDragged: mouseMovedHandler
	});

	picker.regionColor = new Color( 0xff0044 );
	var zoom = new spinner( 1, 32, 1, 1, function actionPerformed( evt ) {
		picker.zoom = evt.source.value;
	} );
	// update our control if user changes zoom directly with mouse
	picker.addPropertyChangeListener( function pcl( evt ) {
		if( evt.propertyName == RegionChooser.ZOOM_CHANGED_PROPERTY ) {
			zoom.value = evt.newValue;
		}
	});
	picker.restrictedRegion = false;

	// Gets an image of the selected sheet at the template resolution
	// and sets it as the image in the region picker control. The first
	// call to this is made when the window first gains focus (see below).
	function updatePickerImage() {
		if( getEditor() != editor ) return;
		var sheet = editor.selectedSheet;
		var image = sheet.paint(
			arkham.sheet.RenderTarget.PREVIEW,
			sheet.templateResolution
		);
		picker.image = image;
	}

	// Copy the current key and value to the clipboard.
	function copy( use$Format ) {
		var r = getRegion();
		if( use$Format ) {
			ScrapBook.text = '$' + regionField.selectedItem.replace( '-', '_' ) + "_region = '"
				+ r.x + ',' + r.y + ',' + r.width + ',' + r.height + "';\n";
		} else {
			ScrapBook.text = regionField.selectedItem + '-region = '
				+ r.x + ',' + r.y + ',' + r.width + ',' + r.height + '\n';
		}
	}

	// Change the edited region to the current regionField combo box value.
	function changeEditedRegion() {
		try {
			var value = settings.get( regionField.selectedItem + '-region' );
			var region;
			if( value == null ) {
				value = '';
				region = new Region(-1,-1,1,1);
			} else {
				region = resources.Settings.region( value );
			}
			setRegion( region );
			picker.scrollRectToSelection();
		} catch( ex ) {
			error.handleUncaught( ex );
		}
	}

	// Copy the field to the picker control.
	function updateEditedRegion() {
		picker.region = getRegion();
	}

	// Add appropriate listeners to update the value fields and region picker
	// as the fields are edited.
	regionField.editor.editorComponent.document.addDocumentListener( new ca.cgjennings.ui.DocumentEventAdapter() {
		changedUpdate: changeEditedRegion
	});

	var writeToCompBtn = button( '&Write Setting to Component', null, function write() {
		var r = getRegion();
		var value = '' + r.x + ',' + r.y + ',' + r.width + ',' + r.height;
		settings.set( regionField.selectedItem + '-region', value );
		editor.forceRerender();
		updatePickerImage();
	});
	writeToCompBtn.enabled = editor ? true : false;

	regionPanel.place(
		'Key',   'gapleft 0', regionField, 'span 4, growx, wrap',
		'Value', '',          xField, 'pushx 25, growx 25', yField, 'pushx 25, growx 25', wField, 'pushx 25, growx 25', hField, 'pushx 25, growx 25, gapbottom unrel, wrap',
		writeToCompBtn, 'span 5, right'
	);
	regionPanel.title = 'Region';

	var copySettingBtn = button( 'Copy &Setting', null, function() { copy( false ); } );
	copySettingBtn.toolTipText = '<html>Copy as a key and value for a setting file<br><tt>key = x,y,w,h';
	var copy$NotationBtn = button( 'Copy $ &Code', null, function() { copy( true ); } );
	copy$NotationBtn.toolTipText = '<html>Copy as a script variable assignment using $-notation<br><tt>$key = \'x,y,w,h\'';


	var zoomRow = new Grid( 'insets 0, fillx' );
	zoomRow.place( mousePos, 'left, growx', changeFontSize( 'Zoom', -2 ), 'split 2, right', changeFontSize( zoom, -2 ), 'wrap' );

	var panel = new Grid( 'fillx' );
	panel.place(
		zoomRow.realize(), 'span, growx, wrap, gapbottom unrel',
		regionPanel, 'span, growx, wrap',
		copySettingBtn, 'sg copy', ' ', 'growx', copy$NotationBtn, 'sg copy, right, wrap',
		closeBtn, 'span, right, bottom'
	);

		
	var pickerScroll = new swing.JScrollPane( picker );
	pickerScroll.border = swing.BorderFactory.createMatteBorder( 0, 0, 1, 0, Color.GRAY );

	var dialogPanel = new Grid( 'fillx', '', '' );
	dialogPanel.place(
		pickerScroll, 'h 200px, push 100 100, grow 100 100, wrap',
		panel, 'south, growy 0'
	);

	var dialog = new swing.JDialog( Eons.window, false );
	dialog.title = getName() + ' (' + component.fullName + ')';
	dialog.resizable = true;
	dialog.setContentPane( dialogPanel.realize() );
	dialog.pack();
	// Whenever this window gains focus, update the image from the
	// current component state; if the user edits the card and comes
	// back we pick up the changes.
	dialog.addWindowFocusListener( new java.awt.event.WindowFocusListener() {
		windowGainedFocus: updatePickerImage
	} );
	// initialize the value field and selected region
	changeEditedRegion();
	var tabPane = AbstractContainer.findEditorTabPane( editor );
	if( tabPane ) dialog.setLocationRelativeTo( tabPane );
	ca.cgjennings.ui.JUtilities.makeUtilityWindow( dialog );
	dialog.visible = true;
}

if( sourcefile == 'Quickscript' )
	run();