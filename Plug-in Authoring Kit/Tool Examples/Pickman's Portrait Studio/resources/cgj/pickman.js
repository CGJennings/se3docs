//
// pickman.js - version 4
//
// A plug-in that converts photorealistic images
// into images that simulate a painted look.
// Can be used to create portrait images from photos.
//

useLibrary('ui');
useLibrary('imageutils');
useLibrary('res://cgj/portrait-lib.js');
useLibrary('res://cgj/painter-lib.js');

importClass(java.awt.BorderLayout);
importClass(java.awt.Cursor);
importClass(java.io.File);
importClass(ca.cgjennings.ui.dnd.FileDrop);
importClass(arkham.dialog.ErrorDialog);
importClass(javax.swing.JPopupMenu);
importClass(javax.swing.JMenuItem);

// Stores the dialog window, which is lazily created the first time
// that the plug-in is activated.
let dialog;
// Tab component that previews the original image.
let photoViewer;
// Tab component that previews the painted image.
let paintingViewer;

// Stores the original and painted version of the image.
let source, dest;
// Tracks the game component, if any, that the source image came from.
let portraitIsFrom;


/*
 * Plug-in Implementation
 */

function getName() {
    return 'Pickman\'s Portrait Studio';
}

function getDescription() {
    return 'Turns photographs into painting-like portraits';
}

function getVersion() {
    return 4.0;
}

function run() {
    if (dialog == null) {
        dialog = createDialog();
    }

    enablePortraitButtons(Portraits.listSettablePortraits().length > 0);

    Settings.user.applyWindowSettings('pickmans-studio', dialog);
    dialog.visible = true;
    Settings.user.storeWindowSettings('pickmans-studio', dialog);

    // forget where portrait came from so card can be GC'd
    if (portraitIsFrom != null) {
        portraitIsFrom = null;
        updateImage(null);
    }
}







