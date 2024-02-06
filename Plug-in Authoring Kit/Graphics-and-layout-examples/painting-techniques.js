/*
 * painting-techniques-diy.js - version 3
 *
 * Uses a fake game component to demonstrate a wide variety 
 * of effects that can be used to paint card faces.
 */

useLibrary('diy');
useLibrary('ui');
useLibrary('markup');
useLibrary('imageutils');


function create(diy) {
    diy.faceStyle = FaceStyle.PLAIN_BACK;
    diy.name = 'Painting Techniques';
    onClear();
}

function createInterface(diy, editor) {
    let stack = new Stack();
    let bindings = new Bindings(editor, diy);

    let imagePanel = new TypeGrid();
    imagePanel.setTitle('Base Image');

    let imageCombo = comboBox(['Fedora', 'Octopus', 'Logo', 'Eye Dropper', 'Strange Coins', 'Abby']);
    imagePanel.place('Image', '', imageCombo, 'tab');
    bumpComboSize(imageCombo);
    bindings.add('image', imageCombo, [0]);

    let angleField = spinner(0, 359);
    imagePanel.place('Angle', 'br', angleField, 'tab');
    bindings.add('angle', angleField, [0]);

    let opacityField = spinner(0, 100);
    imagePanel.place('Opacity', 'tab', opacityField, 'tab');
    bindings.add('opacity', opacityField, [0]);

    let textureCombo = comboBox(
        [
            'None', 'Red Paint', 'Linear Gradient', 'Radial Gradient',
            'Brushed Gold Texture', 'Leaf Texture', 'Leather Texture'
        ]
    );
    imagePanel.place('Overlay', 'br', textureCombo, 'tab');
    bumpComboSize(textureCombo);
    bindings.add('texture', textureCombo, [0]);

    let filterPanel = new TypeGrid();
    filterPanel.setTitle('Filter Effects');

    let brLabels = [-100, '-100%', 0, '0', 100, '+100%'];
    let briSlider = slider(-100, 100, 0, brLabels);
    filterPanel.place('Brightness', '', briSlider, 'tab hfill');
    bindings.add('brightness', briSlider, [0]);

    let conSlider = slider(-100, 100, 0, brLabels);
    filterPanel.place('Contrast', 'br', conSlider, 'tab hfill');
    bindings.add('contrast', conSlider, [0]);

    let blurCombo = comboBox(
        [
            'None', 'Box (Radius 2)', 'Gaussian (Radius 6)', 'Gaussian (Radius 12)',
            'Gaussian (Radius 24)', 'Sharpen', 'Find Outline', 'Emboss'
        ]
    );
    filterPanel.place('Convolution Filter', 'br', blurCombo, 'tab hfill');
    bindings.add('blur', blurCombo, [0]);

    let filterCombo = comboBox(
        [
            'None', 'Greyscale', 'Hue Shift', 'Saturation Boost',
            'Sepia Tone', 'Invert', 'Bloom', 'Checked', 'Oil Painting'
        ]
    );
    filterPanel.place('Colour Filter', 'br', filterCombo, 'tab hfill');
    bindings.add('filter', filterCombo, [0]);

    let shadowPanel = new TypeGrid();
    shadowPanel.setTitle('Shape Effects');

    let innerGlowCheck = checkBox('Add inner glow to image');
    shadowPanel.place(innerGlowCheck, 'br');
    bindings.add('innerGlow', innerGlowCheck, [0]);

    let outerGlowCheck = checkBox('Add outer glow to image');
    shadowPanel.place(outerGlowCheck, 'br');
    bindings.add('outerGlow', outerGlowCheck, [0]);

    let innerShadowCheck = checkBox('Add inner shadow to image');
    shadowPanel.place(innerShadowCheck, 'br');
    bindings.add('innerShadow', innerShadowCheck, [0]);

    let shadowCheck = checkBox('Add drop shadow to image');
    shadowPanel.place(shadowCheck, 'br');
    bindings.add('shadow', shadowCheck, [0]);

    let shAngleField = spinner(0, 359);
    shadowPanel.place('Angle', 'br', shAngleField, 'tab');
    bindings.add('shAngle', shAngleField, [0]);

    let shDistanceField = spinner(0, 32);
    shadowPanel.place('Distance', 'tab', shDistanceField, 'tab');
    bindings.add('shDistance', shDistanceField, [0]);

    stack.add(imagePanel, filterPanel, shadowPanel);
    stack.addToEditor(editor, 'Painting', null, null, 0);
    bindings.bind();



    let compPanel = PorterDuffDemo.createUIPanel();
    new Stack(compPanel).addToEditor(editor, 'Porter-Duff', null, null, 1);

    let blendPanel = BlendDemo.createUIPanel();
    new Stack(blendPanel).addToEditor(editor, 'Blend Modes', null, null, 2);

    let strokePanel = StrokeDemo.createUIPanel();
    new Stack(strokePanel).addToEditor(editor, 'Strokes', null, null, 3);
}





