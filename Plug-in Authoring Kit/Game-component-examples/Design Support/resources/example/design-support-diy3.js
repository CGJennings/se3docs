/*
 * design-support-diy3.js
 *
 * An example DIY card that demonstrates how to create design supports.
 * This example creates its own custom view component; although this
 * is just a simple label in this case, it could be anything you like.
 */

useLibrary('diy');
useLibrary('ui');
useLibrary('imageutils');
importClass(ca.cgjennings.ui.theme.Palette);

// In addition to using a built-in design support type,
// you can implement this interface to create your own design
// support implementation.
importClass(arkham.component.design.DesignSupport);


function create(diy) {
    diy.faceStyle = FaceStyle.ONE_FACE;
    diy.name = 'Design Support 3';
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

    stack.addToEditor(editor, 'Design Support 3', null, null, 0);

    // Design supports need to be attached to the editor,
    // so the best place to set them up is in
    // createInterface.
    //
    // Note that we are passing the "analyzeDesign"
    // function that we defined above. That function
    // will get called whenever the design support
    // needs to be updated.
    let support = new JavaAdapter(DesignSupport, {
        analysis: '',
        changed: true,
        valid: true,
        getGameComponent() {
            return diy;
        },
        markChanged() {
            this.changed = true;
        },
        isDesignValid() {
            if (this.changed) {
                this.updateAnalysis();
            }
            return this.valid;
        },
        createSupportView() {
            // we can return any component we like,
            // in this case we'll just return a simple label
            let view = label();
            view.horizontalAlignment = swing.JLabel.CENTER;
            view.opaque = true;
            view.background = Palette.get.background.opaque.yellow;
            view.foreground = Palette.get.foreground.translucent.black;
            return view;
        },
        updateSupportView(view) {
            // if the "analysis" is out of date, update it
            if (this.changed) {
                this.updateAnalysis();
            }
            // the view will be a label we returned earlier from
            // createSupportView; for this example, we'll just
            // set its text to our analysis string
            view.text = this.analysis;
        },
        updateAnalysis() {
            // reset the changed flag so we don't do another analysis
            // until the component changes
            this.changed = false;
            // do some "analysis" of the component, for the example
            // we just make a random percentage string
            this.analysis = sprintf('%.0f%%', Math.random() * 100);
            // set this according to whether the component follows
            // all the rules of the game or is unbalanced
            this.valid = true;
        }
    });
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