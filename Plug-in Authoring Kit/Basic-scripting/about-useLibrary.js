/**
 * about-useLibrary.js - version 1
 *
 * Introduction to scripting libraries.
 */

// Strange Eons includes a number of built-in script
// libraries to make writing plug-in code easier.

// How do you use a library?
// Just call useLibrary with the library name, like this:

useLibrary("random");

// Now all of the functionality defined by that library
// is available. (For the coders out there, it is added
// to the global scope.)
//
// The "random" library defines a new class called Random
// that provides a wider range of functionality than
// JavaScript's Math.random() function.
//
// Now that we included it with useLibrary, we can use the
// Random class. For example:

let r = new Random();
let chosenNumber = r.pick(1, 10);
println(chosenNumber);

// There is one special library that you *never* have to add with
// useLibrary: the "common" library. You don't have to include
// it because it comes preloaded in every script. As you might
// guess, without the functionality added by the common library,
// writing scripts would be hard indeed. In fact, the common
// library defines the "println" function that we used above.
// (println will print a value to the script output window, then
// start a new line). Another function it defines is alert().
// It pops up a little message for the user, which they can click
// on to dismiss. Like this:

alert("Be careful not to overuse alert() or you'll annoy people.");

// Go here to learn what else is in the common library:
//   https://se3docs.cgjennings.ca/assets/jsdoc/modules/common.html
// (You can Ctrl+click the link to open it.)

// Besides the built-in "standard libraries" you can also call
// useLibrary to load your own scripts. This lets you re-use the
// same code in different parts of your plug-in. To load your own
// script, you supply a "res://" or "project://" URL that points
// to your script file. For example, if your plug-in task folder
// has a script in resources/cgj/my-secret-library.js, you can
// include it in other scripts in your plug-in with:
//   useLibrary("res://cgj/my-secret-library.js")

// To see what other libraries are available and what's in them,
// go to the link above and choose another library from the list
// along the right side.

println(`If you ran this script instead of opening it in the
editor, you are probably confused! Open it now and
peruse the comments.`);