/*
 * make-generic-aspect-ratio-icons - version 1
 * 
 * Creates an editor icon featuring a blank
 * card in the specifed aspect ratio.
 */

// corner roundness of card images
const ROUNDNESS = 3;
// card sizes, in inches [w,h]
const SIZES_TO_CREATE = [
    [2.75, 4.75]
];



useLibrary("imageutils");
importClass(java.awt.RenderingHints)

const base1x = ImageUtils.get("project://Graphics-templates/blank-editor-icon.png");
const base2x = ImageUtils.get("project://Graphics-templates/blank-editor-icon@2x.png");

function saveImage(im, fileName) {
    const baseDir = Eons.openProject.findMember("Graphics-templates").file;
    let path = new java.io.File(baseDir, fileName);
    println(`Saving ${path}`);
    ImageUtils.write(im, path, "png", 1);
}

/**
 * Given a template image to use as a background and size guide, returns a new
 * image with the same dimensions with a card of the specified aspect ratio
 * drawn on top of it. The padding value adds extra space around the card, and
 * roundness controls the roundness of the corners. Both are specified relative
 * to the base image size of 24x24.
 */
function createImageFromTemplate(template, cardWidth, cardHeight, padding, roundness) {
    const W = template.width;
    const H = template.height;

    roundness = Math.round(roundness/24 * W)
    padding = Math.max(1, Math.round(padding/24 * W));

    const im = ImageUtils.create(W, H, true);

    let w, h;
    if (cardWidth > cardHeight) {
        w = W - padding * 2;
        h = w * cardHeight / cardWidth;
    } else {
        h = H - padding * 2;
        w = h * cardWidth / cardHeight;
    }

    const x = Math.round((W - w) / 2);
    const y = Math.round((H - h) / 2);
    const g = im.createGraphics();
    try {
        g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        g.drawImage(template, 0, 0, W, H, null);
        g.setColor(new Colour(0, 0, 0, 0.5));
        g.fillRoundRect(x-1, y-1, w+2, h+2, roundness, roundness);
        g.setColor(Colour.WHITE);
        g.fillRoundRect(x, y, w, h, roundness, roundness);
    } finally {
        g.dispose();
    }

    return im;
}

function createImagesForSize(w, h) {   
    // linear interpolation of padding based on the size:
    //   <= 1" -> 9px padding
    //   >= 5" -> 1px padding
    const MAX_SIZE = 5;
    const MIN_SIZE = 1;
    const MAX_PAD = 9;
    const MIN_PAD = 1;
    const max = Math.min(MAX_SIZE, Math.max(MIN_SIZE, Math.max(w, h)));
    const ratio = 1 - ((max-MIN_SIZE) / (MAX_SIZE - MIN_SIZE));
    const padding = Math.round(MIN_PAD + (ratio * (MAX_PAD - MIN_PAD)));

    const fileBaseName = sprintf("editor-icon-%.2fx%.2f", w, h);
    const im1x = createImageFromTemplate(base1x, w, h, padding, ROUNDNESS);
    saveImage(im1x, fileBaseName + ".png");
    const im2x = createImageFromTemplate(base2x, w, h, padding, ROUNDNESS);
    saveImage(im2x, fileBaseName + "@2x.png");
    return [im1x, im2x];
}

for (let dimen of SIZES_TO_CREATE) {
    createImagesForSize(dimen[0], dimen[1]);
}
