/**
 * java-interop-2.js - version 1
 *
 * About classes and packages.
 */

// Continued from java-interop-1

// Every Java object is made from a kind of blueprint,
// called its "class". An object's class strictly
// defines what you can do with it. This is different
// from how objects work in JavaScript. For example,
// in JavaScript I can make a Date object like this:

let jsDate = new Date();
println(jsDate); // prints the date and time

// So jsDate is a Date object, but I can mess around
// with it by adding something new:

jsDate.somethingNew = 42;

// I have added a new property to just this Date object.
// My special Date has it but no other Date does:

let otherDate = new Date();
println("somethingNew" in jsDate);    // true, it has somerthingNew in it
println("somethingNew" in otherDate); // false, just a regular Date

// You can't do that to a Java object. A Java object can
// only have the methods and properties defined by its
// class. This will give you an error, because it tries
// to add somethingNew to the Strange Eons app object:

try {
    Eons.somethingNew = 42;
} catch (error) {
    println(`Here's the error that caused: ${error}`);
}

// Each Java class has a unique name. For example, this
// prints the full name of the class that the Eons
// object is an example of:

let klass = Eons.getClass();
// * you can't name a variable "class"
println(klass);

// So, its class is "ca.cgjennings.apps.arkham.StrangeEons".
// What a mouthful. For short, we can call this class
// "StrangeEons". The rest of the name, the
// "ca.cgjennings.apps.arkham" part is called a package.
// Java apps can get very big, so the package name
// is used to help organize things. It works like folders
// and subfolders on a hard drive.

// Do you remember in the previous lesson I told you that
// the current editor's getFile() method returned a Java
// object representing the file that the editor saves to?
// Well, it is an object of type java.io.File.
// Now, suppose we wanted to change where an editor saved
// its file to. We would need to call something like
// setFile(ourOwnFile). But how do we get ourOwnFile?
// Well, it works very much like the JS Date example above:

let ourOwnFile = new java.io.File("path/to/a/new/file.txt");

// We don't really want to change the file, but this is how
// you would do it:
//   Eons.activeEditor.file = ourOwnFile
// Remember, that's just short for:
//   Eons.getActiveEditor().setFile(ourOwnFile);

// You see how we wrote out the "long name", including the
// package. What if we had to use a lot of Java File objects?
// In that case you could do this:

importClass(java.io.File);

// This will define File to be the same as java.io.File:

let anotherFile = new File("C:\\breakfast.txt");

// Note that you can only do this if there isn't already
// something with a conflicting name in JavaScript.

// Sometimes you may see an "importPackage" in script code.
// This can be useful if you will use a lot of classes that
// are all defined in the same package. When you use
// importPackage, it says to the script engine, "when you
// are trying to find a variable name I have used, if you
// can't find it defined anywhere else, check to see if it
// is the name of a class in this package, and if so use
// it as the name of that class". If that didn't make sense,
// don't worry about it. You can get by just using importClass.

// One last note before ending this lesson: a lot of key
// classes to do with Strange Eons are defined somewhere under
// the package named ca.cgjennings.apps.arkham. That's a lot
// to type, so "arkham" has been defined as a shortcut.
// So, these class names are equivalent in a script:
//
//   ca.cgjennings.apps.arkham.StrangeEons
//   arkham.StrangeEons

// Before ending this lesson, I'll explain one last thing
// that you might see in script code: importPackage.
// As you might guess, you pass it a package name

println(`If you ran this script instead of opening it in the
editor, you are probably confused! Open it now and
peruse the comments.`);
