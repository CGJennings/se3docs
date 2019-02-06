# Plug-in types

Strange Eons uses several types of plug-ins, differentiated mainly by the file extension used by their bundle files. A plug-in's type determines when it is loaded and what it is expected (and allowed) to do.

## Activated

**File extension:** `.seplugin`

Activated plug-ins can be loaded, reloaded, and installed while Strange Eons is running. They are used to extend Strange Eons by adding new commands to the **Toolbox** menu. The menu item is created automatically from the plug-in name and icon. When the user chooses the menu item, the plug-in's `run()` function (or `showPlugin` method if compiled) will be called to *activate* the plug-in. The [`getPluginType`](assets/javadoc/ca/cgjennings/apps/arkham/plugins/Plugin.html#getPluginType-- ) method/function of the plug-in implementation must return a type of `PluginType.ACTIVATED`. This is the default type for scripted plug-ins if the function is not defined.

## Injected

**File extension:** `.seplugin`

Like activated plug-ins, injected plug-ins can be loaded, reloaded, and installed while Strange Eons is running. However, they are not activated on demand. Instead they are activated exactly once just after being loaded and initialized. They are typically used to extend the application in some way (without modifying the game database), such as adding new actions to the project system. The `getPluginType` method/function of the plug-in implementation must return a type of `PluginType.INJECTED`.

## Extension

**File extension:** `.seext`

An extension plug-in is loaded while Strange Eons is starting up. Because it is known that there are no open documents and the user is not interacting with the application, it is safe to modify “sensitive” parts of the application, such as the [game database](assets/javadoc/ca/cgjennings/apps/arkham/plugins/package-summary.html). For example, extensions are used to [register new component types](dm-res-classmap.md) and to [register new games](dm-register-game.md). This way, the user cannot accidentally pull the rug out from under a game component editor or other code by uninstalling a plug-in that it relies on. The `getPluginType` method/function of the plug-in implementation must return a type of `PluginType.EXTENSION`. Scripted plug-ins can include the [extension](assets/jsdoc/extension.html) library, which takes care of the plug-in type automatically.

## Theme

**File extension:** `.setheme`

Themes are used to define new user interface themes for the application. They can only be implemented using classes, not scripts. The class named by the root file must be a subclass of [Theme](assets/javadoc/ca/cgjennings/ui/theme/Theme.html) rather than an implementation of the [Plugin](assets/javadoc/ca/cgjennings/apps/arkham/plugins/Plugin.html) interface.

## Library

**File extension:** `.selibrary`

Library bundles are not true plug-ins and they do not list any plug-in classes or scripts in their root file. Like plug-ins, they are merged into the the class path so their contents can be [accessed as resources](dm-resources.md). This allows a library to expose code or other content for use by other plug-ins or the main application. For example, the Core Typefaces [core component](um-plugins-intro.md#core) is supplied as a library.