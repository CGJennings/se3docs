# Settings

Settings are named strings (or key/value pairs) used to store information. A common use for them is to store user [preferences](um-ui-preferences.md). For example, the preference setting named `imexport-format` is used to store the image format last used to exported a game component with custom settings. The name `imexport-format` is called the setting's *key*, and the string stored under that name is called that key's *value*.

The [Settings class](assets/javadoc/resources/Settings.html) is used to work with settings. To get the value of one of named strings in a collection of settings, call the `get(key)` or `get(key, defaultValue)` method. To set the value, call `set(key, newValue)`.

Settings objects are available from a [variety of sources](dm-setting-collections.md). Every game component has one that can be used to store component state, such as the active [expansion symbol](um-gc-expansions.md). Every task folder has one used to store task-specific settings. Every game has one. You can also create new ones of your own.

Groups of setting values can be [loaded from a plug-in as a resource](dm-res-settings.md) and added in bulk to a Settings instance.

## Typed data

Although all Setting values are stored as strings, the Settings class defines methods for reading and writing settings of other types, such as numbers, colours, and regions (rectangles). These methods handle the conversion of each data type to and from strings automatically. The format used by each data type is described in the [class documentation](assets/javadoc/resources/Settings.html).

## Listening for changes

Settings instances let you [register a PropertyChangeListener](assets/javadoc/resources/Settings.html#addPropertyChangeListener-java.beans.PropertyChangeListener-) that will be notified when the value of a setting key changes. Changes in parent scopes will not notify the listener; if necessary you can attach listeners to the parents as well.

## Namespaces

It is possible to wrap an existing Settings instance in a [namespace](assets/javadoc/resources/Settings.html#createNamespace-java.lang.String-). The result is a new Settings instance that reflects the original settings but prefixes all keys with the namespace and a `:`. This can be used to ensure that settings with different name spaces do not conflict with each other.

## Wrapping Properties instances

The standard Java [Properties](https://docs.oracle.com/javase/8/docs/api/java/util/Properties.html) class is also used to store named strings. To provide interoperability with third party code based on Properties, Settings provides the static `Settings.forProperties(p)` method which returns a Settings instance that is backed by the supplied Properties instance.