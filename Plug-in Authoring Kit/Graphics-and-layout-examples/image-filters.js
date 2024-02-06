/*
 * image-filters.js - version 1
 *
 * Interactively demonstrates graphics filters in
 * ca.cgjennings.graphics.filters, with automatically
 * generated fields that allow you to modify the filter
 * parameters.
 *
 * NOTE:
 * Not all filters are demonstrated, including:
 * ChannelSwapFilter, CloneFilter, CompoundPixelwiseFilter,
 * ReplaceHueSaturationFilter, TintOverlayFilter, TrimFilter 
 */

useLibrary('ui');
useLibrary('imageutils');

importPackage(ca.cgjennings.graphics.filters);
importClass(ca.cgjennings.graphics.ImageUtilities);

// An array of the image filters we will demo; each element
// is an object with the property 'name' (the class name of
// the filter), and properties for each of the parameters that
// controls the filter. Each parameter is an array of three to four
// elements:
// [default]
// [default, rows]
// [prefix, default, suffix]
// [prefix, default, suffix, rows]
// 'default' is the default value of the parameter; rows is the number
// of rows to allow for editing the value (default: 1 row); prefix
// is code to put before the value when setting it (default: '');
// suffix is code to put after the value when setting it (default: '').
// The filter parameters are set by evaluating script code that looks
// roughly like this:
// filter.parameterName = prefix value suffix;
// Where parameterName is the name of the property, and value is the
// current value for the property as entered by the user (the value
// starts out as the 'default' element specified in the array).
const filters = [{
    name: 'AlphaInversionFilter'
}, {
    name: 'AlphaStrengthenFilter',
    strengthFactor: [1]
}, {
    name: 'BloomFilter',
    strength: ['1.00'],
    threshold: ['0.66']
}, {
    name: 'BlurFilter',
    horizontalRadius: [4],
    verticalRadius: [4],
    iterations: [1]
}, {
    name: 'BrightnessContrastFilter',
    brightness: ['-0.1'],
    contrast: ['+0.4']
}, {
    name: 'ChannelFunctionFilter',
    alphaFunction: ['function fA(x){ return ', '0.7*x', '; }'],
    redFunction: ['function fR(x){ return ', 'x*x', '; }'],
    greenFunction: ['function fG(x){ return ', 'Math.pow(x, 1.2)', '; }'],
    blueFunction: ['function fB(x){ return ', '1-x', '; }']
}, {
    name: 'CheckeredScreenFilter',
    evenAlpha: ['0.25'],
    oddAlpha: ['1.00']
}, {
    name: 'ClearFilter',
    colorRGB: rgbParam('ffff0000'),
}, {
    name: 'ColorOverlayFilter',
    colorRGB: rgbParam('ff0000'),
    alphaInverted: ['false']
}, {
    name: 'ConvolveFilter',
    kernel: ['makeKernel( [', '[-1,-1,-1],\n[-1, 8,-1],\n[-1,-1,-1]', '] )', 5],
    edgeHandling: ['EdgeHandling.', 'REPEAT', '']
}, {
    name: 'GammaCorrectionFilter',
    redGamma: ['+2.5'],
    greenGamma: ['+1.0'],
    blueGamma: ['-0.5']
}, {
    name: 'GaussianBlurFilter',
    radius: [1.5]
}, {
    name: 'GlowFilter',
    colorRGB: rgbParam('ffff00ff'),
    width: [2],
    blurRadius: [4],
    iterations: [1],
    strength: [1],
    outerGlow: ['true'],
    sourceImagePainted: ['true'],
}, {
    name: 'GreyscaleFilter'
}, {
    name: 'InversionFilter'
}, {
    name: 'MarginFilter',
    topMargin: [8],
    leftMargin: [8],
    bottomMargin: [8],
    rightMargin: [8],
    edgeHandling: ['EdgeHandling.', 'WRAP', '']
}, {
    name: 'OilPaintingFilter',
    smearRadius: [1],
    levels: [256]
}, {
    name: 'SharpenFilter',
    sharpeningFactor: ['1.00']
}, {
    name: 'StencilFilter',
    stencil: ['resources.StrangeImage.get("', 'res:icons/application/information.png', '").asBufferedImage()'],
    alphaReplaceMode: ['false']
}, {
    name: 'StrokeFilter',
    colorRGB: rgbParam('ffff0000'),
    width: ['2'],
    position: ['StrokeFilter.Position.', 'OUTSIDE', ''],
    roundedPen: ['true']
}, {
    name: 'SubstitutionFilter',
    target: rgbParam('ff4490cc'),
    replacement: rgbParam('ffff00ff'),
    errorTolerance: ['0.0'],
    blendedWithOriginal: ['false']
}, {
    name: 'TintFilter',
    HFactor: ['+0.25'],
    SFactor: ['1.25'],
    BFactor: ['0.80']
}, {
    name: 'TurnAndFlipFilter',
    orientation: [1]
}];

