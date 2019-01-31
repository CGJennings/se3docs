# Code editor

The code editor is a syntax-highlighting text editor that is built into Strange Eons. It is used to edit a number of text-based resource file types that are used in projects and plug-ins, including script code, HTML, settings files, and more. Plug-in developers can also extend the editor to support other file types.

![A code editor window](D:\se3docs\docs\images\code-editor.jpg)

## Features

### Abbreviations

[Abbreviations](um-gc-abbreviations.md ) are short letter patterns you type in and then expand into longer text sequences by typing <kbd>Tab</kbd>. For example, in script code files you can type <kbd>f</kbd> <kbd>n</kbd> <kbd>Tab</kbd> to insert the skeleton of a new function definition. The available abbreviations match the type of file you are editing, and you can add new abbreviations of your own.

To *edit the abbreviations used in the code editor*, choose **Source/Abbreviations**.

### Navigator

Depending on the type of file, a *navigator panel* may appear to the left of the text editing area. This panel allows you to jump between logical sections of the file by clicking one of the entries in the list. The meaning of *logical sections* depends on the type of file.

To *jump to a destination listed in the navigator panel*, click on the panel entry.

To *show or hide the navigator panel* in supported file types, choose **View/Navigator**.

To *resize the navigator panel*, drag the bar between the panel and the text editing area.

### Interacting with project files

To *insert the path to a resource file into a code editor*, drag and drop the file from the project pane to the desired insertion point.

To *add or increase the number of copies of a component in a deck*, drag and drop the component from the project pane into a [copies](um-proj-deck-task.md#the-copies-file) file.

To *interactively edit a region in a settings file*, select the region with the **[Draw Regions](dm-draw-regions.md)** tool open.

### Jumping to error locations

When a runtime error occurs in a script, a *stack trace* is often printed to the script output window. This shows the script file and line number that was being executed when the error occurred.

To *jump to the location of a stack trace entry in the code editor*, left click the stack trace line in the script output window.

### Commands

This table lists editing commands available from the code editor. These also generally work anywhere you see a code editing panel, such as the Quickscript dialog.

| Command                         | Gesture                            |
| ------------------------------- | ---------------------------------- |
| **Movement**                    |                                    |
| Move to previous/next character | <kbd>Left</kbd>/<kbd>Right</kbd> |
| Move to previous/next line      | <kbd>Up</kbd>/<kbd>Down</kbd>    |
| Move to previous/next word | 	<kbd>Ctrl</kbd> + <kbd>Left</kbd>/<kbd>Right</kbd>|
| Move to start/end of line | <kbd>Home</kbd>/<kbd>End</kbd> |
| Move to up/down one window | <kbd>Page Up</kbd>/<kbd>Page Down</kbd> |
| Move to start/end of file | <kbd>Ctrl</kbd> + <kbd>Home</kbd>/<kbd>End</kbd> |
| Jump to line `n` | <kbd>Ctrl</kbd> + <kbd>G</kbd>, `n`, <kbd>Enter</kbd> |
| **Selection** | |
| Extend the selection | <kbd>Shift</kbd> + any movement command |
| Select all (entire file) | <kbd>Ctrl</kbd> + <kbd>A</kbd> |
| Toggle rectangular selection | <kbd>Ctrl</kbd> + <kbd>\</kbd> |
| **Editing** | |
| Delete previous/next word | |
| Move line(s) up/down | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Up</kbd>/<kbd>Down</kbd> |
| Cut selection to clipboard | <kbd>Ctrl</kbd> + <kbd>X</kbd> |
| Swap selection with clipboard | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>X</kbd> |
| Copy selection to clipboard | <kbd>Ctrl</kbd> + <kbd>C</kbd> |
| Paste text from clipboard | <kbd>Ctrl</kbd> + <kbd>V</kbd> |
| Paste as rectangle | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>V</kbd> |
| Insert new line without breaking current line | <kbd>Shift</kbd> + <kbd>Enter</kbd> |
| Insert new line without indenting | <kbd>Alt</kbd> + <kbd>Enter</kbd> |
| Undo previous edit | <kbd>Ctrl</kbd> + <kbd>Z</kbd> |
| Redo most recent undo | <kbd>Ctrl</kbd> + <kbd>Y</kbd> |
| **Code and text formatting** | |
| Run script | <kbd>F5</kbd> |
| Debug script | <kbd>F3</kbd> |
| Indent/unindent slected lines | <kbd>Tab</kbd>/<kbd>Shift</kbd> + <kbd>Tab</kbd> |
| Comment out/uncomment slected lines | <kbd>Ctrl</kbd> + <kbd>/</kbd>/<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>/</kbd> |
| Transform to upper case | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>U</kbd> |
| Transform to lower case | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd> |
| Trim extra space from line ends | **Source\|Remove Trailing Spaces** |
| Sort selected lines | **Source\|Sort** |
| Expand abbreviation | Type abbreviation code, then <kbd>Tab</kbd> |
| Complete script code (experimental) | <kbd>Ctrl</kbd> + <kbd>Space</kbd> |
| Most **Markup** commands also work | |
| **Automation** | |
| Repeat next key stroke `n` times | <kbd>Ctrl</kbd> + <kbd>Enter</kbd>, `n`, key stroke |
| Start recording key strokes | <kbd>F9</kbd> |
| Stop recording key strokes | <kbd>F10</kbd> |
| Play most recent recording | <kbd>F6</kbd> |

#### Automation examples

To *select the next 10 lines*, type <kbd>Home</kbd>, <kbd>Ctrl</kbd> + <kbd>Enter</kbd>, <kbd>1</kbd>, <kbd>0</kbd>, <kbd>Down</kbd>.

To *play the most recently recorded macro 25 times*, type <kbd>Ctrl</kbd> + <kbd>Enter</kbd>, <kbd>2</kbd>, <kbd>5</kbd>, <kbd>F6</kbd>.









