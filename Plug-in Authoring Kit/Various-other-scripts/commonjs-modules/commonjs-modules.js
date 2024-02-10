/*
 * commonjs-modules.js - version 1
 *
 * This example demonstrates the use of CommonJS (Node-style)
 * modules and the require function.
 *
 * The useLibrary function takes either a library name or an
 * absolute path to a script resource (res://myplugin/scripts/eg.js)
 * and runs the named script file in the global scope.
 * This can be convenient, especially for less experienced programmers,
 * but it can also "pollute" the global scope with unused symbols.
 * 
 * The require function can accept either an absolute or relative path,
 * and it runs the named script in a separate scope. Only those symbols
 * added to the object module.exports will be available to the caller.
 * Everything else is a "private implementation detail", leaving the
 * module author free to change it without breaking compatibility.
 * The require function has special support for modules that appear
 * to be library names (those without a / character) and will load them
 * as if by useLibrary for compatibility.
 *
 * Like libraries, you can "require" a module multiple times from
 * different modules, and the module will only be run once in a
 * given script context. Future calls will immediately return the
 * previously exported objects.
 *
 * This example will load and use some simple modules from the
 * modules subfolder.
 */

// import the functions we want to use from the area and volume modules:
const { square, circle, regularPolygon } = require("./modules/area");
const { cube } = require("./modules/volume");

const len = Number(prompt("Enter a length:"));
printf("A square with sides of length %.0f has area %.0f\n", len, square(len));
printf("An octagon with sides of length %.0f has area %.1f\n", len, regularPolygon(len, 8));
printf("A circle with diameter %.0f has area %.1f\n", len, circle(len));
printf("A cube with sides of length %.0f has volume %.0f", len, cube(len));