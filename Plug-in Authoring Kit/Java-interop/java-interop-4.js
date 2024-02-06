/**
 * java-interop-4.js - version 1
 *
 * Advanced stuff: implementing classes and interfaces.
 */

// Continued from java-interop-3

// This final lesson is for *experienced* programmers
// who understand object-oriented programming, or
// at least who know that they need to create
// an object with a Java class from script code.
//
// I assume you know what these are:
// classes, interfaces, methods. If not, hang in
// there and give it a shot anyway.

// Many parts of the Strange Eons API need to
// be passed Java objects of a certain class.
// Usually that is no problem: you can get one
// from some other method, or you can create
// one with "new". But sometimes you need to
// create a JavaScript object that either
// implements a Java interface or subclasses
// a Java class.

// First, the easy case: if you need to implement
// an interface that only has one method, you
// can just pass in a function instead. A
// common example is Runnable. This has only one
// method, void run(), which takes no arguments
// and returns no value. The script engine will
// convert a function to an instance of such
// an interface automatically:

Eons.addExitTask(function() {
    println("I ran!");
});

// or, equivalently:

Eons.addExitTask(() => println("I ran!"));

// You can also implement a simple interface
// like this by treating the interface like
// a constructor and passing the function as
// an argument:

new java.lang.Runnable(() => println("I ran!"));

// For more complex cases, you use the JavaAdapter
// constructor. The constructor is passed one or
// more interfaces you want to implement, followed
// by at most one class you want to extend, followed
// by a JavaScript object that provides your
// implementation. For example, the "long" way to
// make a Runnable is like this:

let runnable = new JavaAdapter(
    // the interface
    java.lang.Runnable,
    // the implementation
    {
        run() {
            println("I ran!");
        }
    }
);

runnable.run();

// If you need to pass arguments to the parent class's
// constructor when using JavaAdapter, add them at the
// end, *after* your script object.

// If you are subclassing a Java class, you will sometimes
// need to invoke the superclass implementation of a method.
// Here is an example in Java:
//
// @Override
// protected String decode(String encoded) {
//     return super.decode(encoded) + "!";
// }
//
// In your JavaScript object, you need to use this bit of magic:
//
// decode(encoded) {
//     return this.super$decode(encoded) + "!";
// }

println(`If you ran this script instead of opening it in the
editor, you are probably confused! Open it now and
peruse the comments.`);