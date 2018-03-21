# Main menu commands

Most high-level commands are accessed through the menu bar. This section offers a quick tour of the available menu items and their purpose. Note that plug-ins can add new items to these menus, so you may have items that are not listed here.

**Tip:** If you are looking for a particular menu item, use your browser's find in page feature (usually <kbd>Ctrl</kbd>+<kbd>F</kbd> or <kbd>⌘</kbd>+<kbd>F</kbd>) and type the name.

## File 

File commands apply to whole documents or projects.

### New

Creates a new game component. The [New Component Dialog](um-gc-intro.md) is shown to let you pick the component type from searchable categories. An editor for the component will appear in the [tab strip](um-ui-documents.md).

### New Project

Creates a [new project](um-proj-intro.md) to manage groups of related components or create plug-ins.

### Open

Shows a file selection dialog that allows you to open an existing game component file. You can also open files by dragging and dropping the file icon onto Strange Eons.

### Open Project

Shows a project selection folder dialog that allows you to open an existing project. Only one project can be open at a time; it is displayed in a special pane on the left side of the application window.

### Open Recent

Lists documents, and projects that you recently edited. Choose one to reopen it. Use the **Clear Menu** item to clear the list.

### Close

Closes the document that you are currently editing. You can also close a document by clicking the × on its tab.

### Close Project

Closes the currently open project and hides the project pane.

### Save

Saves the currently edited document. If you haven't chosen a file name yet, this is the same as **Save As**.

### Save As

Saves the currently edited document under a new file name; future **Save**s will also use the new file.

### Save All

Saves all open files that have unsaved changes.

### Export

Creates a version of the current document by converting it to a different representation. Most commonly it is used to create image files for the game component you are editing.

### Print

Prints the current document. For more control over how game components are printed, or to print a group of components as a set, [create a deck](um-deck-intro.md).

### Exit (Quit on macOS)

Exits the application. If you have files with unsaved changes you will be given a chance to save them first.



## Edit

Editing commands that apply in most contexts, like copying the current selection to the clipboard.

### Clear

Clears the contents of the current document, setting it to a "blank" state.

### Spin Off

Creates a duplicate of the current game component or other document in a new tab. This is useful if you want to experiment with your design safely or create several components that will share common features.

### Cut

Removes the selection from the document and places it on the clipboard. (The selection might be, for example, text in a text field, files in the project pane, or objects in a deck.)

### Copy

Places a copy of the selection on the clipboard.

### Paste

Pastes a compatible selection from the clipboard to the current control or editor. For example, you can paste text into a text field or an image into a portrait panel.

### Select All

Selects all content in the current control, such all text in a text field or all objects on a deck page.

### Find

Searches for matching text (in editors that support this).

### Find in Project

[Searches for matching text](um-proj-search.md) in the files of the current project.

### Preferences

Opens the [Preferences dialog](um-ui-preferences.md) to customize app settings.



## View

Options that affect how content is displayed, especially how game component previews are drawn.

### Preview Quality

Allows you to adjust the quality of game components previews to balance legibility and speed. The default is **Adjust Automatically** which will continually adjust the quality based on how long drawing takes. Reasonably powerful systems can probably lock this on **High** or **Ultrahigh**. On less powerful systems, you may also want to adjust the preview update rate [preference](um-ui-preferences.md).

### Preview Backdrop

Allows you to choose the background you prefer for game component previews, from dark, light, or checked. Checked can be useful for components with complex outlines.

### Context Bar

Toggles whether the [context bar](um-ui-context-bar.md) is visible. This is a small floating toolbar that pops up next to whatever text field or deck page you are editing. It adjusts the options it shows depending to what you are editing.

### Object Handles

Toggles whether object handles are shown in the [deck editor](um-deck-intro.md). These are used to resize or rotate objects in a deck. It is sometimes useful to temporarily hide them to get a clearer view of what you are working on.

### Grid Lines

Toggles whether grid lines are shown in the [deck editor](um-deck-intro.md).

### Margin

Toggles whether the page margin is shown in the [deck editor](um-deck-intro.md).

### Source Navigator

Toggles whether the source navigator panel is shown in the source code editor (when the file type supports navigation).



## Expansion

Commands that let you change the [expansion symbol](um-gc-expansions.md) displayed on supported game components. An expansion is a collection of related content that builds on a base game but is released together as a separate product. Manufacturers often mark the expansion content with a small graphical symbol so it can be easily separated out from the base game again. This menu lets you mark your own components with one or more expansion symbols, when supported by the game's plug-in.

### New

Create a new expansion symbol for an existing game.

### Copy

Copy the expansion symbol(s) from the currently edited game component. This does not affect the system clipboard, which is controlled from the **Edit** menu.

### Paste

Pastes the last-copied expansion symbol(s) onto the current component, replacing any existing symbols.

### Variant

Allows you to choose from different variants of the symbols; the meaning of this depends on the game.

### Expansions

Quickly pick an expansion for the current game component.

### Choose

Opens a dialog that allows you to choose one or more expansions for the component.



## Markup

