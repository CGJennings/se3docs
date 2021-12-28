/*
 * bleed-margin-diy.js
 *
 * Since this example only needs to paint the template image and
 * set a bleed margin and corner radius, we don't need a complete
 * DIY component script. This example uses the "prefab" library
 * to handle painting. See the "Prefab" example for details.
 *
 * Run this file to see the demo component.
 * This example requires Strange Eons 3.3 or newer.
 */

useLibrary('prefab');

// All the interesting stuff is in bleed-margin.settings!
pfBaseKey = 'bleed-margin';

// load settings during testing
if (sourcefile == 'Quickscript') {
    Settings.shared.addSettingsFrom('res:example/bleed-margin.settings');
}