function createFrontPainter(diy, sheet) {}

function createBackPainter(diy, sheet) {}





function paintFront(g, diy, sheet) {
    // prevent unsaved file warnings
    diy.markSaved();

    sheet.paintTemplateImage(g);

    let image = createImage();

    let angleInRadians = $angle * Math.PI / 180;

    let AT = java.awt.geom.AffineTransform;
    // create a transform that translates to where we
    // want the image painted (middle of the card)
    let template = sheet.templateImage;
    let transform = AT.getTranslateInstance(
        (template.width - image.width) / 2,
        (template.height - image.height) / 2
    );
    // concatenate with a new transform that rotates by
    // the desired angle around the centre point of the image
    transform.concatenate(AT.getRotateInstance(-angleInRadians, image.width / 2, image.height / 2));

    // this uses a version of drawImage that takes
    // a transform directly; we can use a transform
    // on other drawing operations using g.setTransform;
    // however, the graphics context will already have
    // a transform applied to account for the card
    // resolution, so you should always concatenate with
    // the current transform
    g.drawImage(image, transform, null);
}






function createImage() {
    // get base image selected by user
    let res;
    switch ($image) {
        case 'Fedora':
            res = 'icons/black-fedora.png';
            break;
        case 'Logo':
            res = 'icons/application/app@16x.png';
            break;
        case 'Octopus':
            res = 'icons/octopus.png';
            break;
        case 'Eye Dropper':
            res = 'icons/cursors/dropper@4x.png';
            break;
        case 'Strange Coins':
            res = 'portraits/misc-portrait.jp2';
            break;
        case 'Abby':
            res = 'project://pak-assets/abby.jp2';
            break;
        default:
            res = 'icons/ui/error.png';
            break;
    }
    let im = ImageUtils.get(res, true);


    // apply texturing if requested
    switch ($texture) {
        case 'Red Paint':
            im = createTexturedImage(im, Color.RED);
            break;
        case 'Linear Gradient':
            // this class is for simple two-colour gradients;
            // for more complex gradients, use LinearGradientPaint
            im = createTexturedImage(im, new java.awt.GradientPaint(
                0, 0, Color.GRAY,
                im.width, im.height, Color.YELLOW
            ));
            break;
        case 'Radial Gradient':
            let center = new java.awt.geom.Point2D.Float(im.width / 2, im.height / 2);
            let focus = new java.awt.geom.Point2D.Float(im.width / 3, im.height / 3);
            let radius = Math.min(im.width, im.height) / 2;
            let stops = [0, 0.33, 0.5, 0.66, 0.9, 1];
            let colours = [Color.RED, Color.ORANGE, Color.YELLOW.darker(),
                Color.GREEN.darker(), Color.BLUE, Color.MAGENTA
            ];
            let radialPaint = new java.awt.RadialGradientPaint(
                center, radius, focus, stops, colours,
                java.awt.MultipleGradientPaint.CycleMethod.REFLECT
            );
            im = createTexturedImage(im, radialPaint);
            break;
        case 'Brushed Gold Texture':
            im = createTexturedImage(im,
                ImageUtils.get('project://pak-assets/brushed-gold-texture.jp2', true)
            );
            break;
        case 'Leaf Texture':
            im = createTexturedImage(im,
                ImageUtils.get('project://pak-assets/leaf-texture.jp2', true)
            );
            break;
        case 'Leather Texture':
            im = createTexturedImage(im,
                ImageUtils.get('project://pak-assets/leather-texture.jp2', true)
            );
            break;
    }

    // apply requested filters

    let bri = Number($brightness);
    let con = Number($contrast);
    if (bri != 0 || con != 0) {
        im = new ca.cgjennings.graphics.filters.BrightnessContrastFilter(bri / 100, con / 100).filter(im, null);
    }

    switch ($blur) {
        case 'Box (Radius 2)':
            im = createBlurredImage(im, 2, 1);
            break;
        case 'Gaussian (Radius 6)':
            im = createBlurredImage(im, 2, 3);
            break;
        case 'Gaussian (Radius 12)':
            im = createBlurredImage(im, 4, 3);
            break;
        case 'Gaussian (Radius 24)':
            im = createBlurredImage(im, 8, 3);
            break;
        case 'Sharpen':
            im = createSharpenedImage(im);
            break;
        case 'Find Outline':
            im = createEdgeImage(im);
            break;
        case 'Emboss':
            im = createEmbossedImage(im);
            break;
    }

    switch ($filter) {
        case 'Greyscale':
            im = createGreyscaleImage(im);
            break;
        case 'Hue Shift':
            im = createHueShiftedImage(im);
            break;
        case 'Saturation Boost':
            im = createSatBoostedImage(im);
            break;
        case 'Sepia Tone':
            im = createSepiaImage(im);
            break;
        case 'Invert':
            im = createInvertedImage(im);
            break;
        case 'Bloom':
            im = createBloomImage(im);
            break;
        case 'Checked':
            im = createCheckedImage(im);
            break;
        case 'Oil Painting':
            im = createPaintedImage(im);
            break;
    }

    im = createTranslucentImage(im, Number($opacity) / 100);

    if ($$innerGlow.yesNo) {
        im = createGlow(im, false);
    }

    if ($$outerGlow.yesNo) {
        im = createGlow(im, true);
    }

    if ($$innerShadow.yesNo) {
        // Note how Number() is used to convert the settings from strings
        // to numbers before passing them to the function.
        im = createShadow(im, false, 0x000000, 0.8, 3, Number($shAngle), Number($shDistance));
    }

    if ($$shadow.yesNo) {
        im = createShadow(im, true, 0x000000, 0.8, 3, Number($shAngle), Number($shDistance));
    }

    return im;
}






