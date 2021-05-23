// Example module used by commonjs-modules.js in the parent folder.
// See that script for details.

// These symbols are not exported (see below), so they will not be
// visible to scripts that use this module:

const PI = Math.PI;

function diameterToRadius(diameter) {
    return diameter / 2;
}

function squareOf(x) {
    return x * x;
}

// We are passed an object, module, with a property, exports, where
// we should define everything we want to be accessible from scripts
// that use this module:

module.exports.square = function(sideLength) {
    return squareOf(sideLength);
}

module.exports.circle = function(diameter) {
    return PI * squareOf(diameterToRadius(diameter));
}

// As a convenience, the variable exports is initially set to module.exports:

exports.regularPolygon = function(sideLength, numSides) {
    const perimeter = sideLength * numSides;
    const apothem = sideLength / (2 * Math.tan(PI / numSides));
    return perimeter * apothem / 2;
}

// Uncomment this to see a message each time the script runs (see volume.js)
//println("area.js code was run");