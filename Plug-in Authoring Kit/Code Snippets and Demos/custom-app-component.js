/*
 * custom-app-component.js - version 3
 *
 * This example demonstrates how to add buttons to a tool bar
 * using methods from the StrangeEonsAppWindow class.
 *
 * See insert-component.js for another example of creating
 * user interface components with event listeners attached.
 */

useLibrary( 'uicontrols' );

function add( comp ) {
	if( comp == undefined || comp == null )
		throw new Error( 'component missing or null' );

	// This listener will remove the button from the
	// tool bar when the button is clicked.
	comp.addActionListener( function actionListener() {
		Eons.window.removeCustomComponent( comp );
	});
	Eons.window.addCustomComponent( comp );
}

add( button( 'Press' ) );
add( button( 'To' ) );
add( button( 'Remove' ) );

// Add a text field that prints a message and then
// removes itself (and its text label) when the
// user presses Return within the field.
var label = label( 'Enter your name:' );
Eons.window.addCustomComponent( label );
var field = textField( '', 20, function actionListener() {
	println( 'Hello, ' + field.text );
	Eons.window.removeCustomComponent( label );
	Eons.window.removeCustomComponent( field );
});
Eons.window.addCustomComponent( field );
