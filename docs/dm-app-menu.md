# Extend the application menus

There is a simple mechanism for extending the main application menus. Each menu (**File**, **Edit** and so on) reserves a standard area for adding custom items. The method [`StrangeEonsAppWindow.addMenuItem(targetMenu, item)`](assets/javadoc/ca/cgjennings/apps/arkham/StrangeEonsAppWindow.html#addMenuItem-ca.cgjennings.apps.arkham.StrangeEonsAppWindow.AppMenu-javax.swing.JComponent-) is used to add new items. This method takes two parameters, an enum value (of type [StrangeEonsAppWindow.AppMenu](assets/javadoc/ca/cgjennings/apps/arkham/StrangeEonsAppWindow.AppMenu.html)) that specifies *which* menu to extend, and the menu item itself. For example:

```js
importClass(arkham.StrangeEonsAppWindow.AppMenu);

// assume that myNewCommand is a new application command we have defined
var item = new swing.JMenuItem(myNewCommand);

// Extend the File menu; possible menu choices include
//   FILE, EDIT, VIEW, EXPANSION, MARKUP, DECK, SOURCE, TOOLBOX, HELP
Eons.window.addMenuItem(AppMenu.FILE, item);
```

## The **Toolbox** menu

One of the possible targets for `addMenuItem` is the **Toolbox** menu. This differs from the usual route, which is to create a plug-in with the `ACTIVATED` type. These plug-ins represent *tools available in the toolbox*. Menu items added to the **Toolbox** menu using `addMenuItem` should *affect the toolbox itself*.

## The **Window** menu and tracked windows

The **Window** menu is pointedly absent from the AppMenu list. This menu is constructed automatically from the current editors and from the registered [TrackedWindow](assets/javadoc/ca/cgjennings/apps/arkham/TrackedWindow.html)s. A tracked window represents a floating information window or command palette, like the script output console. Tracked windows are always present and available, but may be shown or hidden by selecting their **Window** menu item. Tracked windows are registered using the [`StrangeEonsAppWindow.startTracking(trackedWindow)`](assets/javadoc/ca/cgjennings/apps/arkham/StrangeEonsAppWindow.html#startTracking-ca.cgjennings.apps.arkham.TrackedWindow-) method.