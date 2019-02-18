# Extend the **Preferences** dialog

Plug-ins can add their own categories to the [**Preferences**](um-ui-preferences.md) dialog. For example, a plug-in that supports a new game could add a category with settings related to how to lays out that game's components. The relevant classes can be found in the [`arkham.dialog.prefs`](assets/javadoc/ca/cgjennings/apps/arkham/dialog/prefs/package-summary.html) package.

## Registering a category

All preference categories implement the [PreferenceCategory](assets/javadoc/ca/cgjennings/apps/arkham/dialog/prefs/PreferenceCategory.html) interface. Categories are added by registering them with [Preferences.registerCategory(category)](assets/javadoc/ca/cgjennings/apps/arkham/dialog/prefs/Preferences.html#registerCategory-ca.cgjennings.apps.arkham.dialog.prefs.PreferenceCategory-); they can subsequently be removed with [Preferences.unregisterCategory(category)](assets/javadoc/ca/cgjennings/apps/arkham/dialog/prefs/Preferences.html#unregisterCategory-ca.cgjennings.apps.arkham.dialog.prefs.PreferenceCategory-). 

## Designing a new category

For complete control over the contents of the category, implement the PreferenceCategory interface directly:

`getTitle()`  
Returns the human-friendly name of the category, localized if possible.

`getIcon()`  
Returns the icon to use for the category; ideally this is 48 by 48 pixels with a transparent background.

`getPanel()`  
Returns a `JPanel` containing the controls to display when the category is selected.

`loadSettings()`  
Called by the app before the category's panel is displayed so that the panel's controls can be updated to the correct state.

`storeSettings()`  
Called by the app when the user accepts the changes made in the dialog. The category is expected to update the user setting values to reflect any changes made to the panel controls.

`isRestartRequired()`  
Called by the app after `storeSettings()` returns. This should return `true` if and only if the user changed a setting in such a way that the change cannot take effect until Strange Eons quits and restarts.

> If you decide to create a category from scratch, take care to match the visual style of the existing categories, particularly in the use of a solid white background and gold-coloured headings (#876705).

### Easy category creation

The [FillInPreferenceCategory](assets/javadoc/ca/cgjennings/apps/arkham/dialog/prefs/FillInPreferenceCategory.html) is an easy-to-use implementation of the PreferenceCategory interface that can manage most of the details of creating a new category. First, create a new instance, passing the constructor a title and resource path for the icon, as in:

```js
let myPrefCategory = new arkham.dialog.prefs.FillInPreferenceCategory(
	"My Category Name", "examples/icons/my-pref-category.png"
);
```

Second, add the desired controls by calling these methods on your new category instance:

`heading(String headingText)`   
Adds a major heading label (and resets the current indentation level).

`subheading(String subheadingText)`  
Adds a subheading label (and resets the current indentation level).

`label(String labelText)`  
Adds a plain label.

`note(String text)`  
Adds a small note (smaller than a standard label and other text).

`join()`  
Causes the previously added control and the next added control to be grouped together on a single line.

`indent()` / `unindent()`  
Subsequent controls will be indented one level or a previous indentation moved back one level, respectively.

`addCheckBox(String key, String text, boolean invert)`  
Adds a check box tied to the setting `key`; if `invert` is true then the check box with show the reverse of the setting key value (if the setting value is false, the box will be checked and vice-versa).

`addDropDown(String key, String[] labels, String[] values)`  
Adds a dropdown menu tied to the setting `key`; the given `labels` are shown to the user in the dropdown, while the given `values` are the matching setting values. For example, if the `values` are `["ch0", "ch1"]` and the `labels` are `["Option 1", "Option 2"]`, then a setting value of `ch1` will appear in the dropdown as *Option 2*.

`addRange(String key, String label, int min, int max, int stepSize)`  
Adds a numeric field tied to the setting `key` that accepts integer values between `min` and `max` inclusive and which can be stepped through in `stepSize` increments.

`addField(String key, String label, int cols)`  
Adds a text field tied to the setting `key` that edits the value of the setting key directly.

`addButton(String label, ActionListener pressHandler)`  
Adds a button; the `pressHandler` is called when the button is pressed.

`addRadioButton(String label, ActionListener pressHandler)`  
Adds a new radio button with the specified `label`. The button will be part of the *current button group* (only one button in a given group can be selected at a time).

`startNewButtonGroup()`  
Starts a new radio button group, which becomes the new *current button group*.

`addUnmanagedControl(JComponent uc)`  
Adds a component that will not be automatically mapped to setting values; handling this control and any related settings values will be up to you. You can subclass FillInPreferenceCategory and override `loadSettings()`, `storeSettings()`, and `isRestartRequired()` as needed. The [Plug-in Authoring Kit](dm-pak.md) includes an [example](https://github.com/CGJennings/se3docs/blob/master/Plug-in%20Authoring%20Kit/Code%20Snippets%20and%20Demos/custom-preferences.js) that demonstrates how to accomplish this.

`addHelp(String helpPage, String label, boolean isWikiPage)`  
Adds a help button that will open a Web page; if `isWikiPage` is `true`, the button will open a page in the standard documentation whose name is given by `helpPage`.

`addTip(String tipText)`  
Adds a small tip icon that will display the `tipText` when the mouse pointer is placed over it (or it is clicked/touched).

Methods that add a new control also return that control. You can use this to further customize the control style, enable or disable controls, and so on. If you need to enable or disable controls depending on certain setting values, you will want to override `loadSettings()` to set their initial state.

If some of your settings require restarting Strange Eons when their value changes, specify their key names by calling `addResetKeys(String... keyNames)`.

## A complete example

The following example script code registers a new category that is built with FillInPreferenceCategory:

```js
// This adds all of the preference classes to the global namespace,
// so we can use, e.g., FillInPreferenceCategory instead of
// arkham.dialog.prefs.FillInPreferenceCategory.
importPackage(arkham.dialog.prefs);

// The FillInPreferencesCategory was designed especially for script code
// the arguments are a title and the location of an image resource to use
// for the icon, ideally 48x48 pixels.
var pc = new FillInPreferenceCategory('Example', 'icons/application/update.png');

// This code adds content to the category. When a control is added, the
// first argument is the setting key that will be linked to the value.
pc.heading('Example Category');
pc.label('This is an example of a custom preference category.');
pc.addField('pcexample-name', 'Name', 30); // 30 is the number of columns
pc.join(); // this will join the name field and the pop-up help onto a single line
pc.addTip('Enter any name you like, except Tim.');
pc.indent(); // this will indent controls one level until the next heading or subheading
// When adding a checkbox, use true for the third argument to invert the relationship
// between the setting and the control (so, false is checked and true is unchecked).
// Sometimes it is easier to describe the setting's meaning this way.
pc.addCheckBox('pcexample-use-name', 'Always call me by name', false);
pc.unindent(); // this undoes one level of indent
pc.label("Beverage Preference:");
pc.indent();
// The first array of strings is how the items will appear in the list;
//     the second is the setting value to use for each one:
pc.addDropDown('pcexample-drink', ['Water', 'Coffee', 'Tea'], ['W', 'C', 'T']);

pc.subheading('Reset Example');
pc.label('A restart message will be shown if this setting is changed');
pc.addCheckBox('pcexample-restart', 'Offer to restart for changes to take effect', false);
pc.indent();
pc.note('Seriously, don\'t change this unless you want to see the restart banner.');

// Call this with a list of all of the settings keys which require a restart to take
// effect. This example only has one such key, but we could also write something like
// pc.addResetKeys('key1', 'key2', 'key3'), with as many keys as needed.
pc.addResetKeys('pcexample-restart');

// This adds our new category to the preferences dialog.
// (It can also be unregistered to remove it.)
Preferences.registerCategory(pc);
```