function createDialog() {
    let d = new swing.JDialog(Eons.window, 'Pickman\'s Portrait Studio', true);
    let previewSize = new java.awt.Dimension(600, 400);
    photoViewer = new arkham.ImageViewer();
    photoViewer.setPreferredSize(previewSize);
    paintingViewer = new arkham.ImageViewer();
    paintingViewer.setPreferredSize(previewSize);

    let imageTab = new swing.JTabbedPane();
    imageTab.addTab('Modified', paintingViewer);
    imageTab.addTab('Original', photoViewer);
    imageTab.setBorder(swing.BorderFactory.createMatteBorder(0, 2, 0, 0, Color.BLACK));

    d.setLayout(new BorderLayout());
    d.add(imageTab, BorderLayout.CENTER);

    // create a listener that executes handlerFunction,
    // then updates the painting if the source slider
    // has been released by the user
    function listener(handlerFunction) {
        let li = function listener(event) {
            try {
                handlerFunction();
                if (event == null || !event.source.model.valueIsAdjusting) {
                    updatePainting();
                }
            } catch (ex) {
                Error.handleUncaught(ex);
            }
        };
        return li;
    }

    let changeHue = listener(function changeHueLi() {
        Painter.hueShift = hueSlider.value / 1000 - 0.5;
    });
    let changeSatBoost = listener(function changeSatBoostLi() {
        Painter.satBoost = satSlider.value / 500;
    });
    let changeBriAdjust = listener(function changeBriAdjustLi() {
        Painter.briAdjust = briSlider.value / 1000;
    });
    let changeConAdjust = listener(function changeConAdjustLi() {
        Painter.conAdjust = conSlider.value / 1000;
    });
    let changeSmear = listener(function changeSmearLi() {
        Painter.radius = smearSlider.value;
    });
    let changeLevels = listener(function changeLevelsLi() {
        Painter.levels = 1 << levelsSlider.value;
    });
    let changeSensitivity = listener(function changeSensitivityLi() {
        Painter.insensitivity = 3 - sensitivitySlider.value;
    });
    let changeStrength = listener(function changeStrengthLi() {
        Painter.strength = strengthSlider.value;
    });
    let changeBlend = listener(function changeBlendLi() {
        Painter.blending = blendSlider.value;
    });

    function changeMode() {
        try {
            let sel = modeCombo.selectedIndex;
            if (sel < 0) return;
            if (sel == 0) {
                Painter.composite = java.awt.AlphaComposite.SrcOver;
            } else {
                Painter.composite = BlendMode[modeCombo.selectedItem.toString().replace(' ', '')];
            }
            updatePainting();
        } catch (ex) {
            Error.handleUncaught(ex);
        }
    }




    let colourPanel = new Grid('', '[][grow,fill][fill]', '');

    let hueSlider = slider(
        0, 1000, 500 + 125,
        [0, '-180\u00b0', 250, '-90\u00b0', 500, '0\u00b0', 750, '+90\u00b0', 1000, '+180\u00b0'],
        changeHue
    );
    hueSlider.majorTickSpacing = 500;
    hueSlider.minorTickSpacing = 50;
    hueSlider.paintTicks = true;
    let hueSpinner = createLinkedSpinner(hueSlider, function(v)(v-500) * 360 / 1000, function(v)(v * 1000 / 360) + 500);

    let satSlider = slider(
        0, 1000, 0.55 * 500 + 500,
        [0, '0%', 500, '100%', 1000, '200%'],
        changeSatBoost
    );
    satSlider.majorTickSpacing = 500;
    satSlider.minorTickSpacing = 50;
    satSlider.paintTicks = true;
    let satSpinner = createLinkedSpinner(satSlider, function(v) v / 5, function(v) v * 5);

    let briSlider = slider(
        -1000, 1000, 0,
        [-1000, '-100%', 0, '0%', 1000, '100%'],
        changeBriAdjust
    );
    briSlider.majorTickSpacing = 1000;
    briSlider.minorTickSpacing = 100;
    briSlider.paintTicks = true;
    let briSpinner = createLinkedSpinner(briSlider);

    let conSlider = slider(
        -1000, 1000, 0,
        [-1000, '-100%', 0, '0%', 1000, '100%'],
        changeConAdjust
    );
    conSlider.majorTickSpacing = 1000;
    conSlider.minorTickSpacing = 100;
    conSlider.paintTicks = true;
    let conSpinner = createLinkedSpinner(conSlider);

    colourPanel.place(
        'Colour', '', hueSlider, '', hueSpinner, 'wrap',
        'Saturation', '', satSlider, '', satSpinner, 'wrap',
        'Brightness', '', briSlider, '', briSpinner, 'wrap',
        'Contrast', '', conSlider, '', conSpinner, 'wrap'
    );



    let extendPanel = new Grid('', '[][grow,fill][fill]', '');

    let changeTop = listener(function changeLi() {
        Painter.topExtend = topSlider.value / 1000;
    });
    let changeRight = listener(function changeLi() {
        Painter.rightExtend = rightSlider.value / 1000;
    });
    let changeBottom = listener(function changeLi() {
        Painter.bottomExtend = bottomSlider.value / 1000;
    });
    let changeLeft = listener(function changeLi() {
        Painter.leftExtend = leftSlider.value / 1000;
    });

    function extendSlider(li) {
        let s = slider(0, 1000, 0, [0, "0%", 1000, "100%"], li);
        s.majorTickSpacing = 100;
        s.paintTicks = true;
        let linkedSpinner = createLinkedSpinner(s);
        return [s, linkedSpinner];
    }

    let [topSlider, topSpinner] = extendSlider(changeTop);
    let [rightSlider, rightSpinner] = extendSlider(changeRight);
    let [bottomSlider, bottomSpinner] = extendSlider(changeBottom);
    let [leftSlider, leftSpinner] = extendSlider(changeLeft);
    extendPanel.place(
        'Top', '', topSlider, '', topSpinner, 'wrap',
        'Bottom', '', bottomSlider, '', bottomSpinner, 'wrap',
        'Left', '', leftSlider, '', leftSpinner, 'wrap',
        'Right', '', rightSlider, '', rightSpinner, 'wrap'
    );




    let paintPanel = new TypeGrid();

    let paintCheck = checkBox(
        'Add painting effect', true,
        function paintCheckLi() {
            Painter.applyPaintEffect = paintCheck.selected;
            ca.cgjennings.ui.JUtilities.enableTree(paintSettingPanel, paintCheck.selected);
            updatePainting();
        }
    );

    let paintSettingPanel = new TypeGrid();

    let smearSlider = slider(1, 8, 5, null, changeSmear);
    smearSlider.majorTickSpacing = 1;
    smearSlider.paintTicks = true;
    smearSlider.snapToTicks = true;
    smearSlider.paintLabels = true;
    let levelsSlider = slider(
        1, 8, 5,
        [1, '2', 2, '4', 3, '8', 4, '16', 5, '32', 6, '64', 7, '128', 8, '256'],
        changeLevels
    );
    levelsSlider.paintTicks = true;
    levelsSlider.majorTickSpacing = 1;
    levelsSlider.snapToTicks = true;

    paintSettingPanel.place(
        'Smear', '', smearSlider, 'tab hfill',
        'Levels', 'br', levelsSlider, 'tab hfill'
    );
    paintSettingPanel = paintSettingPanel.realize();

    paintPanel.place(
        paintCheck, '',
        paintSettingPanel, 'br hfill'
    );




    let sketchPanel = new TypeGrid();

    let sketchCheck = checkBox(
        'Add sketch effect', true,
        function sketchCheckLi() {
            Painter.applySketchEffect = sketchCheck.selected;
            ca.cgjennings.ui.JUtilities.enableTree(sketchSettingPanel, sketchCheck.selected);
            updatePainting();
        }
    );
    let sensitivitySlider = slider(0, 3, 0, [0, 'Low', 3, 'High'], changeSensitivity);
    sensitivitySlider.paintTicks = true;
    sensitivitySlider.majorTickSpacing = 1;
    sensitivitySlider.snapToTicks = true;
    let strengthSlider = slider(0, 4, 4, [0, 'Low', 4, 'High'], changeStrength);
    strengthSlider.paintTicks = true;
    strengthSlider.majorTickSpacing = 1;
    strengthSlider.snapToTicks = true;

    // these sliders are placed on their own subpanel so we can enable/disable
    // them as a single unit when sketchCheck changes
    let sketchSettingPanel = new TypeGrid();
    sketchSettingPanel.place(
        'Sensitivity', '', sensitivitySlider, 'tab hfill',
        'Strength', 'br', strengthSlider, 'tab hfill'
    );
    // convert to real component so we can enable/disable the children
    sketchSettingPanel = sketchSettingPanel.realize();

    sketchPanel.place(
        sketchCheck, '',
        sketchSettingPanel, 'br hfill'
    );
    sketchPanel = sketchPanel.realize();




    let resetPanel = new Row();
    let reset = button('Reset All', null, function resetLi() {
        // prevent repainting every time an individual value is reset
        let auto = updatePainting.auto;
        updatePainting.auto = false;

        hueSlider.value = 500;
        satSlider.value = 500;
        briSlider.value = 0;
        conSlider.value = 0;

        topSlider.value = 0;
        rightSlider.value = 0;
        bottomSlider.value = 0;
        leftSlider.value = 0;

        paintCheck.selected = false;
        Painter.applyPaintEffect = false;
        smearSlider.value = 5;
        levelsSlider.value = 5;
        ca.cgjennings.ui.JUtilities.enableTree(paintSettingPanel, false);

        sketchCheck.selected = false;
        Painter.applySketchEffect = false;
        sensitivitySlider.value = 0;
        strengthSlider.value = 4;
        ca.cgjennings.ui.JUtilities.enableTree(sketchSettingPanel, false);

        updatePainting.auto = auto;
        updatePainting(true);
    });
    resetPanel.add(reset);
    resetPanel.setAlignment(1);

    let outputPanel = new Row();
    let openBtn = button('&Open...', null, openImageFile);
    let getBtn = button('&Get from Component', null, getPortrait);
    let setBtn = button('&Apply to Component', null, setPortrait);
    let saveBtn = button('&Save As...', null, saveImageFile);
    outputPanel.add(openBtn, getBtn, setBtn, saveBtn);
    outputPanel.setAlignment(1);

    let repaintPanel = new Row();
    let nowBtn = button('Update Now', null, function nowBtnLi() {
        updatePainting(true);
    });
    let autoCheck = checkBox('Update automatically', true, function autoCheckLi() {
        updatePainting.auto = !updatePainting.auto;
        updatePainting();
    });
    repaintPanel.add(autoCheck, nowBtn);
    repaintPanel.setAlignment(1);
    repaintPanel = repaintPanel.realize();
    repaintPanel.setBorder(swing.BorderFactory.createEmptyBorder(4, 4, 4, 4));

    enablePortraitButtons = function enablePortraitButtons(enable) {
        getBtn.enabled = enable;
        setBtn.enabled = enable;
    };

    let adjustmentTab = new swing.JTabbedPane();
    adjustmentTab.addTab('Recolour', colourPanel.realize());
    adjustmentTab.addTab('Extend', extendPanel.realize());
    adjustmentTab.addTab('Painting', paintPanel.realize());
    adjustmentTab.addTab('Sketch Lines', sketchPanel); // already realized

    resetPanel = resetPanel.realize();
    resetPanel.setBorder(swing.BorderFactory.createEmptyBorder(24, 8, 16, 8));

    let controlStack = new Stack(
        adjustmentTab,
        resetPanel,
        separator(),
        noteLabel(' To start, drag and drop an image file ' +
            'or get it from the current component. '),
        repaintPanel, noteLabel(' ')
    );
    controlStack = controlStack.realize();




    // embed the controls in the north side of another panel;
    // this keeps the controls at the bottom of the window when
    // the dialog is resized
    let controlPanel = new swing.JPanel();
    controlPanel.setLayout(new BorderLayout());
    controlPanel.add(controlStack, BorderLayout.NORTH);

    outputPanel = outputPanel.realize();
    outputPanel.setBorder(swing.BorderFactory.createEmptyBorder(4, 4, 4, 4));
    controlPanel.add(outputPanel, BorderLayout.SOUTH);

    d.add(controlPanel, BorderLayout.WEST);

    // add drag and drop support
    new FileDrop(d.contentPane, null, true, function filesDropped(files) {
        try {
            if (files != null && files.length > 0) {
                loadImageFile(files[0]);
            }
        } catch (ex) {
            Error.handleUncaught(ex);
        }
    });

    // use the standard image for the plug-in
    // as an icon for the dialog
    d.setIconImage(ImageUtils.get('cgj/pickman.png', true));

    d.pack();
    d.setLocationRelativeTo(Editor == null ? Eons.window : Editor);
    dialog = d;

    // install the example image
    source = ImageUtils.get('cgj/pickman-sample.jp2', false);
    photoViewer.setImage(source);

    java.awt.EventQueue.invokeLater(function initExample() {
        updateImage(source);
    });

    return d;
}

