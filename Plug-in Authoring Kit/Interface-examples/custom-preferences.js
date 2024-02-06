/*
 * custom-preferences.js - version 2
 *
 * This example demonstrates one way to add a custom
 * control to a preferences category. A preferences category
 * is a custom section in the Preferences dialog that lets
 * users manage settings specific to your plug-in. It is
 * easy to create one using the FillInPreferenceCategory, which
 * lets you add headings, labels, and controls just by calling
 * some methods. With these methods, you specify the type of
 * control and the setting key that stores its value, and the
 * FillInPreferenceCategory takes care of loading and storing
 * the value. 
 * 
 * This example is a little more in-depth: it adds a custom
 * control not already supported by FillInPreferenceCategory.
 * (Not really, it's just a text field! But we will pretend
 * it isn't supported for the purpose of this example.)
 * To add a custom control not provided by the
 * class, you have two choices: create a control that implements
 * the SettingBackedControl interface and add it with the add()
 * method, or subclass the FillInPreferenceCategory class and
 * override the loadSettings() and storeSettings() methods to
 * read and write the settings values and update the control state.
 * This script demonstrates the second method, but a similar
 * process can be used for the first method (except you would
 * subclass a component class and also make it implement the
 * SettingBackedControl interface).
 *
 * Because FillInPreferenceCategory is a class and not an
 * interface, and because we need to pass in parameters
 * to its constructor, we need to extend it using a more
 * complex method than is used for simple listeners, using
 * the special JavaAdapter built-in. The comments below
 * provide full details on this process.
 */

// This is the control we will manage ourselves. We don't need to, as
// FillInPreferenceCategory provides full support for text fields already,
// but this is a convenient choice for example purposes.

let myControl = new swing.JTextField(20);

// You need to use JavaAdapter to extend Java classes in nontrivial ways:

let myPrefs = new JavaAdapter(
    // This is the class you want to extend:
    arkham.dialog.prefs.FillInPreferenceCategory,
    // After the class you could also have a list of interfaces to implement,
    // but we don't need to do that here.
    // (Java is single inheritance, so at most one class is allowed, but
    // any number of interfaces)

    // After the class/interface list, you provide a script object with the
    // functions (methods) that you want to override from the superclass:
    {
        loadSettings: function() {
            // This weird syntax lets us call the superclass, in this case
            // so that it will load settings for the *managed* controls.
            this.super$loadSettings();

            // Now that we took care of managed controls, we can set up
            // our unmanaged controls:
            let msss = this.settings.get('my-super-secret-setting', 'shhhh!!');
            printf("Loaded the secret setting '%s'.\n", msss);
            myControl.text = msss;
        },
        storeSettings: function() {
            // Again, we want to let the superclass do its thing:
            this.super$storeSettings();

            // And then we can examine our custom controls and write our
            // own settings out accordingly:
            let msss = myControl.text;
            this.settings.set('my-super-secret-setting', msss);
            printf("Stored the secret setting '%s'.\n", msss);
        }
    },

    // These are the parameters for the FillInPreferenceCategory constructor:
    // that constructor has more than one possible signature; we're using
    // the (String,String) one that takes a title and icon resource.
    'My Custom Prefs',
    'icons/prefs/drawing.png'
);

// This demonstrates myPrefs REALLY is a subclass, so you can pass it to any
// part of the API that calls for a PreferenceCategory without type errors:
println(myPrefs.getClass().getSuperclass());

// Call some methods on the superclass, including adding both a managed
// control AND the text field that we will manage ourselves:
myPrefs.heading('Obvious stuff');
myPrefs.addCheckBox('my-super-obvious-setting', 'Obvious setting is obvious', true);
myPrefs.heading('Secret stuff');
myPrefs.label('Set the super secret setting to:');
myPrefs.addUnmanagedControl(myControl);

// Add our custom category, demo it, and then remove it again:
const Preferences = arkham.dialog.prefs.Preferences;
Preferences.registerCategory(myPrefs);
Eons.window.showPreferencesDialog(null, myPrefs);
Preferences.unregisterCategory(myPrefs);