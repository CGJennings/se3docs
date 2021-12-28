/*
 * 8-face-diy.js
 *
 * An example DIY card that demonstrates the new six face
 * option for DIY components. This allows you to create
 * two closely-related cards as a single file.
 * ("Personal Story" cards for Arkham Horror use this format.)
 *
 * NOTE: To compare this to the similar 4 face example, select
 * both 4-face-diy.js and 8-face-diy.js in the project, right click,
 * and choose the Compare Files action. You will see that they are
 * nearly identical.
 */

useLibrary('diy');
useLibrary('ui');
useLibrary('markup');


function create(diy) {
    diy.faceStyle = FaceStyle.EIGHT_FACES;
    diy.name = 'Eight Faces';

    // Get the settings instance for the DIY component
    // so we can create keys programmatically; we could
    // instead of written this loop out as:
    //
    // $face_0_template = 'example/face0.jp2';
    // diy.setTemplateKey( 0, 'face-0' );
    // $face_1_template = 'example/face1.jp2';
    // diy.setTemplateKey( 1, 'face-1' );
    // etc.
    //
    // (For a real plug-in, it would be even better
    // to put these in a .settings file and load
    // them when the plug-in is started.)
    const s = diy.settings;
    for (let i = 0; i < 8; ++i) {
        let keyBase = 'face-' + i;
        // Create a setting key this face's template image:
        s.set(keyBase + '-template', 'example/face' + i + '.jp2');
        // Set the template key; this is similar to
        // setFrontTemplateKey or setBackTemplateKey, but
        // it allows us to identify a card face by index
        // (0 for front of card 1, 1 for back of card 1,
        // 2 for front of card 2, 3 for back of card 2):
        diy.setTemplateKey(i, keyBase);
    }
    // Prevent unsaved file warnings since this is just a demo:
    diy.markSaved();
}

// This example doesn't create any controls, it just shows how to
// set up the faces; but there is nothing extraordinary to do here
// for more than two faces; just remember to use 2 and 3 for the
// sheet indices of the second card when creating control bindings.
function createInterface(diy, editor) {}

// This region is used to print a description of the card face;
// the same region is used for every face.
let textRegion;


// When there are more than two faces, the createFrontPainter and
// paintFront functions are called once for each front face;
// these are the faces with even index numbers (0, 2, 4, ...).
// The index of the sheet you are creating or painting can be
// looked up from "sheet.sheetIndex".



function createFrontPainter(diy, sheet) {
    // This if statement prevents the region from being
    // needlessly created twice (once when the index is
    // 0 and once when it is 2), but it wouldn't be a
    // big deal if we left it off.
    if (sheet.sheetIndex == 0) {
        textRegion = new Region(16, 16, 118, 118);
    }
}

function createBackPainter(diy, sheet) {}

function faceName(index) {
    return sprintf(
        '%s of %.0f',
        (index % 2) == 0 ? 'Front' : 'Back',
        Math.floor(index / 2) + 1
    );
}

// When there are more than two faces, this gets called for each
// front face; these are the faces with even index numbers
// (0, 2, 4, ...). You can find out which one you are painting
// using "sheet.sheetIndex".
function paintFront(g, diy, sheet) {
    g.setPaint(Color.BLACK);
    sheet.paintTemplateImage(g);
    const text = faceName(sheet.sheetIndex);
    sheet.drawRotatedTitle(g, text, textRegion, ResourceKit.bodyFont, 14, sheet.ALIGN_CENTER, sheet.sheetIndex);
}

// When there are more than two faces, this gets called for each
// back face; these are the faces with odd index numbers
// (1, 3, 5, ...). You can find out which one you are painting
// using "sheet.sheetIndex".
function paintBack(g, diy, sheet) {
    paintFront(g, diy, sheet);
}

function onClear() {}

function onRead(diy, ois) {}

function onWrite(diy, oos) {}

testDIYScript();