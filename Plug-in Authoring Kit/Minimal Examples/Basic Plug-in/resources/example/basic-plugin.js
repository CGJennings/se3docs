/*
 * basic-plugin.js
 * This is an example of a basic activated plug-in.
 * Activated plug-ins are shown in the Toolbox menu and are
 * *activated* when the user selects their menu item.
 */

/**
 * Returns a short name for the plug-in that is used
 * for the plug-in's Toolbox menu item.
 */
function getName() {
    return 'Ring My Bell';
}


/**
 * Returns a brief description of the plug-in; this is used
 * as a tool tip for the plug-in's menu item in the Toolbox menu
 * and as a description in the Plug-in Manager.
 */
function getDescription() {
    return 'A basic example plug-in';
}


/**
 * Returns a version number for the plug-in. The version number
 * helps the user to tell which version of a plug-in they are using,
 * but Strange Eons only considers the timestamp encoded in the
 * plug-in bundle's catalogue ID when it needs to compare plug-in
 * versions.
 */
function getVersion() {
    return 1.0;
}

/**
 * This function is called when the user activates the plug-in.
 * It is where you write the code that makes the plug-in do...
 * whatever it does. The variables Eons, Editor, and PluginContext
 * provide access to the application window, editor window
 * (if any), and a PluginContext instance.
 */
function run() {
    println( 'Plug-in activated' );
    bellClip.play();
}

/**
 * This function is called when the plug-in is being unloaded
 * and will no longer be used. It allows you to free any
 * resources you are using or perform other cleanup.
 */
function unload() {
	// If we successfully created the ClipPlayer object, it
	// needs to be closed when we are done in order to free
	// up the resources used by the audio system.
	if( bellClip != null ) {
		bellClip.close();
		bellClip = null;
	}
}

/*
   Since this code is not in a function, it will be called when
   the plug-in is started. The ClipPlayer object will be used
   to play a bell sound when the plug-in is activated.
*/
var bellClip = new ca.cgjennings.ui.ClipPlayer(
	new java.net.URL( 'res://example/bell.wav' ), false
);

/*
   The expression
       sourcefile == 'Quickscript'
   will be true if the script is run in the Quickscript
   window or using the Run command in the script editor.
   It lets us simulate the user activating the plug-in
   while we are testing and developing the code.
*/
if( sourcefile == 'Quickscript' ) {
	run();
	unload();
}