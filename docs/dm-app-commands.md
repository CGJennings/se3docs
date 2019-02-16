# Use and define application commands

The standard commands in Strange Eons are all subclasses of [AbstractCommand](assets/javadoc/ca/cgjennings/apps/arkham/commands/AbstractCommand.html), which itself is built on Swing's action framework. Commands typically use string-keyed properties to define features such as a name and icon, along with an *action listener* called when the command is activated.

## Standard command properties

The command framework defines a number of helper methods to access well-known property values, including the following:

`getName()`  
Returns the command name, localized for the interface language if possible.

`getIcon()`  
Returns the icon used for the command in the menu or [context bar](um-ui-context-bar.md), or `null` if the command does not have an icon.

`getAccelerator()`  
Returns the key stroke used for this command's accelerator, when it appears in the application menu, or `null` if the command does not have an accelerator.

## Built-in commands

The set of standard application commands can be found as static constants in [Commands](assets/javadoc/ca/cgjennings/apps/arkham/commands/Commands.html). This class also defines a few utility methods for locating commands in menus and for working with Commandables, described below.

### Command delegation

Most standard application commands are subclasses of [DelegatedCommand](assets/javadoc/ca/cgjennings/apps/arkham/commands/DelegatedCommand.html). A delegated command is not handled directly by that command's action listener. Instead, it looks for a [Commandable](assets/javadoc/ca/cgjennings/apps/arkham/commands/Commandable.html) that is interested in handling the command, and [delegates to it](assets/javadoc/ca/cgjennings/apps/arkham/commands/Commandable.html#performCommand-ca.cgjennings.apps.arkham.commands.AbstractCommand-).

Typically, the current editor tab is offered a chance to handle the command first. If it is not interested, then the application window is offered a chance. (Additional Commandables can be [registered](assets/javadoc/ca/cgjennings/apps/arkham/commands/Commands.html#registerCommandable-ca.cgjennings.apps.arkham.commands.Commandable-) and will receive priority over the editor and application.)

If no relevant Commandable is interested in handling the command, the command itself can optionally implement a default handling mechanism. For example, an editor might implement its own method of handling the `SELECT_ALL` command, but if it does not then the default implementation will attempt to select everything in the focused user interface component (such as a text field or list), if any.

## Defining new commands

New commands can be defined by subclassing either AbstractCommand or DelegatedCommand. When subclassing AbstractCommand you must implement `actionPerformed`. When subclassing DelegatedCommand, if you want to specify a default behaviour you must override `isDefaultActionApplicable` and `performDefaultAction`.

### Setting standard property values

The basic properties of the command can be set through the following methods (or via the constructor):

`setName(name)`  
Sets the name of the command to the supplied string, ideally localized for the platform. If the name contains an `&`, the following character is used as the command's mnemonic key (where supported). This key can be used to activate the command's menu item when its parent menu is open; it is typically indicated by underlining the letter in the menu item's label.

`setNameKey(key)`  
Sets the name of the command by looking up the supplied string in the interface string table. If the application [AcceleratorTable](assets/javadoc/resources/AcceleratorTable.html) defines an accelerator with the same key, it is used as the accelerator for the command.

`setIcon(icon)` / `setIcon(resourcePath)`  
Sets the icon used to represent the command in menus and the context bar. It can be set directly from an Icon instance or by passing an [resource path string](dm-resources.md) for the desired image.

`setAccelerator(keyStroke)`  
Sets the optional accelerator key that can be used to activate the command.

### Updating the command state

Commands provide the following methods to check and manage their state:

`isEnabled()`  
Returns whether the command is currently enabled.

`setEnabled(boolean)`  
Sets whether the command is enabled. 

`update()`  
Called as needed (for example, just before the command's menu item is shown) to allow the application to update its state.

Command state can be managed in one of two ways. The first way is to update the state by calling `setEnabled` explicitly whenever the state changes. The second way is to override the `update` method to determine the current state at that time and enable or disable the command accordingly.

## Adding new commands to the application

Since all commands are also actions, they can be [added to a menu](dm-app-menu.md) by creating a new menu item and passing the command to the constructor. To add make them available for use on the [context bar](dm-context-bar.md), use [CommandButton to wrap the command instance](dm-context-bar.md#creating-a-context-bar-button-for-a-command).

If your command is delegated, your editors can respond to the command by overriding the three [Commandable](assets/javadoc/ca/cgjennings/apps/arkham/commands/Commandable.html) interface methods. Ensure that these methods invoke the superclass implementation when passed commands that should be handled in the default manner (such as the standard application commands).