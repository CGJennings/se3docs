/*
 * is-plugin.js
 * This is an example of a plug-in with an installation script.
 */

function getName() {
    return 'Installation Script Example';
}

function getDescription() {
    return 'A plug-in example that demonstrates installation scripts';
}

function getVersion() {
    return 1.0;
}

function run() {
	alert( 'Installer Example: Plug-in loaded' );
}

function unload() {
	alert( 'Installer Example: Plug-in unloaded' );
}

/**
 * An INJECTED plug-in is loaded at the same time as regular
 * ACTIVATED plug-ins, but it does not appear in the Toolbox
 * menu. Instead, its run() function is called once when the
 * plug-in is loaded.
 */
function getPluginType() {
	return arkham.plugins.Plugin.INJECTED;
}