//
// prefab-ext.js
// Prototype-specific extension to the the prefab library
// used by all card types.
//

useLibrary('prefab');

// text box used to draw the deck label on the back
let pfDeckBox;

function afterCreate(diy) {
    // change card type so we can print label on back
    diy.faceStyle = FaceStyle.TWO_FACES;
    // for image card types
    diy.portraitBackgroundFilled = false;
    diy.portraitScaleUsesMinimum = true;
    // deck label key
    $Deck = #proto-deck;
}

function afterCreateInterface(diy, editor, panel, bindings) {
    // add a control to change the deck label
    let deckField = textArea(null, 5, 0, true);
    let deckLabel = label(@app-deck);
    deckLabel.labelFor = deckField;
    bindings.add('Deck', deckField, [1]);
    panel.place(deckLabel, 'p', deckField, 'br hfill');
}

function afterCreateBackPainter(diy, sheet) {
    // create a markup box to typeset the deck label
    let baseKey = pfKey('-name');
    pfDeckBox = markupBox(sheet);
    pfDeckBox.alignment = LAYOUT_CENTER | LAYOUT_MIDDLE;
    pfSettings.getTextStyle(baseKey, pfDeckBox.defaultStyle);
}

function afterPaintFront(g, diy, sheet) {
    // adds the current date to the card front
    sheet.fitTitle(
        g, new Date().toDateString(),
        new Region(0, sheet.templateHeight-15, sheet.templateWidth, 8),
        g.font, 6, sheet.ALIGN_CENTER
    );
}

// the original paintBack assumes there is a
// portrait on the back---replace it completely
paintBack = function paintBack(g, diy, sheet) {
    sheet.paintTemplateImage(g);
    // print deck label
    g.setPaint(Colour.BLACK);
    pfDeckBox.markupText = $Deck;
    let r = new Region(20, 20, sheet.templateWidth-40, sheet.templateHeight-40);
    pfDeckBox.draw(g, r);
};

function afterOnClear(diy) {
    $Deck = '';
}