// createDialog() stores a function here that can be used to enable/disable
// the controls that require a game component with a valid portrait.
let enablePortraitButtons;



/**
 * Changes the source image the specified image.
 */
function updateImage(im) {
    waitCursor(true);
    try {
        if (im != null) {
            // resize very large images to reduce processing time
            // and keep outline effects to a reasonable size
            let MAX = 5 * 300; // 5" x 300 dpi
            if (im.width > MAX || im.height > MAX) {
                im = ImageUtils.fit(im, MAX, MAX);
            }
            photoViewer.image = im;
            paintingViewer.image = im;
            source = im;
            updatePainting();
        } else {
            photoViewer.image = null;
            paintingViewer.image = null;
        }
    } finally {
        waitCursor(false);
    }
}


/**
 * Redraws the painted image. This is called whenever one of the
 * painting controls is changes. If 'force' is true, the painting
 * is definitely updated. Otherwise, it is only updated if
 * updatePainting.auto is true (which it is when the redraw box
 * is checked).
 */
function updatePainting(force) {
    if (!(updatePainting.auto || force)) return;
    waitCursor(true);
    try {
        if (source == null) return;
        dest = Painter.paint(source);
        paintingViewer.image = dest;
    } catch (ex) {
        Error.handleUncaught(ex);
    } finally {
        waitCursor(false);
    }
}
updatePainting.auto = true;


