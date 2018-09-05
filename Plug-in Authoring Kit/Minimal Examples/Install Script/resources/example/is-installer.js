/*
   This is the install script for the plug-in;
   it defines functions that will be called
   when the plug-in bundle is (un)installed.
   In order to work, the root file must contain
   an installer property that names this file.
   
   Installers should not assume that the
   application window is available, so for
   this demo we are printing messages to the
   standard output stream and playing a beep.
   
   See javadoc:ca/cgjennings/apps/arkham/plugins/InstallationActions
   for additional details.
 */


/**
 * install( pluginBundle )
 * Called after the bundle is linked to the application,
 * but before the plug-in is loaded.
 */
function install( pluginBundle ) {
	java.awt.Toolkit.getDefaultToolkit().beep();
	java.lang.System.out.println( 'install called for ' + pluginBundle.file.name );
}

/**
 * uninstall( pluginBundle )
 * Called when the application is exiting after the
 * user requests that the plug-in be uninstalled.
 */
function uninstall( pluginBundle ) {
	java.awt.Toolkit.getDefaultToolkit().beep();
	java.lang.System.out.println( 'uninstall called for ' + pluginBundle.file.name );
}