/**
 * createTexturedImage( source, texture )
 * Create a new image whose shape (based on translucency) comes
 * from <tt>source</tt>, and whose surface is painted using a
 * texture. The value of <tt>texture</tt> can be an image, a
 * <tt>Color</tt> (in which case the texture is a solid colour),
 * or a <tt>Paint</tt>.
 */
function createTexturedImage(source, texture) {
    let g = null;
    // if texture is a kind of Paint or colour, create a texture image
    // using the paint
    if (texture instanceof java.awt.Paint) {
        let solidTexture = ImageUtils.create(source.width, source.height, true);
        try {
            g = solidTexture.createGraphics();
            g.setPaint(texture);
            g.fillRect(0, 0, source.width, source.height);
            texture = solidTexture;
        } finally {
            if (g) g.dispose();
            g = null;
        }
    }
    let dest = ImageUtils.create(source.width, source.height, true);
    try {
        g = dest.createGraphics();
        g.drawImage(source, 0, 0, null);
        g.setComposite(java.awt.AlphaComposite.SrcIn);
        g.drawImage(texture, 0, 0, null);
    } finally {
        if (g) g.dispose();
    }
    return dest;
}




/**
 * filterFunction( filter )
 * Creates a function that applies an image filter to an image,
 * returning the result. This is used to create several filter
 * functions below.
 */
function filterFunction(filter) {
    let f = function filter(source) {
        return filter.filter.filter(source, null);
    };
    f.filter = filter;
    return f;
}




/**
 * createHueShiftedImage( source )
 * Returns a copy of the source image with the hues shifted by 180 degrees.
 */
const createHueShiftedImage = filterFunction(
    new ca.cgjennings.graphics.filters.TintFilter(0.5, 1, 1)
);




/**
 * createSatBoostedImage( source )
 * Returns a copy of the source image with the saturation boosted
 * by 50%.
 */
const createSatBoostedImage = filterFunction(
    new ca.cgjennings.graphics.filters.TintFilter(0, 1.5, 1)
);





/**
 * createGreyscaleImage( source )
 * Returns a desaturated copy of the source image.
 */
const createGreyscaleImage = filterFunction(
    new ca.cgjennings.graphics.filters.GreyscaleFilter()
);





/**
 * createSepiaImage( source )
 * Returns a copy of the source image with sepia tone
 * style recolouring.
 */
const createSepiaImage = filterFunction(
    // the sepia filter first converts the image to greyscale, then adjusts
    // the red, green, and blue channels to achieve the sepia effect
    new ca.cgjennings.graphics.filters.CompoundPixelwiseFilter(
        [new ca.cgjennings.graphics.filters.GreyscaleFilter(),
            new ca.cgjennings.graphics.filters.GammaCorrectionFilter(1.5, 1, 0.5)
        ]
    )
);




/**
 * createInvertedImage( source )
 * Returns an inverted copy of the source image.
 */
let createInvertedImage = filterFunction(
    new ca.cgjennings.graphics.filters.InversionFilter()
);





/**
 * createBloomImage( source )
 * Returns a copy of the source image with a bloom effect.
 */
let createBloomImage = filterFunction(
    new ca.cgjennings.graphics.filters.BloomFilter()
);

/**
 * createCheckedImage( source )
 * Returns a copy of the source image with a checkered effect.
 */
