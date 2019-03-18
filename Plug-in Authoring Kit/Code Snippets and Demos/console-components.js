/*
 * console-components.js - version 2
 *
 * This example demonstrates how to insert UI components,
 * images, and simple HTML fragments into the script console
 * output. It also demonstrates how to attach an event listener
 * to a UI component.
 *
 * Notes:
 *
 * When you insert HTML, what is actually inserted is also
 * a component, even it looks like a block of text. You'll
 * notice the difference when you select a block of text
 * that contains an HTML fragment.
 *
 * Note that the listener function remains active even though
 * the script completes and is no longer running. That is, you can
 * enter your name and press OK and the event listener code runs
 * even though your script finished.
 *
 * UI components can also be used 'normally', by adding them to
 * a JDialog or other window. There are plenty of examples of this
 * in the DIY Examples folder and the Tool Examples folder.
 *
 * Strange Eons also provides some UI-related libraries that make
 * creating interface controls easier. These are not shown here;
 * instead, this example creates everything the 'hard way' so that
 * you can see how this is done when needed. The examples mentioned
 * above also make extensive use of these libraries.
 *
 * See tool-bar.js for an example that uses the
 * StrangeEonsAppWindow class to create a tool bar in the
 * main application window.
 */

useLibrary( 'imageutils' );
importPackage( javax.swing );

let nameField = new JTextField();
let okBtn = new JButton( 'OK' );

// A project: URL locates files in the currently open project
let yellowSign = ImageUtils.get( 'project:Code Snippets and Demos/yellow-sign.png', true );

okBtn.addActionListener(
	function actionPerformed() {		
		println( '\nHey there, ' + nameField.text + '.' );
		print( 'Tell me, have you seen the yellow sign? ' );
		Console.printImage( yellowSign );
		println();
		Console.printHTML( '<b><i>Well you have now!</i></b>' );
		println();
	}
);

print( 'Name: ' );
Console.printComponent( nameField );
print( '   ' );
Console.printComponent( okBtn );
println( '   ' );