// a list of filters for which the source image
// should be filtered BEFORE it is padded 
let filterBeforeList = [
    MarginFilter, StencilFilter
];

// creates a parameter description array for a colour value
function rgbParam(defval) {
    return ['java.lang.Long.valueOf("', defval, '",16).intValue()'];
}

// makes a kernel from a list of arrays; used to parse the
// convolve filter parameter
function makeKernel(data) {
    let rows = data.length;
    let cols = data[0].length;
    let unrolled = [];
    for (let r = 0; r < rows; ++r) {
        let el = data[r];
        for (let c = 0; c < cols; ++c) {
            if (c >= el.length) {
                unrolled[unrolled.length] = 0;
            } else {
                unrolled[unrolled.length] = el[c];
            }
        }
    }
    return new java.awt.image.Kernel(cols, rows, unrolled);
}



// Given one of the parameter description arrays
// for one of the filter descriptions in filters,
// this returns a normalized version of the array
// that always has the form [prefix, default, suffix, rows]
function normalizeParameter(array) {
    switch (array.length) {
        case 1:
            return ['', array[0], '', 1];
        case 2:
            return ['', array[0], '', array[1]];
        case 3:
            return [array[0], array[1], array[2], 1];
        case 4:
            return array;
        default:
            throw new Error('wrong length for parameter description');
    }
}

// Shows documentation for the selected filter
function showJavaDoc() {
    if (filterBox.selectedIndex < 1) return;
    let url = 'https://cgjennings.github.io/se3docs/assets/javadoc/' + 'ca/cgjennings/graphics/filters/' + filterBox.selectedItem;
    java.awt.Desktop.desktop.browse(new java.net.URI(url));
}






let curFilter = null;

// Called when the filter or filter parameters change to
// update the filtered image in the interface.
function updateImage(filter) {
    // create a new filtered image
    let base = ImageUtils.get('icons/application/update.png');

    let padFirst = true;
    for (let f = 0; f < filterBeforeList.length; ++f) {
        if (filter instanceof filterBeforeList[f]) {
            padFirst = false;
            break;
        }
    }

    let w = base.width;
    let h = base.height;
    let padW = w;
    let padH = h;
    if (padFirst) {
        base = ImageUtils.pad(base, padH, padW, padH, padW);
    }
    if (filter != null) {
        try {
            base = filter.filter(base, null);
        } catch (ex) {
            setErrorMessage(ex);
        }
    }
    if (!padFirst) {
        padW = (w * 3 - base.width) / 2;
        padH = (h * 3 - base.height) / 2;
        base = ImageUtils.pad(base, padH, padW, padH, padW);
    }
    w = base.width;
    h = base.height;
    let out = ImageUtils.create(w, h, true);
    let g = out.createGraphics();
    try {
        g.setPaint(updateImage.paint);
        g.fillRect(0, 0, w, h);
        g.drawImage(base, 0, 0, null);
    } finally {
        g.dispose();
    }
    // update the UI
    imageLabel.icon = new swing.ImageIcon(out);
}
updateImage.paint = new ca.cgjennings.graphics.paints.CheckeredPaint();


// an array of the controls that modify the current filter;
// these have all the information needed to update the current
// filter when its parameters change
let filterControls = [];

