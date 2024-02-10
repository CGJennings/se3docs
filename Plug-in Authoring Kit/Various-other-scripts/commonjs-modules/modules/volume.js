// Example module used by commonjs-modules.js in the parent folder.
// See that script for details.

// This module "requires" the area module, as does the main script
// (commonjs-modules.js), but area.js will only be run once.
// Subsequent calls will quickly return the same exports as the
// first call. You can verify this by uncommenting the last line of
// area.js to see it only prints once.

// import square from area.js so we can use it;
// the other area exports will not be defined in this script 
const { square } = require("./area");

exports.cube = function(sideLength) {
    return square(sideLength) * sideLength;
}

exports.squarePyramid = function(baseSideLength, height) {
    return square(baseSideLength) * height / 3;
}