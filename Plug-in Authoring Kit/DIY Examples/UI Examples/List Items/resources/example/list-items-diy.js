/*
 * list-items.js
 *
 * An example DIY card that demonstrates how to use the ListItem
 * class to control:
 *   -  how items are displayed in a list control or combo box
 *   -  how those items are mapped to and from setting values
 */

useLibrary('diy');
useLibrary('ui');
useLibrary('imageutils');

// The list item class is an item in a list for which we can control
// the related setting value:
importClass(arkham.diy.ListItem);



// Given an array of item templates, return an array of matching ListItems.
// Each item template is an array of either two or three strings:
// the label shown to the user, the setting value that the item maps to
// on the component, and an optional image resource to use for an icon.
function makeItems(itemTemplates) {
    let items = [];
    for (let i = 0; i < itemTemplates.length; ++i) {
        // each entry is an array with either two or three elements:
        // the label shown to the user, the settings value, and (optionally) an icon
        let template = itemTemplates[i];
        if (template.length == 2) {
            items[i] = new ListItem(template[0], template[1]);
        } else if (template.length == 3) {
            items[i] = new ListItem(template[0], template[1], template[2]);
        } else {
            throw new Error('bad item template at index' + i + ': ' + item);
        }
    }
    return items;
}



function create(diy) {
    diy.faceStyle = FaceStyle.ONE_FACE;
    diy.name = 'List Items';
    // The initial selections of the combo box and list will be
    // the items that map to these setting values (see below)
    $BoxValue = 'GREEK_GAMMA';
    $ListValue = 'T';
}

function createInterface(diy, editor) {
    let stack = new Stack();

    // List items that include icons:
    let boxItems = [
        ['GREEK_ALPHA', 'Alpha', ImageUtils.getIcon('example/a.png')],
        ['GREEK_BETA', 'Beta', ImageUtils.getIcon('example/b.png')],
        ['GREEK_GAMMA', 'Gamma', ImageUtils.getIcon('example/g.png')]
    ];
    let box = new comboBox(makeItems(boxItems));

    // List items whose text label is a localized string:
    let listItems = [
        ['L', 'Left'],
        ['R', 'Right'],
        ['C', 'Center'],
        ['T', 'Top'],
        ['B', 'Bottom'],
        ['M', 'Middle'],
    ];
    let list = new listControl(makeItems(listItems), null, true);
    stack.add(box, list);

    let bindings = new Bindings(editor, diy);
    bindings.add('BoxValue', box, [0]);
    bindings.add('ListValue', list, [0]);
    stack.addToEditor(editor, 'Lists', null, null, 0);
    bindings.bind();
}



function createFrontPainter(diy, sheet) {}

function createBackPainter(diy, sheet) {}



function paintFront(g, diy, sheet) {
    sheet.paintTemplateImage(g);
    // print the current value of the private settings that
    // the box and list are bound to
    g.setPaint(Colour.BLACK);
    drawText(g, $BoxValue, sheet, true);
    drawText(g, $ListValue, sheet, false);
}

function paintBack(g, diy, sheet) {}




// Draws text in the top or bottom of the face
function drawText(g, text, sheet, drawInTopHalf) {
    let w = sheet.templateWidth;
    let h = sheet.templateHeight;
    let region;

    if (drawInTopHalf) {
        region = new Region(32, 0, w-64, h / 2);
    } else {
        region = new Region(32, h / 2, w-64, h / 2);
    }

    sheet.fitTitle(g, text, region, ResourceKit.bodyFont, 18, sheet.ALIGN_CENTER);
}




function onClear() {}

function onRead(diy, ois) {}

function onWrite(diy, oos) {}

testDIYScript();