let createCheckedImage = filterFunction(
    new ca.cgjennings.graphics.filters.CheckeredScreenFilter(8, 0.5, 1)
);

/**
 * createPaintedImage( source )
 * Returns a copy of the source image that simulates
 * the use of oil paints.
 */
let createPaintedImage = filterFunction(
    new ca.cgjennings.graphics.filters.OilPaintingFilter()
);



/**
 * createBlurredImage( im, radius, iterations )
 * Creates a blurred version of an image using a
 * fast box blur algorithm. Repeated blurring
 * with this filter approximates a Gaussian blur,
 * but is generally faster.
 *
 * im : the image to blur
 * radius : the blur radius
 * iterations : the number of times to repeat the blur
 */
function createBlurredImage(im, radius, iterations) {
    // We could have done this with a convolution (see below),
    // but this specialized filter is much faster. (The kernel
    // for such a convolution is the n by n kernel in which
    // every element is 1/n^2, where n = radius*2 + 1.)
    if (!this["op"]) {
        this.op = new ca.cgjennings.graphics.filters.BlurFilter();
    }
    this.op.setRadius(radius);
    this.op.setIterations(iterations);

    // Pad the source image to allow space for the edge pixels to
    // blur onto.
    let margin = radius * iterations;
    im = ImageUtils.pad(im, margin, margin, margin, margin);
    return this.op.filter(im, null);
}




/**
 * convolveFunction( kernel )
 * Creates a function that applies a 3x3 convolution
 * to a source image. It is used below to define some filtering functions.
 *
 * kernel : an array of 9 values for the convolution kernel
 */
function convolveFunction(kernel) {
    let f = function convolver(source) {
        // create a new version of source with an empty margin around it
        // so that pixels at the edges have space to blur into
        let marginImage = ImageUtils.create(source.width + 4, source.height + 4, true);
        let g;
        try {
            g = marginImage.createGraphics();
            g.drawImage(source, 2, 2, null);
        } finally {
            if (g) g.dispose();
        }
        // apply the convolution operator to create the blurred image
        return convolver.op.filter(marginImage, null);
    };
    f.op = new java.awt.image.ConvolveOp(
        new java.awt.image.Kernel(3, 3, kernel)
    );
    return f;
}

let createSharpenedImage = convolveFunction(
    [0, -1 / 2, 0,
        -1 / 2, 3, -1 / 2,
        0, -1 / 2, 0
    ]
);

let createEdgeImage = convolveFunction(
    [-1, -1, -1,
        -1, 8, -1,
        -1, -1, -1
    ]
);

let createEmbossedImage = convolveFunction(
    [-2, -1, 0,
        -1, 1, 1,
        0, 1, 2
    ]
);


/**
 * createGlow( source, outer )
 * Create a copy of the source image with an inner or outer glow.
 */
function createGlow(source, outer) {
    // if applying an outer glow, we need to pad the area around the original image
    // with extra (transparent) pixels so there is space for the glow to bleed onto
    if (outer) {
        let margin = createGlow.op.distance + createGlow.op.iterations;
        source = ca.cgjennings.graphics.ImageUtilities.pad(source, margin, margin, margin, margin);
    }
    createGlow.op.outerGlow = outer;
    return createGlow.op.filter(source, null);
}
createGlow.op = new ca.cgjennings.graphics.filters.GlowFilter();
createGlow.op.color = new Colour(0xff0000);
createGlow.op.distance = 3;
createGlow.op.iterations = 3;
createGlow.op.strength = 2;


/**
 * createShadow( source, inner, colour, opacity, blur, angle, distance )
 * Returns a copy of the source image that includes a shadow.
 *
 * source : the image to apply a shadow to
 * outer : if true, an outer (drop) shadow will be created (as if source is above the image plane)
 * colour: the hexadecimal colour value of the shadow (default is black, 0x000000)
 * opacity : the opacity of the shadow, from 0 to 1
 * blur : the blur radius of the shadow
 * angle : the angle of the light source, in degrees
 * distance : the distance from the object to the shadow, in pixels
 */
