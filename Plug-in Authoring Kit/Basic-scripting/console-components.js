/*
 * console-components.js - version 3
 *
 * This example demonstrates how the console can be used to
 * display content other than plain text: images, simple
 * HTML fragments, and even a UI component with an event
 * listener attached.
 * 
 * Notes:
 *
 * When you insert HTML, what is actually inserted is also
 * a component, even it looks like a block of text. You'll
 * notice the difference when selecting a block of text
 * containing an HTML fragment.
 * 
 * The UI component in this example is created "the hard way,"
 * without the aid of the ui scriping libraries.
 */

useLibrary('imageutils');
importPackage(javax.swing);

let nameField = new JTextField();
let okBtn = new JButton('OK');

// A project: URL locates files in the currently open project
let yellowSign = ImageUtils.get('project:pak-assets/yellow-sign.png', true);

okBtn.addActionListener(
    function actionPerformed(event) {
        println('\nHey there, ' + nameField.text + '.');
        println('Tell me, have you seen the yellow sign?');
        Console.printImage(yellowSign);
        println();
        Console.printHTML('<b><i>Well you have now!</i></b>');
        println();
    }
);

print('Name: ');
Console.printComponent(nameField);
print('   ');
Console.printComponent(okBtn);
println('   ');