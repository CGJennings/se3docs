# Settings file resources

**File extension:** `.settings `

Settings files are used to store a collection of [setting](dm-settings.md) definitions. Setting files let you define values for a group of features, like the regions where the various elements of a card will be drawn, in a single compact file. Instead of being hard coded in a script and spread all over your code, they are all collected together in one place. And, if you decide to change the value later, you only need to update the definition in the `.settings` file and the new value will be used throughout your script without having to manually update each use. Although setting files are optional, many features in the DIY game components are built around reading configuration values from settings.

To *create a new settings resource*, right click a folder inside a plug-in task and choose **New/Settings File**.

To *edit a settings resource*, double click the resource file in the project pane to open the [code editor](dm-code-editor.md).

## Accessing settings in a settings file

The [Settings](assets/javadoc/resources/Settings.html) class can be used to interpret values in the settings files in various ways, such as resource locations, numbers, rectangular regions, and more. To access the settings in a given resource, you can use:

```js
let s = new Settings();
s.addSettingsFrom(path);
```

Settings instances *inherit* missing settings from a parent scope. If no scope is specified when creating the Settings instance, it will inherit from the global scope. To inherit from another scope, specify it in the constructor:

```js
let s = new Settings(Settings.shared);
s.addSettingsFrom(path);
```

When creating a new DIY game component, the new component will have its own (initially empty) settings instance. You can initialize the component’s settings from a file instead of hard coding them:

```js
function create( diy ) {
  // ...
  diy.settings.addSettingsFrom("path/to/initial/diy.settings");
  // ...
}
```

Alternatively, you can store default values for all of your component's in the [master settings for the relevant game](dm-setting-hierarchies.md).

## File format

Settings files are plain text files that follow a specific syntax. Generally, each line in the file defines one setting using the format:

```properties
key-name = text value
```

The equals sign separates the name (called the key) from the value assigned to the name. Long values can be split over multiple lines: if the last character in a line is a backslash (`\`) then any spaces at the start of the next line will be ignored, and the rest of the line will be joined to the current line. This can be repeated for as many lines as required. For example:

```properties
# This will define the key alphabet to have
# the value ABCDEFGHIJKLMNOPQRSTUVWXYZ:
alphabet = ABCD\
    EFGHIJK\
    LMNOPQRSTUVWXYZ
next-key = since the previous line has no backslash, \
    this is the next setting definition
```

As shown in the above example, lines whose first non-space character is a hash (`#`) are considered to be comments for human readers of the file and are ignored by Strange Eons. Blank lines are also ignored.

Characters that cannot be encoded in the ISO-8859-1 text encoding must be represented by writing `\u` followed the hexadecimal Unicode value. However, the Strange Eons code editor will handle this translation for you automatically when you load and save the file. 