function createShadow(source, outer, colour, opacity, blur, angle, distance) {
    // Fill in defaults for missing parameters.
    if (outer === undefined) outer = true;
    if (colour === undefined) colour = 0x000000;
    if (opacity === undefined) opacity = 0.8;
    if (blur === undefined) blur = 3;
    if (angle === undefined) angle = 315;
    if (distance === undefined) distance = 4;

    // Convert the angle from degrees to radians, then calculate the position
    // of the shadow relative to the position of the source image.
    angle *= -Math.PI / 180;
    let dx = Math.cos(angle) * distance + 0.5;
    let dy = Math.sin(angle) * distance + 0.5;

    // Create an image of the source's shadow. The shadow image is created
    // using a glow filter set to not draw the source image. This allows us
    // to draw the source image ourselves, so we can offset the shadow (glow)
    // away from the source image by the requested distance.
    createShadow.op.color = new Colour(colour);
    createShadow.op.distance = blur;
    createShadow.op.outerGlow = outer;

    let margin;
    if (outer) {
        margin = blur + createShadow.op.iterations;
    } else {
        margin = distance;
    }
    source = ca.cgjennings.graphics.ImageUtilities.pad(source, margin, margin, margin, margin);
    let shadowImage = createShadow.op.filter(source, null);

    // Combine the shadow and source image into a single result. To drop an outer (drop) shadow,
    // we just draw the shadow and then draw the source image over it. To draw an inner shadow,
    // we need to use SrcAtop mode so that only the part of the shadow image that intersects with
    // the source image will be drawn.
    let sourceOffset = outer ? distance : 0;
    let dest = ImageUtils.create(source.width + sourceOffset * 2, source.height + sourceOffset * 2, true);
    let g = dest.createGraphics();
    try {
        let oldComp = g.getComposite();
        if (outer) {
            g.setComposite(java.awt.AlphaComposite.SrcOver.derive(opacity));
            g.drawImage(shadowImage, sourceOffset + dx, sourceOffset + dy, null);
            g.setComposite(oldComp);
        }
        g.drawImage(source, sourceOffset, sourceOffset, null);
        if (!outer) {
            g.setComposite(java.awt.AlphaComposite.SrcAtop.derive(opacity));
            g.drawImage(shadowImage, sourceOffset + dx, sourceOffset + dy, null);
            g.setComposite(oldComp);
        }
    } finally {
        g.dispose();
    }

    return dest;
}
createShadow.op = new ca.cgjennings.graphics.filters.GlowFilter();
createShadow.op.iterations = 2;
createShadow.op.sourceImagePainted = false;



/**
 * createTranslucentImage( source, opacity )
 * Create a copy of the source image with an opacity change.
 * This is similar to setting the layer opacity in software
 * like Photoshop.
 */
function createTranslucentImage(source, opacity) {
    if (opacity >= 1) return source;
    let im = ImageUtils.create(source.width, source.height, true);
    if (opacity <= 0) return im;

    let g = im.createGraphics();
    try {
        g.composite = java.awt.AlphaComposite.SrcOver.derive(opacity);
        g.drawImage(source, 0, 0, null);
    } finally {
        g.dispose();
    }
    return im;
}



/**
 * Demonstrates the various drawing app blending modes
 * added in 2.1a11.
 */
