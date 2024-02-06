/*
 * basic-preferences.js - version 1
 *
 * This example shows how to add a new category to the
 * Preferences dialog. It uses a FillInPreferenceCategory,
 * which makes it easy to describe the controls and map
 * them to user settings.
 * 
 * It assumes that everything that we want to add can
 * be described using one of the control types that the
 * FillInPreferenceCategory provides for us. If that is
 * not the case, things get more complicated. See the
 * custom-preferences.js example.
 */

let myPrefs = new arkham.dialog.prefs.FillInPreferenceCategory(
    // the category name
    "My Custom Prefs",
    // the image resource to use for the category
    "icons/prefs/drawing.png"
);

// Specify the controls to show. Notice that the interactive
// controls specify which user setting key to bind the user's
// selection to.
myPrefs.heading("My Custom Preference Options");
myPrefs.subheading("Go-faster stripes");
// when adding a checkbox, the final argument lets you invert the
// logic --- if you want it to be checked when the setting is false,
// pass true, otherwise false
myPrefs.addCheckBox("my-go-faster-setting", "Always include racing stripes", false);
myPrefs.subheading("Vehicle");
myPrefs.addField("my-car-name", "Name", 20);
myPrefs.label("Colour");
myPrefs.join();
myPrefs.addDropDown("my-car-color", ["Blue", "Orange"], ["car-blue", "car-orange"]);
myPrefs.note("No other colours are available.")
myPrefs.addRange("my-car-range", "Mileage*", 10, 1000, 10);

// a list of setting keys for which, if their value changes, Strange Eons
// must be restarted before they will take effect
myPrefs.addResetKeys("my-car-range");

// Add our custom category, demo it, and then remove it again:
const Preferences = arkham.dialog.prefs.Preferences;
Preferences.registerCategory(myPrefs);
Eons.window.showPreferencesDialog(null, myPrefs);
Preferences.unregisterCategory(myPrefs);