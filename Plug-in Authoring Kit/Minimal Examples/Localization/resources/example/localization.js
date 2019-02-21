/*
 * localization.js
 */


function getName() {
	return 'Localization Example';
}

function getDescription() {
	return 'Example of a localized plug-in';
}

function getVersion() {
	return 1.0;
}

function getPluginType() {
	return arkham.plugins.Plugin.INJECTED;
}

function initialize() {
	// The strings we want translated have been added to a string table
	// (rocket.properties and rocket_fr.properties). To access the strings,
	// we load the table and add it to the global interface Language instance.
	Language.getInterface().addStrings("example/rocket");	
	// If these strings were going to be drawn on game components, we would
	// instead use Language.getGame().addStrings(...), and below in order to
	// look up the strings from the game database we would use #key-name
	// instead of @key-name.
}

/**
 * Since this is an INJECTED plug-in, this gets called as soon as the plug-in
 * is loaded and initialized.
 */
function run() {
	// Writing @key-name will look up and return the string assigned to key-name
	// in the interface language. The closest translation that matches the active
	// interface language is selected. In this case that will be the default English
	// translation unless you are using French as the interface language.
	if(confirm.choose(
	    // This will look up the value of rocket-prompt in the rocket string table
		@rocket-prompt,
		// These are plain string literals, so they are not translated
		"Localization Example (" + Language.getInterface().locale + ")",
		// This will look up the value of rocket-btn in the rocket string table
		@rocket-btn,
		// This is a standard string key built into Strange Eons
		@cancel
	) === 0) {
		alert("\ud83d\ude80");
	}
}

if(sourcefile == "Quickscript") {
	run();
}