let BlendDemo = {
    // size of the control that displays the source and blend images
    SOURCE_SIZE: 64,
    // size of the control that displays the blended output image
    DEST_SIZE: 256,

    // updates the source and blend image to match the current selection
    changeBlendImages: function changeBlendImages(actionEvent) {
        // Note: we can't use this.imageCombo.selectedIndex because the
        //       conversion to an ActionListener object changes the
        //       value of 'this' from BlendDemo to the proxy object.
        let thiz = BlendDemo;
        let size = thiz.DEST_SIZE;
        switch (thiz.imageCombo.selectedIndex) {
            case -1:
            case 0:
                thiz.srcImage = thiz.createBlendSource(0.5, 1, 0.5, 0, size, Color.WHITE);
                thiz.bldImage = thiz.createBlendSource(0, 0.5, 1, 0.5, size, Color.WHITE);
                break;
            case 1:
                thiz.srcImage = thiz.createBlendSource(0.5, 1, 0.5, 0, size, Color.MAGENTA);
                thiz.bldImage = thiz.createBlendSource(0, 0.5, 1, 0.5, size, Color.CYAN);
                break;
            case 2:
                thiz.srcImage = thiz.createBlendImage('example/leaf-texture.jp2', size);
                thiz.bldImage = thiz.createBlendImage('example/brushed-gold-texture.jp2', size);
                break;
        }

        size = thiz.SOURCE_SIZE;
        thiz.srcBox.icon = new swing.ImageIcon(ImageUtils.resize(thiz.srcImage, size, size));
        thiz.bldBox.icon = new swing.ImageIcon(ImageUtils.resize(thiz.bldImage, size, size));

        thiz.changeBlendMode();
    },

    // updates the destination control using the currently selected blend mode
    changeBlendMode: function changeBlendMode(actionEvent) {
        let thiz = BlendDemo; // (See above)
        let sel = thiz.modeCombo.selectedItem;
        if (sel == null) return;

        let className = '' + sel.toString().replace(' ', '');

        let blender = ca.cgjennings.graphics.composites.BlendMode[className];

        let dest = ImageUtils.create(thiz.bldImage.width, thiz.bldImage.height, true);
        let g;
        try {
            g = dest.createGraphics();
            g.drawImage(thiz.bldImage, 0, 0, null);
            g.setComposite(blender);
            g.drawImage(thiz.srcImage, 0, 0, null);
        } finally {
            if (g) g.dispose();
        }
        thiz.dstBox.icon = new swing.ImageIcon(dest);
    },

    // create a source image for blending using a colour gradient
    createBlendSource: function createBlendSource(x1, y1, x2, y2, size, col) {
        let im = ImageUtils.create(size, size, true);
        let scale = size-1;
        let paint = new java.awt.GradientPaint(
            x1 * scale, y1 * scale, Color.BLACK,
            x2 * scale, y2 * scale, col, true
        );
        let g = null;
        try {
            g = im.createGraphics();
            g.setPaint(paint);
            g.fillRect(0, 0, size, size);
        } finally {
            if (g) g.dispose();
        }
        return im;
    },

    // create a source image for blending using an image resource
    createBlendImage: function createBlendImage(name, size) {
        let dest = ImageUtils.create(size, size, false);
        let im = ImageUtils.get(name, true);

        let g = null;
        try {
            g = dest.createGraphics();
            // assumes im.width <= im.height
            g.drawImage(im, 0, 0, size, size, 0,
                im.height-im.width, im.width, im.width,
                null);
        } finally {
            if (g) g.dispose();
        }

        return dest;
    },


    // creates a control to display a source, blend, or destination image
    blendBox: function blendBox(size) {
        let bb = new swing.JLabel();
        bb.setPreferredSize(new java.awt.Dimension(size + 2, size + 2));
        bb.border = swing.BorderFactory.createLineBorder(Color.GRAY, 1);
        return bb;
    },

    // creates a panel of controls that can be used to interactively
    // experiment with blending modes
    createUIPanel: function createUIPanel() {
        let blendPanel = new TypeGrid();
        blendPanel.setTitle('Blend Mode Compositing Demo');

        this.imageCombo = comboBox(['Greyscale', 'Colour', 'Images']);
        blendPanel.place('Source Images', '', this.imageCombo, 'tab');
        bumpComboSize(this.imageCombo);
        this.imageCombo.addActionListener(this.changeBlendImages);

        this.modeCombo = comboBox(
            ['Darken', 'Lighten', 'Add', 'Subtract', 'Difference', 'Multiply', 'Screen',
                'Burn', 'Color Burn', 'Dodge', 'Color Dodge', 'Linear Burn', 'Overlay',
                'Hard Light', 'Soft Light', 'Linear Light', 'Pin Light', 'Vivid Light', 'Hard Mix',
                'Reflect', 'Glow', 'Exclusion', 'Negation',
                'Hue', 'Saturation', 'Color', 'Luminosity'
            ]
        );
        blendPanel.place('Blending Mode', 'br', this.modeCombo, 'tab');
        bumpComboSize(this.modeCombo);
        this.modeCombo.addActionListener(this.changeBlendMode);

        this.srcBox = this.blendBox(this.SOURCE_SIZE);
        this.bldBox = this.blendBox(this.SOURCE_SIZE);
        this.dstBox = this.blendBox(this.DEST_SIZE);

        blendPanel.place('  ', 'p center', this.srcBox, '', ' + ', '', this.bldBox, '', ' =', '');
        blendPanel.place(this.dstBox, 'p');

        // create the initial blended image
        this.changeBlendImages();

        return blendPanel;
    }
};





