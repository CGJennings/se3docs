# Setting collections

There are a number of standard setting collections used for various purposes, some of which have special properties.

## Default settings

The default settings collection consists of the default values for the setting keys that Strange Eons requires for its own use. They are not directly accessible, but other settings collections often [inherit](dm-setting-hierarchies.md) from them through the global settings.

## Global settings

The global settings are temporary setting space between the default settings and the user settings. Changes to the global setting space last only until the application exists. The global settings are initialized at startup from the default settings. Plug-ins can then [define temporary settings here](assets/javadoc/resources/RawSettings.html) that contain defaults for their own user preferences. Because these vanish when the application ends, if the plug-in is uninstalled and the keys are not overridden by user preferences, the settings will simply vanish without clogging up the user's preference file.

## User settings

The user settings are used to store user [preferences](um-ui-preferences.md). The contents of this collection are written to the user's preference file automatically. These settings inherit from the global settings, and thus also the default settings. If you request a plug-in's settings by calling [`PluginContext.getSettings()`](assets/javadoc/ca/cgjennings/apps/arkham/plugins/PluginContext.html), those settings will be stored as user settings (although using a namespace to prevent conflicts).

The user settings can be accessed by calling `Settings.getUser()`.

## Shared settings

The shared settings are a read-only view of the user settings. It is often used as a safer parent for other Settings instances so that user preferences are not accidentally overwritten by buggy code.

The shared settings can be accessed by calling `Settings.getShared()`.

## Master settings for games

Every [registered game](dm-register-game.md) has an associated *master settings* instance. This is typically used by plug-ins to store all of the default settings for components and other features associated with that game. The private settings of all game components associated with a particular game inherit from that game's master settings, and the master settings in turn inherit from the shared settings.

The master settings for a given game can be accessed by looking up the [Game](assets/javadoc/gamedata/Game.html) in question and calling its `getMasterSettings()` method.





