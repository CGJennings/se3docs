/*
 * context-bar-button.js - version 2
 *
 * This script demonstrates how to add a new context bar button.
 * 
 * To try it out:
 *  1. Run the script.
 *  2. Open Preferences, and choose the Context Bar category.
 *  3. Drag the new Critter button onto the bar.
 *  4. Open a game component with a multi-line input field
 *     (this is a requirement we set in the script).
 *  5. Click the cat face.
 * When done, click the Unregister button at the top of the app.
 */

importClass(arkham.ContextBar);

// Context bar buttons implement the ContextBar.Button interface.
//
// The following code creates a JavaScript object that implements
// the most important methods:

let button = {
    // A unique identifier for the button; used to store the
    // user's preferred context bar configuration.
    getID: function getID() {
        return 'CAT_BUTTON';
    },

    // The name of the button as presented to the user.
    getName: function getName() {
        return 'Critter';
    },

    // The icon shown on the context bar.
    getIcon: function getIcon() {
        return this.catIcon;
    },

    // Note: this cannot be called "icon" or an odd thing happens:
    // after we turn this into a Java object, this.getIcon() and
    // this.icon will mean the same thing, so if we call this property
    // icon, the getIcon() function will effectively call itself
    // when we try to return this.icon, leading to an infinite loop.
    catIcon: ResourceKit.getIcon('project/mt76.png'),

    // These are called to determine whether the button is shown on the bar,
    // and if shown, whether it is enabled. The general rule is that a button
    // is not visible if it can never be used in the current context. For example,
    // if the user is editing a deck, and the command doesn't work on decks,
    // then it should not be visible. If the button can potentially be used in
    // the current context, but it can't be used right now because the state is
    // wrong, then it should be visible but not enabled. (For example, if the
    // command acts on the current selection, but nothing is selected.)
    //
    // The context parameter is an instance of ContextBar.Context;
    // it provides helper methods to assist in implementing these functions.
    //
    // The implementation for this example simply checks that the context
    // bar is attached to a multi-line markup target in a game component editor
    // (so that it can insert lines of text if the button is activated).
    isVisibleInCurrentContext: function isVisibleInCurrentContext(context) {
        return context.isMultipleLineTextEditor() && context.gameComponent != null;
    },

    isEnabledInCurrentContext: function isEnabledInCurrentContext(context) {
        // always enabled as long as it is visible
        return true;
    },

    // Called when the button is activated.
    actionPerformed: function actionPerformed(actionEvent) {
        try {
            let mt = Eons.markupTarget;
            mt.selectNone();
            mt.selectedText = "\n  |\\      _,,,--,,_  ,)\n  /,`.-'`'   -,  ;-;;'\n"
                    + " |,4-  ) )-,_ ) /\\\n'---''(_/--' (_/-'\n";
        } catch (ex) {
            Error.handleUncaught(ex);
        }
    }
};

// Use JavaAdapter to create a Java ContextBar.Button from our script object.
button = new JavaAdapter(ContextBar.Button, button);

// The ContextBar.Button can then be registered and unregistered with the
// context bar.
ContextBar.registerButton(button);

// This will add a clickable button to the app window that we can click to
// unregister the button, so you can experiment with the button code.
// (Otherwise, since only one button with a given ID can be registered at
// a time, rerunning the script would fail.)
let unregisterButton = new swing.JButton('Unregister');
unregisterButton.addActionListener(function(ae) {
    Eons.window.removeCustomComponent(unregisterButton);
    ContextBar.unregisterButton(button);
});
Eons.window.addCustomComponent(unregisterButton);