let PorterDuffDemo = new Object() {
    SIZE: 256,

    createUIPanel: function createUIPanel() {
        function makeImage(size, circle, c1, c2) {
            size *= 2 / 3;
            let src = ImageUtils.create(size, size, true);
            let g = null;
            try {
                g = src.createGraphics();
                g.setPaint(new java.awt.GradientPaint(
                    size / 2, 0, c1,
                    size / 2, size, c2
                ));
                if (circle) {
                    g.fillOval(2, 2, size-5, size-5);
                } else {
                    g.fillRect(2, 2, size-5, size-5);
                }
                g.setPaint(Color.BLACK);
                g.setRenderingHint(
                    java.awt.RenderingHints.KEY_ANTIALIASING,
                    java.awt.RenderingHints.VALUE_ANTIALIAS_ON
                );
                g.setStroke(new java.awt.BasicStroke(4));
                if (circle) {
                    g.drawOval(2, 2, size-5, size-5);
                } else {
                    g.drawRect(2, 2, size-5, size-5);
                }
            } finally {
                if (g) g.dispose();
            }
            return src;
        }

        this.box = makeImage(this.SIZE, false, new Color(0x5555ff), new Color(0xf7f7ff));
        this.circle = makeImage(this.SIZE, true, new Color(0xfff7f7), new Color(0xff5555));

        let compPanel = new TypeGrid();
        compPanel.setTitle('Porter-Duff Compositing Demo');

        this.compCombo = comboBox([
            'Clear',
            'Dst', 'DstAtop', 'DstIn', 'DstOut', 'DstOver',
            'Src', 'SrcAtop', 'SrcIn', 'SrcOut', 'SrcOver',
            'Xor'
        ]);
        compPanel.place('Rule', '', this.compCombo, 'tab');
        this.compCombo.selectedItem = 'SrcOver';
        bumpComboSize(this.compCombo);

        this.dstOpacity = spinner(0, 100);
        compPanel.place('Dst Opacity', 'br', this.dstOpacity, 'tab');
        this.dstOpacity.value = 100;


        this.srcOpacity = spinner(0, 100);
        compPanel.place('Src Opacity', 'br', this.srcOpacity, 'tab');
        this.srcOpacity.value = 100;


        this.outputBox = BlendDemo.blendBox(this.SIZE);
        compPanel.place(this.outputBox, 'p center');

        // here is another way to deal with the problem of 'this' changing
        // when creating a proxy object from a function: define a variable
        // as this outside of the function, then use the closure to access
        // it from inside the function:
        let thiz = this;

        function changeComposition(event) {
            let rule = thiz.compCombo.selectedItem;
            if (rule == null) return;

            let dstOpacity = thiz.dstOpacity.value / 100;
            let srcOpacity = thiz.srcOpacity.value / 100;

            let g = null;
            let im = ImageUtils.create(thiz.SIZE, thiz.SIZE, true);
            try {
                g = im.createGraphics();
                g.setComposite(java.awt.AlphaComposite.SrcOver.derive(dstOpacity));
                g.drawImage(thiz.box, 0, 0, null);
                g.setComposite(java.awt.AlphaComposite[rule].derive(srcOpacity));
                g.drawImage(thiz.circle, thiz.SIZE / 3, thiz.SIZE / 3, null);
            } finally {
                if (g) g.dispose();
            }

            thiz.outputBox.icon = new swing.ImageIcon(im);
        }

        this.compCombo.addActionListener(changeComposition);
        this.dstOpacity.addChangeListener(changeComposition);
        this.srcOpacity.addChangeListener(changeComposition);

        // initialize demo image
        changeComposition();

        return compPanel;
    }
};





let StrokeDemo = new Object() {
    SIZE: 256,

    createUIPanel: function createUIPanel() {
        let strokePanel = new TypeGrid();
        strokePanel.setTitle('Stroke Demo');
        let thiz = this;

        let width = spinner(1, 8);
        let caps = comboBox(['Butt', 'Round', 'Square']);
        let join = comboBox(['Bevel', 'Miter', 'Round']);
        let limit = noMarkup(textField('10.0', 4));
        let dash = noMarkup(textField('8,3,4,3'));
        bumpComboSize(caps);
        bumpComboSize(join);

        strokePanel.place(
            'Width', '', width, 'tab',
            'Cap', 'br', caps, 'tab',
            'Join', 'br', join, 'tab', 'Miter Limit', 'tab', limit, 'tab',
            'Dashes', 'br', dash, 'tab hfill'
        );

        // create a stroke from the current control settings
        function update() {
            let s;
            try {
                let dashArray = dash.text.trim();
                if (dashArray.isEmpty()) {
                    s = new java.awt.BasicStroke(
                        width.getValue().intValue(),
                        caps.selectedIndex,
                        join.selectedIndex, Number(limit.text)
                    );
                } else {
                    dashArray = eval('[' + dash.text + '];');
                    if (dashArray.length < 2) {
                        dashArray = null;
                    }
                    s = new java.awt.BasicStroke(
                        width.getValue().intValue(),
                        caps.selectedIndex,
                        join.selectedIndex, Number(limit.text),
                        dashArray, 0
                    );
                }
                starBox.setStroke(s);
            } catch (ex) {
                // bad data in one of the fields
                java.awt.Toolkit.getDefaultToolkit().beep();
                error.handleUncaught(ex);
            }
        }
        width.addChangeListener(update);
        caps.addActionListener(update);
        join.addActionListener(update);
        limit.addActionListener(update);
        dash.addActionListener(update);
        update();

        // our simple star component doesn't
        // obey the rules for handling borders,
        // so we put it inside a panel that does
        let starPanel = new swing.JPanel();
        starPanel.add(starBox);
        starPanel.border = swing.BorderFactory.createLineBorder(Color.GRAY, 1);
        starBox.setPreferredSize(new java.awt.Dimension(this.SIZE + 2, this.SIZE + 2));

        strokePanel.place(starPanel, 'p center');

        return strokePanel;
    }
};

