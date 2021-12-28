/*
 * mutex-diy.js
 *
 * An example DIY card that demonstrates the use of
 * various controls for representing a set of mutually exclusive
 * options (that is, only one of the possible options can be
 * selected at any one time).
 */

useLibrary('diy');
useLibrary('ui');
useLibrary('markup');


function create(diy) {
    diy.name = 'Radio Buttons';
    $RadioValue = 'orange';
    $ToggleValue = 'purple';
    $CycleValue = 'brown';
    $ToggleBoolean = 'true'; // (or yes or 1)
    $CheckBoolean = 'true';
}

function createInterface(diy, editor) {
    let bindings = new Bindings(editor, diy);

    //
    // Create a tab of radio buttons
    //

    let radioPanel = new TypeGrid();

    let radioBtns = [
        radioButton('Cabbage'),
        radioButton('Tomato'),
        radioButton('Carrot')
    ];

    // these are the values to be used for the setting for each
    // of the above buttons
    let radioValues = [
        'green',
        'red',
        'orange'
    ];

    // Radio buttons need to be placed in sets
    // called button groups; when any button in
    // the group is selected, every other button
    // in that group is deselected automatically.
    //
    // Instead of binding to the buttons individually,
    // as you would with other controls, you bind to
    // the button group.
    let radioGroup = buttonGroup(radioBtns, radioValues);
    bindings.add('RadioValue', radioGroup, [0]);

    for (let i = 0; i < radioBtns.length; ++i) {
        radioPanel.place(radioBtns[i], (i > 0 ? 'br' : ''));
    }

    radioPanel.addToEditor(editor, 'Radio Buttons');



    //
    // Create a tab of toggle buttons
    //

    // Note that this is *exactly* the same process; the only difference
    // is that we create toggle buttons instead of radio buttons.

    let togglePanel = new TypeGrid();

    let toggleBtns = [
        toggleButton('Plum'),
        toggleButton('Banana'),
        toggleButton('Blueberry')
    ];

    let toggleValues = [
        'purple',
        'yellow',
        'blue'
    ];

    let toggleGroup = buttonGroup(toggleBtns, toggleValues);
    bindings.add('ToggleValue', toggleGroup, [0]);

    for (let i = 0; i < toggleBtns.length; ++i) {
        togglePanel.add(toggleBtns[i]);
    }

    togglePanel.addToEditor(editor, 'Toggle Buttons');



    //
    // Create a tab with a cycle button
    //

    let cyclePanel = new TypeGrid();
    let cycleBtn = cycleButton(['Water', 'Tea'], ['clear', 'brown']);
    cyclePanel.add(cycleBtn);
    bindings.add('CycleValue', cycleBtn, [0]);
    cyclePanel.addToEditor(editor, 'Cycle Button');





    //
    // Create a tab with regular toggle buttons
    // and check box buttons. When you create a toggle button
    // without putting it in a button group, and bind the
    // button directly, it acts like a simple on/off toggle,
    // just like a check box button.
    //

    let checkPanel = new TypeGrid();
    let ungroupedToggleBtn = toggleButton('Typeset Content');
    let checkBtn = checkBox('Bold');
    bindings.add('ToggleBoolean', ungroupedToggleBtn, [0]);
    bindings.add('CheckBoolean', checkBtn, [0]);
    checkPanel.place(ungroupedToggleBtn, '', checkBtn, 'br');
    checkPanel.addToEditor(editor, 'Boolean Controls');

    bindings.bind();
}

let textBox;

function createFrontPainter(diy, sheet) {
    textBox = markupBox(sheet);
    textBox.tabWidth = 0.6;
    textBox.defaultStyle.add(SIZE, 8);
}

function createBackPainter(diy, sheet) {}


function paintFront(g, diy, sheet) {
    sheet.paintTemplateImage(g);
    if ($$ToggleBoolean.yesNo) {
        g.setPaint(Color.BLACK);
        textBox.markupText = ($$CheckBoolean.yesNo ? '<b>' : '') +
            'Vegetable:\t' + $RadioValue +
            '\nFruit:\t' + $ToggleValue +
            '\nBeverage:\t' + $CycleValue;
        textBox.draw(g, new Region(20, 20, 200, 340));
    }
}

function paintBack(g, diy, sheet) {}

function onClear() {
    $RadioValue = 'green';
    $ToggleValue = 'purple';
    $CycleValue = 'clear';
    $ToggleBoolean = 'false';
    $CheckBoolean = 'false';
}

function onRead() {}

function onWrite() {}

if (sourcefile == 'Quickscript') {
    testDIYScript();
}