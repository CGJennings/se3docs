# Customize the context bar

The [context bar](um-ui-context-bar.md) is a small floating tool bar that pops up along the edge of the text field or other interface control that currently has focus. Its makes editing easier by displaying commonly-used commands that are relevant to the current editing context. You can register new buttons to activate custom commands. You can also customize where (and whether) a particular control in an editor displays the context bar so it better fits the control layout.

![context-bar](images/context-bar.png)

## Adjusting the bar's location or visibility

Where, and whether, the context bar appears relative to an interface control can be altered by setting one or more *client properties* on the control. A list of the available properties follows. Unless otherwise, specified, setting the client property to `java.lang.Boolean.TRUE` enables the change described.

> You must use `java.lang.Boolean.TRUE` to ensure you get the Java representation for `true` and not JavaScript's `true` value. Client property values can be any Java Object, so the script engine does not know to convert from a JS boolean to a Java boolean for you. More information about calling into Java from script code can be found on the [Java API page](dm-java-api.md#types-and-type-conversion).

| Property name (ContextBar constant) | Effect                                                       |
| ----------------------------------- | ------------------------------------------------------------ |
| `BAR_DISABLE_PROPERTY`              | Prevents the context bar from displaying when this component has focus. |
| `BAR_LEADING_SIDE_PROPERTY`         | Displays the context bar along the *leading edge* instead of the *trailing edge*. For languages written from left-to-right, this moves the context bar from the right side to the left side, and vice-versa. |
| `BAR_BELOW_PROPERTY`                | Displays the context bar along the *bottom edge* instead of on the *top edge*. |
| `BAR_INSIDE_PROPERTY`               | Displays the context bar *inside* of the interface component instead of extending *outward* from the top or bottom edge. This only makes sense for large fields that have sufficient space for the bar, and is used when they would otherwise cover an important feature such as the window's close control. |
| `BAR_OFFSET_PROPERTY`               | Set this property to an instance of [Point](https://docs.oracle.com/javase/8/docs/api/java/awt/Point.html) to offset the usual location of the context bar. For example, `new java.awt.Point(4, 8)` would move the context bar right 4 pixels and down 8 pixels. |
| `BAR_CUSTOM_LOCATION_PROPERTY`      | Set this property to an instance of [ContextBar.Locator](assets/javadoc/ca/cgjennings/apps/arkham/ContextBar.Locator.html) to customize bar placement. |

**Example**

```js
useLibrary('uicontrols');
importClass(arkham.ContextBar);

// creates a text field that places the context bar on the inside bottom of the field
var field = textArea('', 40, 10);
field.putClientProperty(ContextBar.BAR_BELOW_PROPERTY, java.lang.Boolean.TRUE);
field.putClientProperty(ContextBar.BAR_INSIDE_PROPERTY, java.lang.Boolean.TRUE);
```

### Disabling all support for markup

The `ContextBar.BAR_DISABLE_PROPERTY` will prevent the context bar from appearing over a component, but it does not prevent a text field from accepting commands from the **Markup** menu because the field its still a valid [MarkupTarget](assets/javadoc/ca/cgjennings/apps/arkham/MarkupTarget.html). You can prevent the field from being a markup target by setting the client property [`arkham.MarkupTarget.FORCE_MARKUP_TARGET_PROPERTY`](assets/javadoc/ca/cgjennings/apps/arkham/MarkupTarget.html#FORCE_MARKUP_TARGET_PROPERTY) to `java.lang.Boolean.FALSE`. 

**Example**

```js
useLibrary('uicontrols');

// creates a text field that does not allow markup
var field = textArea('', 40, 10);
field.putClientProperty(arkham.MarkupTarget.FORCE_MARKUP_TARGET_PROPERTY,
		java.lang.Boolean.TRUE);
```

## Adding custom buttons

New buttons are made available by registering them with the [ContextBar](assets/javadoc/ca/cgjennings/apps/arkham/ContextBar.html) class. Once registered, the user can add and remove registered buttons from the [Preferences](um-ui-preferences.md) dialog. Buttons implement the [ContextBar.Button](assets/javadoc/ca/cgjennings/apps/arkham/ContextBar.Button.html) interface, which supports reacting to the current context.

![context-bar-for-game](images/context-bar-for-game.png)

### Key Button methods

The key methods of the ContextBar.Button interface are:

`getID()`  
Returns the button's unique string identifier. Each button must have a unique identifier so that the user's chosen bar layout can be stored as a [setting](dm-settings.md).

`getName()`  
Returns a short name for the button (localized for the interface locale if possible).

`getIcon()`  
Returns an icon to represent the button on the context bar.

`isVisibleInCurrentContext(ContextBar.Context context)`  
Returns `true` if the button should be visible in the current context.

`isEnabledInCurrentContext(ContextBar.Context context)`  
Returns `true` if the button should be enabled in the current context. 

`actionPerformed( ActionEvent event )`  
Called when the button is pressed so that your code can perform the relevant command. Calling `event.getSource()` returns the context as a [ContextBar.Context](assets/javadoc/ca/cgjennings/apps/arkham/ContextBar.Context.html) instance.

### Context objects

The context objects passed to many of the Button's methods can be used to help determine whether your button should be available. For example, if your button should only be displayed when editing components from a particular game, you can implement `isVisibleInCurrentContext` to check the context's `getGame` method. This returns the [Game](assets/javadoc/gamedata/Game.html) instance for the game the currently edited component belongs to, or `null` if not editing a component. If it returns `null` or returns a Game other than the right one, the method should return `false`, and otherwise `true`.

Here are some of the most frequently used tests and properties:

`getTarget()`  
Returns the [interface control](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html) that the context bar is attached to.

`getEditor()`  
Returns the [editor](assets/javadoc/ca/cgjennings/apps/arkham/StrangeEonsEditor.html) that contains the target interface component, or `null` if it is not part of an editor.

`getGameComponent()`  
Returns the [GameComponent](assets/javadoc/ca/cgjennings/apps/arkham/component/GameComponent.html) being edited by the target interface component, or `null` if it is not part of a game component editor.

`getGame()`  
Returns the [Game](assets/javadoc/gamedata/Game.html) associated with the game component being edited by the target, or `null` if it is not part of a game component editor or if the component is not associated with a [registered game](dm-register-game.md).

`getDeck()`, `getPageView()`  
Returns the active [Deck](assets/javadoc/ca/cgjennings/apps/arkham/deck/Deck.html) and [PageView](assets/javadoc/ca/cgjennings/apps/arkham/deck/PageView.html), respectively, when the target interface control is part of a [DeckEditor](assets/javadoc/ca/cgjennings/apps/arkham/deck/DeckEditor.html), or `null` if it is not part of a deck editor.

`isMarkupTarget()`  
Returns `true` if the target interface control that the context bar is attached to is also a valid markup target; if so, then its contents can be manipulated using the [MarkupTarget](assets/javadoc/ca/cgjennings/apps/arkham/MarkupTarget.html) class.

`isMultilineTextEditor()`  
Returns `true` if the context bar is not only attached to a markup target, but a markup target that supports multiple lines of text.

`getCodeType()`  
Returns the [type of code](assets/javadoc/ca/cgjennings/apps/arkham/editors/CodeEditor.CodeType.html) being edited by the target interface component, or `null` if the target is not a source code editor.

### Creating a context bar button for a Command

For new commands defined via [AbstractCommand](assets/javadoc/ca/cgjennings/apps/arkham/commands/AbstractCommand.html) or [DelegatedCommand](assets/javadoc/ca/cgjennings/apps/arkham/commands/DelegatedCommand.html), a context bar button can be created by wrapping it with a [ContextBar.CommandButton](assets/javadoc/ca/cgjennings/apps/arkham/ContextBar.CommandButton.html). This will use the source command's name and icon, and enable and disable itself based on the command state. By default the button is always visible, but this can be changed by subclassing CommandButton to override `isVisibleInCurrentContext` or else call its `hideIfDisabled()` method to hide it automatically whenever it is disabled.