// a simple custom UI component that paints
// a star shape 
let starBox = new swing.JComponent() {
    pen: new java.awt.BasicStroke(1),
    arms: 46,

    setStroke: function setStroke(s) {
        // Note: if we had named this 'stroke'
        // instead of pen, JavaScript would have gotten
        // confused because we are subclassing a Java class
        // and JS will automatically create a setter named
        // 'stroke' because of the name of this function.
        this.pen = s;
        this.repaint();
    },

    paintComponent: function paintComponent(g) {
        g.setRenderingHint(
            java.awt.RenderingHints.KEY_ANTIALIASING,
            java.awt.RenderingHints.VALUE_ANTIALIAS_ON
        );

        let w = this.getWidth();
        let h = this.getHeight();

        let cx = w / 2;
        let cy = h / 2;

        let baseRadius = Math.min(w, h) / 2;
        let r1 = baseRadius * 0.5;
        let r2 = baseRadius * 0.8;
        let r3 = baseRadius * 0.4;

        let maxAngle = 2 * Math.PI;
        let arc = maxAngle / this.arms;
        let path = new java.awt.geom.Path2D.Float();
        path.moveTo(cx + r2, cy);
        for (let angle = 0; angle < maxAngle; angle += arc) {
            let innerAngle = angle + arc / 2;
            let outerAngle = angle + arc;
            path.lineTo(cx + r1 * Math.cos(innerAngle), cy + r1 * Math.sin(innerAngle));
            path.lineTo(cx + r2 * Math.cos(outerAngle), cy + r2 * Math.sin(outerAngle));
        }

        g.setPaint(Color.WHITE);
        g.fillRect(0, 0, this.getWidth(), this.getHeight());

        g.setStroke(this.pen);

        g.setPaint(this.createPaint(Color.ORANGE, Color.YELLOW, r2, cx, cy, cx, cy));
        g.fill(path);
        g.setPaint(Color.BLACK);
        g.draw(path);
        g.setPaint(this.createPaint(Color.YELLOW, Color.WHITE, r3, cx, cy, cx * 0.8, cy * 0.8));
        g.fillOval(cx - r3, cy - r3, 2 * r3, 2 * r3);
        g.setPaint(Color.BLACK);
        g.drawOval(cx - r3, cy - r3, 2 * r3, 2 * r3);
        g.drawRect(cx - r2 - 12, cy - r2 - 12, 2 * r2 + 24, 2 * r2 + 24);

        // delete these lines if you don't want a face
        // the face provides more example lines, but it ain't pretty
        g.drawArc(cx - r3 + 24, cy, 2 * r3 - 48, r3 - 24, 230, 80);
        g.drawOval(cx - r3 / 2.5 - 8, cy - r3 / 2.5, 16, 12);
        g.drawOval(cx + r3 / 2.5 - 8, cy - r3 / 2.5, 16, 12);
    },

    createPaint: function createPaint(outerColor, innerColor, radius, cx, cy, fx, fy) {
        let center = new java.awt.geom.Point2D.Float(cx, cy);
        if (fx === undefined) fx = cx;
        if (fy === undefined) fy = cx;
        let focus = new java.awt.geom.Point2D.Float(fx, fy);
        return new java.awt.RadialGradientPaint(
            center, radius, focus, [0, 1], [innerColor, outerColor],
            java.awt.MultipleGradientPaint.CycleMethod.REFLECT
        );
    }
};


/**
 * Adjusts the width of a combo box to account for the
 * size of the dropdown arrow. 
 */
function bumpComboSize(box) {
    box.setPreferredSize(null);
    let ps = box.getPreferredSize();
    ps.width += 20;
    box.setPreferredSize(ps);
}

function paintBack(g, diy, sheet) {}

function onClear() {
    $angle = '0';
    $opacity = '100';
    $image = 'Octopus';
    $texture = 'None';
    $blur = 'None';
    $brightness = '0';
    $contrast = '0';
    $filter = 'None';
    $innerGlow = 'no';
    $outerGlow = 'no';
    $innerShadow = 'no';
    $shadow = 'no';
    $shAngle = '315';
    $shDistance = '16';
    $compRule = 'Dst';
    $compOpacity = '100';
}

function onRead() {}

function onWrite() {}

if (sourcefile == 'Quickscript') {
    testDIYScript();
}