Commands that alter how text is formatted on game components by inserting [markup tags](um-gc-markup.md).

### Alignment

Modifies the horizontal alignment and justification of the selected paragraphs, and the vertical alignment of the entire text box.

### Colour

Modifies the colour of the selected text.

### Font

Modifies the font family, size, width, style, and letter spacing of the selected text.

### Image

Inserts an image from an image file, Web URL, or [special URL](dm-special-urls.md).

### Characters

Insert hard-to-type characters.

### Heading/Rule

Changes the current selection into a heading (H1).

### Subheading

Changes the current selection into a subheading (H2).

### Bold/Italic/Underline/Strikethrough

Applies bold/italic/underline/strikethrough style to the selected text.

### Superscript/Subscript

Applies superscript/subscript style to the selected text.

### Abbreviations

Opens the [abbreviation editor](um-gc-abbreviations.md) to define game-specific abbreviations that reduce typing.



## Deck

Commands specific to laying out objects in the [deck editor](um-deck-intro.md).

### Move to Front/Move to Back

These commands move the selected objects in front of, or behind, other objects on the same page. You can think of the objects in the deck as paper cutouts that you can arrange in layers, one atop the other. These commands move objects towards the top or bottom layer.

### Rotate and Flip

Turn the selected objects in 90° increments, or mirror them horizontally or vertically.

### Align and Distribute

Aligns or spreads out the selected objects in various ways against the last object that was added to the selection.

### Snap To

Changes the classes of objects that the selected objects will *snap to*. See the deck editor section for details.

### Group/Ungroup

Combine the selected objects into a group, or break the group back into individual objects. Group objects are treated as a single entity.

### Style

Opens the style dialog, which lets you edit the style attributes (colour, line width, and so on) of the selected objects.

### Copy Style

Copies the style attributes of the selected object.

### Paste Style

Applies the last copied style attributes onto the selected objects.

### Lock/Unlock/Unlock All

Locks or unlocks the selected objects. (**Unlock All** unlocks everything, selected or not.) Locked objects cannot be selected by left clicking them as usual; this prevents you from moving them by accident. Locked objects can still be selected by right clicking on them and using the **Select** menu.

### Centre Content on Page

Centres the objects on the page, both horizontally and vertically. Useful for neat freaks and after changing paper sizes.



## Source

Commands specific to the source code editor, which is usually used to develop new plug-ins. Refer to the [developer manual](dm-index.md) for further information.

### Run File

Save and run the edited script.

### Debug File

Save and run the edited script in debug mode: a breakpoint is set at the top of the script. The script debugger must be enable for this to work properly.

### Make Plug-in Bundle

If you are editing a file that belongs to a plug-in task folder in a project, this will build a plug-in bundle. Equivalent to the using the same command in the project pane.

### Test Plug-in

If you are editing a file that belongs to a plug-in task folder in a project, this will open the **Test Plug-in&& dialog.

### Remove Trailing Spaces

Tidy up the file by remove extraneous whitespace from the ends of lines.

### Move Up/Move Down

Move the selected lines up or down in the source file.

### Comment Out/Uncomment

Comments out the selected block of text so it will be ignored, or removes those comment markers.

### Sort

Sort the selected lines of text. Allows the use of complex sorting rules.

### Play Macro

Plays back the most recently recorded macro, a sequence of keystrokes that you record and then play back to repeat them.

### Start/Stop Macro Recording

Starts or stops recording a new macro. The caret turns red when macro recording is active. You can play back the current macro while recording a new macro.

### Complete Code

Offer suggestions to complete a fragment of script code. You can choose a suggestion using the <kbd>↑</kbd>, <kbd>↓</kbd>, and <kbd>Enter</kbd> keys. Only applies to scripts and currently only partially implemented.

### Abbreviations

Opens the [abbreviation editor](um-gc-abbreviations.md) to define type-specific abbreviations that reduce typing.



## Toolbox

Commands for installing and activating [plug-ins](um-plugins-intro.md). Plug-ins that add user-activated "tools" will be listed here; selecting their respective menu item activates the tool in question. There are also commands here for managing plug-ins:

### Updates

Opens the **[Updates](um-plugins-updates.md)** dialog to change the automatic update settings.

### Catalogue

Opens the **[Plug-in Catalogue](um-plugins-catalogue.md)** to install or update plug-ins.

### Plug-in Manager

Opens the **[Plug-in Manager](um-plugins-manager.md)** to browse installed plug-ins, uninstall them, or assign keyboard shortcuts to tool plug-ins.

## Window

Commands that let you switch between open documents and show or hide floating tool windows such as the script output window.

## Help

Commands that provide access to information about the app and developer documentation.

### Help

Displays help information for your current activity, if available, or else the [user manual](um-index.md).

### User Manual/Developer Manual/Translation Manual

Displays the contents page of the named manual.

### Document Browser

Opens the document browser, which lets you explore document collections installed by plug-ins, such as API documentation.

### Report a Bug

Opens a bug reporting dialog.

### About

Opens the **About** dialog, which displays credits, version, and license information.