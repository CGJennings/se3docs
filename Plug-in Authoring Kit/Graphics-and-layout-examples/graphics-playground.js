/*
 * graphics-playground.js - version 1
 *
 * This script lets you experiment with drawing card faces.
 * It creates a game component with an attached code editor.
 * The game component will use your code to repaint itself
 * live as you type.
 */

useLibrary('diy');
useLibrary('ui');
useLibrary('markup');
useLibrary('imageutils');

var paint;
let errorBox;

function create(diy) {
    diy.faceStyle = FaceStyle.ONE_FACE;
    $code = `
// put any drawing code you like here, and the
// card will repaint itself accordingly
function paint(g, sheet) {
    const W = sheet.templateWidth;
    const H = sheet.templateHeight;

    const font = new Font(
        "Bauhaus 93",
        Font.PLAIN,
        12
    );

    const colours = [
        Color.MAGENTA,
        Color.BLUE,
        Color.GREEN,
        Color.YELLOW,
        Color.ORANGE,
        Color.RED,
        Color.WHITE
    ];

    const n = colours.length;

    sheet.paintTemplateImage(g);
    for (let i=0; i<n; ++i ) {
        sheet.drawOutlinedTitle(
            g,
            "Groooovy",
            new Region(0,(-n + i)*4,W,H),
            font,
            24 - n + i, 2,
            colours[i],
            Color.BLACK,
            sheet.ALIGN_CENTER,
            true
        );
    }
}
`.trim();
}

function createInterface(diy, editor) {
    let panel = new Stack();
    let codeEditor = codeArea('', 400, 800);
    panel.add(codeEditor);

    let bindings = new Bindings(editor, diy);
    bindings.add('code', codeEditor);

    panel.addToEditor(editor, 'Graphics Playground');
    bindings.bind();
}

function createFrontPainter(diy, sheet) {
    errorBox = markupBox(sheet);
    errorBox.defaultStyle = new TextStyle(
        FAMILY, 'monospaced',
        SIZE, 6,
        WEIGHT, WEIGHT_BOLD,
        PAINT, Color.RED
    );
}

function paintFront(g, diy, sheet) {
    // the sheet's image buffer is reused; this ensures error messages
    // don't overwrite each other
    g.fillRect(0, 0, sheet.templateWidth, sheet.templateHeight);
    try {
        eval($code);
        if (typeof paint === 'function') {
            paint(g, sheet);
        }
    } catch(ex) {
        // Uncomment if you want errors dumped to script output
        // Error.handleUncaught(ex);
        errorBox.markupText = String(ex).replaceAll('<', '<lt>');
        errorBox.draw(g, new Region(10, 10, sheet.templateWidth - 20, sheet.templateHeight - 20));
    }
    // don't ask about unsaved changes
    diy.markSaved();

}

function createBackPainter(diy, sheet) {}
function paintBack(g, diy, sheet) {}
function onClear() {
    $code = '';
}
function onRead() {}
function onWrite() {}
testDIYScript();