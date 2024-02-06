/*
 * roving-portrait-region.js
 *
 * An example DIY card that demonstrates how to move a portrait's
 * region around on the card face. This example builds on your
 * experience from the previous examples, so it omits some details.
 */

useLibrary('diy');
useLibrary('ui');
useLibrary('markup');
useLibrary('imageutils');

importClass(arkham.component.DefaultPortrait);

const REGION_1 = '75,16,96,96';
const REGION_2 = '100,200,32,72';

let portrait;

function getPortraitCount() {
    return 1;
}

function getPortrait(index) {
    return portrait;
}

function create(diy) {
    diy.faceStyle = FaceStyle.ONE_FACE;
    diy.name = 'Roving Portraits';

    // The magic line that causes the component's portraits to be
    // obtained from our getPortraitCount and getPortrait function
    // instead of using the simple system built into DIYs:	
    diy.customPortraitHandling = true;

    $roving_portrait_template = 'portraits/misc-portrait.jp2';
    $roving_portrait_clip_region = REGION_1;
    portrait = new DefaultPortrait(diy, 'roving');
    portrait.facesToUpdate = [0];
    portrait.backgroundFilled = true;
    portrait.installDefault();
}

function createInterface(diy, editor) {
    let stack = new Stack();

    function movePortrait() {
        if (toggle.isSelected()) {
            $roving_portrait_clip_region = REGION_2;
        } else {
            $roving_portrait_clip_region = REGION_1;
        }

        // Since the region is a different size and aspect ratio,
        // good idea to reset the image layout
        let image = portrait.image;
        portrait.pan = portrait.computeDefaultImagePan(image);
        portrait.scale = portrait.computeDefaultImageScale(image);
        portrait.rotation = portrait.computeDefaultImageRotation(image);
        // Set a "new" portrait on the the portrait panel so it updates
        // the shape from the changed region
        portPanel.portrait = portrait;
    }

    let toggle = toggleButton(
        "Move portrait", null,
        // whether the button is initially selected
        $roving_portrait_clip_region === REGION_2,
        // function to call when the button is pressed
        movePortrait
    );

    let portPanel = portraitPanel(diy, 0);
    portPanel.panelTitle = 'Rover';

    stack.add(toggle, portPanel);
    stack.addToEditor(editor, 'Roving Portrait');
}

function createFrontPainter(diy, sheet) {}

function createBackPainter(diy, sheet) {}

function paintFront(g, diy, sheet) {
    // Prevent unsaved file warnings since this is just a demo:
    diy.markSaved();

    sheet.paintTemplateImage(g);
    portrait.paint(g, sheet.getRenderTarget());
}

function paintBack(g, diy, sheet) {}

function onClear() {}

function onRead(diy, ois) {
    portrait = ois.readObject();
}

function onWrite(diy, oos) {
    oos.writeObject(portrait);
}

if (sourcefile == 'Quickscript') {
    testDIYScript();
}