/**
 * java-interop-3.js - version 1
 *
 * Argument types and overloaded methods.
 */

// Continued from java-interop-2

// Methods in a Java object are picky. They expect
// each argument to be of a certain type, and if
// they don't get the type that they expect, you
// can an error.
//
// For example, the Strange Eons application has
// a method called addEditor, which as you might
// guess is used to add a new editor tab. To use
// it, you have to pass it an object with the
// class StrangeEonsEditor. Any other kind of
// object causes an error:

try {
    // none of these will work:
    Eons.addEditor(7);
    Eons.addEditor("open-me.eon");
    Eons.addEditor(new java.io.File("boss.txt"));
} catch (ex) {
    println(`Here's your error: ${ex}`);
}

// JavaScript doesn't work like that. When you
// define a function, you can pass anything you
// like as its arguments. It's up to the function
// to complain if it wants to:

function noTypeChecking(passMeANumber) {
    return 1 + passMeANumber;
}

function typeChecking(passMeANumber) {
    if (typeof passMeANumber !== "number") {
        throw new TypeError("I only take numbers, but I got " + passMeANumber);
    }
    return 1 + passMeANumber;
}

println( noTypeChecking(2) ); // prints 3, the sum of 1 + 2
println( noTypeChecking("not a number") ); // prints 1not a number
try {
    typeChecking("not a number"); // throws an error like a Java method would
} catch (ex) {
    println(`Here's your error: ${ex}`);
}

// Because JavaScript isn't strict about types but
// Java is, things can get tricky when you try to
// call a Java method. The JavaScript engine will
// try to convert the type to the right kind if
// it is a simple type (a string or number).
// For example, do you remember that this:

Eons.activeEditor.setTitle("Tricky!");

// Changes the title of the current tab. setTitle
// expects a string, but if you pass it a number,
// the JavaScript engine will see that and convert
// the number to a string so it can call the method
// without an error:

Eons.activeEditor.setTitle(42);

// It looks like I set the title to a number, but
// really it's a string. Most of the time this
// conversion (coercion is the technical name)
// "just works" but from time to time it causes
// problems, so it's good to keep in mind when
// something unexpected happens.

// Java methods can also be overloaded. That means
// that the same class can have more than one
// method with the same name, as long as each version
// takes a different number of arguments or the
// arguments are of different types.
//
// When you call an overloaded method from a script,
// the script engine picks the method that best matches
// the arguments you passed in. If one overload expects
// a string, and one expects a number, and you pass
// a number, it picks the number one.
//
// Trouble can arise if the type of the argument maps
// to more than one type of Java object. For example,
// in JavaScript, numbers have the Number type. In Java,
// there are several different number types! The script
// engine can covnert its numbers to and fom all of
// the different Java number types, so it isn't usually
// a problem. But what if you are trying to call an
// overloaded method that looks like this:
//   JavaClass.someMethod(anInteger: int)
// and it has an overload of a different Java number type:
//   JavaClass.someMethod(aNumber: double)
//
// You are in trouble, because the JavaScript engine will
// pick the aNumber version as the best match for a
// JavaScript number object!
//
// In these rare cases, there is an alternate way to look
// up the Java method you want to call that lets you
// specify *exactly* which version you want. To use it,
// you need to look up the *exact* signature of the
// method, including the type of each argument. You can
// find this in the Strange Eons Java API documentation
// (the "JavaDocs"). You use it like this:

Eons.activeEditor["setTitle(java.lang.String)"]("Very tricky!");

// For now, you won't need to know this. Just keep it
// in mind for when the day comes!

println(`If you ran this script instead of opening it in the
editor, you are probably confused! Open it now and
peruse the comments.`);