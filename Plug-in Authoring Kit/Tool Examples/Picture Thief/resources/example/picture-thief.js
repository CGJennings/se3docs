/*
 * picture-thief.js - version 5.1
 * A plug-in that uses the imageutils library's ImageUtils.view to display
 * and/or save a game component's portraits. This script also demonstrates
 * the basics of localizing the interface strings in a component.
 */

useLibrary( 'imageutils' );

importClass( arkham.component.PortraitProvider );
importClass( arkham.component.Portrait );

// This line adds the strings defined in the picture-thief.properties
// family of files to the table of interface strings. When you look
// these strings up by their key, you will get the version that is
// translated to the UI locale (if available; otherwise you'll get
// the default definition in the base file).
Language.getInterface().addStrings( 'example/picture-thief' );

// Note: for strings in the game language, change getInterface() to getGame()
// and use #key or gstring( key ) instead of @key and string( key ).

/**
 * getName()
 * Returns the short name of the plug-in, which is used to label the
 * menu item.
 */
function getName() {
	// The @variable syntax looks up a UI string; the line below is equivalent to
	// the line "return string( 'picthief-name' );" which in turn is equivalent to
	// the line "Language.getInterface().get( 'picthief-name' );" (although the
	// meaning of string() can be redefined to mean something else).
	return @picthief_name;
}

/**
 * getDescription()
 * Returns the longform description of the plug-in.
 */
function getDescription() {
	return @picthief_desc;
}

/**
 * getVersion()
 * Returns the current version number for the plug-in.
 */
function getVersion() {
	return 5.1;
}

/**
 * run()
 * Activates the plug-in, checking for a component, getting the portraits (if any),
 * and displaying each in a window.
 */
function run() {
	if( !Component ) {
		// The next two strings are not defined in picture-thief.properties, but
		// instead come from the main Strange Eons application strings.
		alert( @err_no_gc, true );
		return;
	}

	if( !(Component instanceof PortraitProvider) || Component.portraitCount == 0 ) {
		alert( @err_no_portraits, true );
		return;
	}

	// Create one window for each portrait; the Image.view function creates a preview
	// window that includes an option to save the image to a file.
	for( var i=0; i<Component.portraitCount; ++i ) {
		var title = sprintf( '%s %.0f', Component.getFullName(), i+1 );
		var portrait = Component.getPortrait(i);
		// check that this has a unique image and is not linked to another portrait:
		// for example, it will skip an Investigator's token, which uses the same
		// image as the investigator portrait but a different scale and position
		if( portrait.features.contains( Portrait.Feature.SOURCE ) ) {
			ImageUtils.view( Component.getPortrait(i).getImage(), title, false );
		}
	}
}

/**
 * isUsable()
 * Returns false if there is no active editor or the active editor
 * does not have any portraits. This causes the Toolbox menu item to be enabled
 * or disabled accordingly.
 */
function isUsable() {
	var component = Eons.activeGameComponent;
	return component != null
		&& component instanceof PortraitProvider
		&& component.portraitCount != 0;
}

if( sourcefile == 'Quickscript' ) {
	run();
}