/**
 * Load source image from a user-selected file.
 */
function openImageFile(event) {
    try {
        let f = resources.ResourceKit.showImageFileDialog(event.source);
        if (f != null) {
            loadImageFile(f);
        }
    } catch (ex) {
        Error.handleUncaught(ex);
    }
}


/**
 * Save current painted image to a user-selected file.
 */
function saveImageFile(event) {
    try {
        if (dest == null) {
            errorBeep();
        }
        ImageUtils.save(dest);
    } catch (ex) {
        Error.handleUncaught(ex);
    }
}

/**
 * Use an image from a file as the source for painting.
 * This is called from openImageFile and from the file drop handler.
 */
function loadImageFile(f) {
    try {
        let im = ImageUtils.read(f);
        if (im == null) {
            ErrorDialog.displayError('Not a supported image format', null);
        } else {
            updateImage(im);
        }
        portraitIsFrom = null;
    } catch (ioEx) {
        ErrorDialog.displayError('Unable to read file', ioEx);
    }
}

/**
 * getPortrait( event )
 * Event listener that handles the Get from Component button.
 * This and setPortrait() work similarly. They check if the
 * current component has settable portraits, and if so makes
 * a list of them. If there is only one, the get or set happens
 * immediately. Otherwise, a menu of the images is created and
 * shown as a popup on the button.
 */
