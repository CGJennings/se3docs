/*
 * fonts-in-families.js - version 1
 *
 * This script creates an object that maps every
 * font family name to the names of the fonts in
 * that family. It will include both system fonts
 * and registered fonts. This may be useful when
 * diagnosing why a font or font variant is not
 * behaving as expected, or to check definitively
 * how a font is being registered.
 */

const fontMap = {};
const allFonts = java.awt.GraphicsEnvironment.getLocalGraphicsEnvironment()
    .getAllFonts().forEach((font) => {
        let family = String(font.getFamily());
        let mapping = fontMap[family];
        if (!mapping) {
            mapping = {
                names: [],
                logicalNames: []
            };
            fontMap[family] = mapping;
        }
        mapping.names.push(String(font.getFontName()));
        mapping.logicalNames.push(String(font.getName()));        
    });
delete fontMap.Dialog;

//
// Now fontMap["familyName"] returns an object like this:
// {
//     names: [array of font names in that family]
//     logicalNames: [array of the logical names of fonts in that family]
// }
// Names are names usually presented to the user
// Logical names are used internally, e.g., passed to the Font constructor
//
// E.g., println(fontMap.Arial.names[1]) might print "Arial Bold"
// 

// dump all of the available names to the console
println(JSON.stringify(fontMap, null, 2));