/*
 * design-support-diy2.js
 *
 * An example DIY card that demonstrates how to create design supports.
 * This example creates a verbal design consequence visualization that
 * is similar to the one used for investigators in the
 * Arkham Horror plug-in.
 */

useLibrary('diy');
useLibrary('ui');
useLibrary('imageutils');

// In this example, we're still going to use an adapter to help us,
// but we are also going to use a ConsequenceSet. A consequence set
// formats a list of changing support notes (the Arkham Horror
// investigator is a real component that uses it).
importClass(arkham.diy.VerbalDesignSupportAdapter);
importClass(arkham.component.design.ConsequenceSet);


function analyzeDesign(diy, sb) {
    let conseq = new ConsequenceSet('Observations in  Rhyme', Color.BLACK);
    // for this example, we will randomly add some consequences
    if (Math.random() < 0.8) {
        conseq.add('a very common point, well made');
    }
    if (Math.random() < 0.667) {
        conseq.add('a moderately common point, sipping lemonade');
    }
    if (Math.random() < 0.5) {
        conseq.add('a less common point, hiding in the shade');
    }
    if (Math.random() < 0.333) {
        conseq.add('an uncommon point, making a tirade');
    }
    if (Math.random() < 0.1) {
        conseq.add('a point so rare, it\'s hardly made');
    }

    // this will write a formatted list to the string builder, sb
    conseq.formatConsequences(sb, lastConseq, null);
    // the consequence set from this time will be the consequence set
    // from last time on the next update;
    // any consequences that change will be highlighted
    lastConseq = conseq;

    // the function *must* return either true or false to indicate
    // whether the design is considered 'valid'
    return true;
}
let lastConseq = null;



function create(diy) {
    diy.faceStyle = FaceStyle.ONE_FACE;
    diy.name = 'Design Support';
}

function createInterface(diy, editor) {
    // add a control for the name so that the design can be
    // changed; this will lead to the design support being
    // asked to re-analyze the design, which in turn will
    // cause our function to be called
    let stack = new Stack();
    let nameField = new textField();
    stack.add(nameField);
    diy.nameField = nameField;

    stack.addToEditor(editor, 'Design Support 2', null, null, 0);

    // Design supports need to be attached to the editor,
    // so the best place to set them up is in
    // createInterface.
    //
    // Note that we are passing the "analyzeDesign"
    // function that we defined above. That function
    // will get called whenever the design support
    // needs to be updated.
    let support = new VerbalDesignSupportAdapter(diy, analyzeDesign);
    editor.designSupport = support;
}

function createFrontPainter(diy, sheet) {}

function createBackPainter(diy, sheet) {}

function paintFront(g, diy, sheet) {}

function paintBack(g, diy, sheet) {}

function onClear() {}

function onRead(diy, ois) {}

function onWrite(diy, oos) {}

testDIYScript();