function getPortrait(event) {
    function apply(index) {
        let gc = Portraits.getProvider();
        source = Portraits.getPortrait(gc, index);
        portraitIsFrom = gc;
        updateImage(source);
    }

    let list = Portraits.listSettablePortraits();
    if (list.length == 1) {
        apply(list[0]);
    } else {
        showPortraitMenu(event.source, list, apply);
    }
}

/**
 * setPortrait( event )
 * Event listener that handles the Apply to Component button.
 */
function setPortrait(event) {
    function apply(index) {
        Portraits.setPortrait(Editor, index, dest, portraitIsFrom == Component);
    }

    let list = Portraits.listSettablePortraits();
    if (list.length == 1) {
        apply(list[0]);
    } else {
        showPortraitMenu(event.source, list, apply);
    }
}

/**
 * showPortraitMenu( parent, list, apply )
 * Builds and displays a popup menu on the button 'parent'. The 'list'
 * is an array of Portrait instances from a game component. The 'apply'
 * argument is a function that takes the index of one of the elements
 * in the list array and does whatever action should be performed when
 * the menu item for that list element is selected (getting/setting
 * the relevant portrait image).
 */
function showPortraitMenu(parent, list, apply) {
    function makeListener(index) {
        return function() {
            apply(index);
        };
    }

    let menu = new JPopupMenu();
    for (let i = 0; i < list.length; ++i) {
        let image = Portraits.getPortrait(Portraits.getProvider(), list[i]);
        image = ImageUtils.createIcon(image, 48);
        let item = new JMenuItem(image);
        item.addActionListener(makeListener(list[i]));
        menu.add(item);
    }
    let parentSize = parent.getSize();
    let menuSize = menu.getPreferredSize();
    let insets = parent.getInsets();
    menu.show(parent, parentSize.width - menuSize.width - insets.right, insets.top - menuSize.height);
}

/**
 * createLinkedSpinner( slider, toSpinner, toSlider )
 * Creates a spinner control that is bound to the value of a slider.
 * 'toSpinner' and 'toSlider' are functions that convert values from the
 * slider number range to the spinner number range and vice-versa.
 */
function createLinkedSpinner(slider, toSpinner, toSlider) {
    if (toSpinner === undefined) {
        toSpinner = function(v) v / 10;
        toSlider = function(v) v * 10;
    }

    let min = slider.minimum;
    let max = slider.maximum;
    let val = slider.value;

    let updating = 0;

    function spinnerChanged(event) {
        if (updating == 0) {
            ++updating;
            slider.setValue(toSlider(sp.getValue()));
            --updating;
        }
    }

    function sliderChanged(event) {
        if (updating == 0) {
            ++updating;
            sp.setValue(java.lang.Double.valueOf(toSpinner(slider.getValue())));
            --updating;
        }
    }

    let sp = spinner(toSpinner(min), toSpinner(max), 1, toSpinner(val), spinnerChanged);
    sp.setBorder(swing.BorderFactory.createEmptyBorder(0, 0, 16, 0));
    slider.addChangeListener(sliderChanged);
    return sp;
}



/*
 * Provide platform-specific error feedback (typically by playing an error sound).
 */
function errorBeep() {
    swing.UIManager.lookAndFeel.provideErrorFeedback(dialog);
}

/*
 * Show or hide a wait cursor over the dialog.
 */
function waitCursor(enable) {
    if (dialog) {
        if (enable) {
            ca.cgjennings.ui.JUtilities.showWaitCursor(dialog);
        } else {
            ca.cgjennings.ui.JUtilities.hideWaitCursor(dialog);
        }
    }
}

if (sourcefile == 'Quickscript') {
    run();
}