# Settings

A setting is similar to a named variable or constant, but unlike a variable in a script file, its is not tied to the script that defines it. In fact, it may not be defined by a script at all. For example, all of the user's [preference options](um-ui-preferences.md) are stored as settings. These settings can be accessed and changed from anywhere and they are automatically saved. Every game component also has a collection of settings associated with it. These are called the component's *private settings*, and they are automatically saved and loaded for you as part of the component's save file. For this reason, most game component scripts use a component's private settings to store the state of the component (that is, all of the values that the user can change, like "Strength" or "Gold"). They are also used by Strange Eons to store the component's game and expansion symbol.

Like a variable, a setting has two parts: a *name* and a *value*, like `name = "Bullroarer"`. Both the name and the value have to be strings, but Strange Eons provides a host of functions that let you [convert other types of data to and from suitable strings](assets/javadoc/resources/Settings.html) so this is not a problem in practice.

## Getting and setting settings

The [Settings class](assets/javadoc/resources/Settings.html) is used to work with a collection of settings. To get the value of one of named strings in a collection of settings, call the `get(key)` or `get(key, defaultValue)` method. (If the `defaultValue` is specified, that value will be returned if the setting you ask for is not actually defined; otherwise you will get `null` in this case.) To set the value, call `set(key, newValue)`. Because working with settings is so common, script code usually uses a shorthand method to get and set settings, [$-notation](dm-dollar-notation.md). This lets you write code like `let x = $setting-name;` instead of `let x = mySettings.get("setting-name");`

The following code will look up the value of the `imexport-format` setting in the setting collection that stores user preferences:

```js
let prefs = Settings.shared;
let exportFormatPref = prefs.get("imexport-format");
println(exportFormatPref);
```

This setting stores the name of the image format that was last used when exporting a game component to images using custom settings, so it's value might be something like `jpg` or `png`.

## Sources of settings

As mentioned earlier, collections of settings are available from a [variety of sources](dm-setting-collections.md): game components, system preferences, project task folders, registered games, and more. You can also create new collections of your own, and you can load groups of settings from a [resource file](dm-res-settings.md) stored in your plug-in.

## Setting hierarchies

Most setting collections are linked to another setting collection, called its *parent settings*. If you request a key that is not defined in a setting collection, the parent settings will also be checked. For example, the settings that store user preferences link to a parent collection that contains a default value for every preference. You can use the same idea to define default values for settings used by your game components. For more on this, refer to the main article on [Setting hierarchies](dm-setting-hierarchies.md).

## Listening for changes

Settings instances let you [register a PropertyChangeListener](assets/javadoc/resources/Settings.html#addPropertyChangeListener-java.beans.PropertyChangeListener-) that will be notified when the value of a setting key changes. Changes in parent scopes will not notify the listener; if necessary you can attach listeners to the parents as well.

## Namespaces

Though rare, it is possible to wrap an existing Settings instance in a [namespace](assets/javadoc/resources/Settings.html#createNamespace-java.lang.String-). The result is a new Settings instance that reflects the original settings but prefixes all keys with the namespace and a `:`. This can be used to ensure that settings with different name spaces can use the same keys in a single setting collection but not conflict with each other.

## Wrapping Properties instances

The standard Java [Properties](https://docs.oracle.com/javase/8/docs/api/java/util/Properties.html) class is also used to store named strings. To provide interoperability with third party code based on Properties, Settings provides the static `Settings.forProperties(p)` method which returns a Settings instance that is backed by the supplied Properties instance.