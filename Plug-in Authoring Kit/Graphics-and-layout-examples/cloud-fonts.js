/*
 * cloud-fonts.js - version 1
 * 
 * Cloud fonts let you download fonts for use in
 * Strange Eons on demand. This example script
 * gets the default cloud font collection, collects
 * metadata about available cloud fonts and
 * dumps it to the console, then registers one of the
 * font families, making it available by family name
 * in Strange Eons for the rest of the session.
 * 
 * Cloud fonts are cached, so they are only downloaded
 * when first used or when they are updated.
 */

const fontData = [];
const cfc = ca.cgjennings.graphics.cloudfonts.CloudFonts.getDefaultCollection();
const families = cfc.getFamilies();
let totalFonts = 0;

for (let family of families) {
    let fam = {
        name: family.name,
        license: family.licenseType,
        categories: family.categories,
        subsets: family.subsets,
        variableAxes: family.axes,
        isDownloaded: family.downloaded,
        isRegistered: family.registered,
        fonts: []
    };
    for (let font of family.getCloudFonts()) {
        fam.fonts.push({
            name: font.name,
            style: font.style,
            axes: font.axes
        });
        ++totalFonts;
    }
    fontData.push(fam);
}

println(JSON.stringify(fontData, null, 2));
println();
println(`${totalFonts} fonts in ${families.length} families`);


println();
println("Registering the font family Fira Sans");
let firaSans = cfc.getFamily("Fira Sans");
let registrationResults = firaSans.register();
for (let i=0; i< registrationResults.length; ++i) {
    println(`    ${registrationResults[i]}`);
}

// If registration was successful, you can now use this font by its
// family name in plug-ins or markup tags. For example, create any
// new component with a MarkupBox and add <family "Fira Sans"> to
// the start of the field.
//
// Note that like any font registration, this only lasts until the
// current Strange Eons session ends. However, plug-in authors can
// add code to get and register the font to their plug-ins to ensure
// the font is available whenever the plug-in is installed. Alternatively,
// download 

// Besides the registering the font, you can also obtain a Java Font,
// either for each font individually or all at once.
let fontObj = firaSans.fonts[0];
println();
println(fontObj);
