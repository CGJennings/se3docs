/**
 * java-interop-1.js - version 1
 *
 * How to access the app and other Java objects.
 */

// Strange Eons is written in Java, but most plug-ins
// are written in JavaScript. (Despite the name,
// JavaScript and Java don't have much in common.)
// You'll often need to work with some "Java stuff"
// (objects) from your script code. This script
// introduces the basics.

// Things you interact with from the Java side will
// be exposed to your script as objects. For example,
// every script has access to the object Eons, which
// represents the Strange Eons application.
//
// These Java objects have functions you can call to
// get information or change the object's state.
// Functions that belong to objects in this way are
// called methods. For example, the Eons object
// has a method to get a description of what version
// it is. You can use it like this:

let currentVersion = Eons.getVersionString();
println(currentVersion); // prints version

// Notice how we write the variable name of the
// object, a dot (.), and the method we want to call.

// Here's another method that Eons provides:
let currentEditor = Eons.getActiveEditor();
println(currentEditor); // prints a description of the editor

// getActiveEditor returns another Java object,
// the object representing the selected editor tab.
// (It returns the special value null if no tabs are open.)
//
// Now that we have this second object, we can also
// call its methods. For example, editors have a method
// to get the path to the file they are editing:

let editedFile = currentEditor.getFile();
println(editedFile); // prints the file path

// Technically, this also returns a Java object,
// but we won't worry about that for now.

// All of the methods we have called so far start with
// "get". This is very common for methods that return
// some "fact" about the current state of their object.
// Sometimes, there is a matching "set" method that lets
// you change the object's properties. For example,
// editors have getTitle and setTitle. You can change
// the label shown for the current editor using
// setTitle, like this:

currentEditor.setTitle("Tricky!");

// These kinds of methods are so common that they have
// a special name, "getters" and "setters", and you
// can access them using a shortcut in JavaScript.
// Instead of calling the method, you can use them
// like regular object properties. The following is
// equivalent to currentEditor.getTitle():

let title = currentEditor.title;
println(title); // prints "Tricky!"

// Likewise, we could change the title with
//   currentEditor.title = "Trickier!"
// instead of
//   currentEditor.setTitle("Trickier!")

// Once last little tidbit about getters:
// if a getter only returns true or false, its name
// starts with "is" instead of get. For example, editors
// have a getter named "isAttached".

// Besides getters and setters, objects also have other
// methods. These methods ask the object to "do something"
// more than just update its state. For example, editors
// have a save() method to ask them to save whatever is
// being edited to their current file.

// OK, that's it for now. Join me in java-interop-2.js
// for the next lesson.
//
// Oh, if you want to see what else you can do with Eons,
// have a look here:
//
// https://se3docs.cgjennings.ca/assets/javadoc/ca/cgjennings/apps/arkham/StrangeEons.html

println(`If you ran this script instead of opening it in the
editor, you are probably confused! Open it now and
peruse the comments.`);