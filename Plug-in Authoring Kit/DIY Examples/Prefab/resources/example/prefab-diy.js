/*
 * prefab-diy.js
 *
 * The prefab library can be used to create components with common
 * layouts entirely from settings. All the script needs to do is
 * set the value of the variable pfBaseKey to the prefix of the
 * family of settings keys to use. See the documentation for
 * the prefab library for more information (Help|Librarian).
 */
 
 useLibrary( 'prefab' );
 
 pfBaseKey = 'demo';
 
 
 // load settings during testing
 if( sourcefile == 'Quickscript' ) {
 	Settings.shared.addSettingsFrom( 'res:example/prefab.settings' );
 }