// Modifies the current filter with the values of the filter controls.
function updateFilter() {
    docBtn.enabled = filterBox.selectedIndex > 0;
    setErrorMessage(null);
    for (let i = 0; i < filterControls.length; ++i) {
        try {
            let name = filterControls[i].getClientProperty('pName');
            let array = filterControls[i].getClientProperty('pArray');
            let value = filterControls[i].text;
            if (value == '') value = array[1];
            let code = 'curFilter.' + name + ' = ' + array[0] + value + array[2] + ';';
            eval(code);
        } catch (ex) {
            setErrorMessage(ex);
        }
    }
}

// Updates the error message box with a message derived from the specified exception
function setErrorMessage(ex) {
    if (ex == null) {
        errorMessage.text = ' ';
    } else {
        let message = ex['javaException'] ? ex.javaException.message : ex.rhinoException.details();
        errorMessage.text = '<html>' + ResourceKit.makeStringHTMLSafe(message);
    }
}



// This is the event listener called when the user changes
// the filter; it creates controls for the filter properties.
function filterChanged(actionEvent) {
    // clear previous filter controls
    controlPanel.removeAll();
    filterControls = [];

    // install new filter controls, if any
    let sel = filterBox.selectedIndex;
    if (sel >= 1) {
        let filterDesc = filters[sel - 1];
        curFilter = eval('new ' + filterDesc.name + '();');
        let grid = new TypeGrid();
        for (let p in filterDesc) {
            if (p == 'name') continue;
            let array = normalizeParameter(filterDesc[p]);
            grid.place(p, 'br');
            let rows = array[3];
            let ctrl;
            if (rows == 1) {
                ctrl = textField(array[1], 20);
            } else {
                ctrl = textArea(array[1], rows, 15);
            }
            grid.place(ctrl, 'tab');
            ctrl.select(0, 0);
            ctrl.putClientProperty('pName', p);
            ctrl.putClientProperty('pArray', array);
            ctrl.addFocusListener(filterChanged.focusListener);
            filterControls[filterControls.length] = ctrl;
        }
        if (filterControls.length > 0) {
            grid.title = null;
            controlPanel.add(grid.realize());
        }
    } else {
        curFilter = null;
    }
    if (dialog.visible) {
        dialog.validate();
        updateFilter();
        updateImage(curFilter);
    }
}
filterChanged.focusListener = new java.awt.event.FocusListener {
    focusGained: function focusGained(focusEvent) {},
    focusLost: function focusLost(focusEvent) {
        updateFilter();
        updateImage(curFilter);
    }
};


// Build and display the user interface
let imageLabel = label(null);
updateImage();

let panel = new Grid('', '', '');
panel.place(imageLabel, 'ax center, wrap unrel', '', 'pushx, wrap unrel');

// create the combo box of filters
let options = ['None'];
for (let f = 0; f < filters.length; ++f) {
    options[options.length] = filters[f].name;
}
let filterBox = comboBox(options, filterChanged);
let docBtn = button('Read &Docs', null, showJavaDoc);
docBtn.enabled = false;
panel.place(filterBox, 'ax center, split', docBtn, 'wrap');

// this is an empty container that we'll add the
// filter parameter editing controls to
let controlPanel = new swing.JPanel();
panel.place(controlPanel, 'ax center, ay top, pushy, wrap');

let errorMessage = noteLabel(' ');
errorMessage.foreground = Colour.RED;
panel.place(errorMessage, 'ax center, wrap');

let updateBtn = button('&Apply', null, function() {
    updateFilter();
    updateImage(curFilter);
});
panel.place(updateBtn, 'ax center');

let dialog = panel.createDialog('Image Filter Demo', '', @close, null, false);
let maxW = 0,
    maxH = 0;
for (let f = 0; f < filters.length; ++f) {
    filterBox.selectedIndex = f + 1;
    dialog.pack();
    maxW = Math.max(maxW, dialog.width);
    maxH = Math.max(maxH, dialog.height);
}
dialog.setSize(maxW, maxH);
filterBox.selectedIndex = 0;
dialog.rootPane.defaultButton = updateBtn;
dialog.visible = true;