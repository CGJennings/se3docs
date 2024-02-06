/*
 * editor-listeners.js - version 2
 *
 * Demonstrates how to write a listener to be
 * informed when editors are opened, closed,
 * selected, or unselected.
 */

importClass(arkham.StrangeEonsAppWindow);
importClass(arkham.StrangeEonsEditor);

// This is a listener that is called when a new editor is added.
let editorAdded = new StrangeEonsAppWindow.EditorAddedListener() {
    editorAdded(editor) {
        println('editor added: ' + editor);
        if (!targetEditor) {
            println('[adding editor-specific listener to this editor]');
            targetEditor = editor;
            editor.addEditorListener(specificEditor);
        }
    }
};

// This is a listener that is called when any editor is
// selected, unselected, or closed---it applies to any
// editor because we register it with the application,
// not a particular editor.
let allEditors = new StrangeEonsEditor.EditorListener() {
    editorSelected(editor) {
        println('editor selected: ' + editor);
    },
    editorDeselected(editor) {
        println('editor deselected: ' + editor);
    },
    editorClosing(editor) {
        println('editor closing: ' + editor);
    },
    editorDetached(editor) {
        println('editor detached: ' + editor);
    },
    editorAttached(editor) {
        println('editor attached: ' + editor);
    }
};

// This is a listener that is called when a specific editor
// is selected, unselected, or closed---it applies to only
// one editor because we register it on that editor, not
// the entire application.
let specificEditor = new StrangeEonsEditor.EditorListener() {
    editorSelected(editor) {
        println('specific editor selected: ' + editor);
    },
    editorDeselected(editor) {
        println('specific editor deselected: ' + editor);
    },
    editorClosing(editor) {
        println('specific editor closing: ' + editor);
    },
    editorDetached(editor) {
        println('specific editor detached: ' + editor);
    },
    editorAttached(editor) {
        println('specific editor attached: ' + editor);
    }
};

// The editor we will add the specific listener to:
// if there is no editor when we run the script, the
// code we wrote for the EditorAddedListener will
// add it to the first editor we create.
let targetEditor = Editor;

// Add a toolbar button that will uninstall the listeners
// we register when it is clicked.
let killSwitch = new swing.JButton('Remove Listeners');
killSwitch.addActionListener(function shutdown() {
    try {
        Eons.window.removeEditorListener(allEditors);
        Eons.window.removeEditorAddedListener(editorAdded);
        if (targetEditor) {
            targetEditor.removeEditorListener(specificEditor);
        }
        Eons.window.removeCustomComponent(killSwitch);
        println('Editor listeners removed.');
    } catch (ex) {
        error.handleUncaught(ex);
    }
});
Eons.window.addCustomComponent(killSwitch);

// Finally, install the listeners.
println('Installing listeners...');
if (targetEditor) {
    println('Installing editor-specific listener on: ' + targetEditor);
    targetEditor.addEditorListener(specificEditor);
} else {
    println('No active editor: not installing editor-specific listener at this time.');
}
Eons.window.addEditorAddedListener(editorAdded);
Eons.window.addEditorListener(allEditors);