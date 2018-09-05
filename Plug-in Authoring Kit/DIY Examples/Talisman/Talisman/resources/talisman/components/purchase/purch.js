/*
     Talisman Purchase Card Component
     
     Talisman cards with portraits have the interesting fetaure that they
     come in two different layouts: one for a short amount of text that shows
     more of the illustration, and one for longer texts. To recreate this
     the script will measure the height of the card text before rendering and
     then choose one of two different template images.
*/

useLibrary( 'ui' );
useLibrary( 'diy' );
useLibrary( 'markup' );
useLibrary( 'imageutils' );

importClass( arkham.diy.ListItem );

// When the script is run directly from the editor, this will load
// the test-lib library, which does the setup tasks that the
// plug-in would have done if it was run. This lets us test and
// develop the plug-in without having to rebuild the plug-in bundle
// and start a new copy of Strange Eons every time we make a change.
if( sourcefile == 'Quickscript' ) {
	useLibrary( 'project:DIY Examples/Talisman/Talisman/resources/talisman/test-lib.js' );
}

const Talisman = Eons.namedObjects.Talisman;

var titleBox, typeBox, specialTextMeasurer, specialTextBox;

/**
 * create( diy )
 * Called when the component is created so that the basic component
 * properties can be configured (face style, template keys, etc.).
 * Also sets up the initial content for the component (name, comment,
 * and other stats depending on the component type).
 */
function create( diy ) {
	diy.version = 1;
	diy.extensionName = 'Talisman.seext';
	diy.faceStyle = FaceStyle.PLAIN_BACK;
	diy.frontTemplateKey = 'purch-front';
	diy.backTemplateKey = 'purch-back';
	diy.portraitKey = 'purch';

	diy.name = #tal_purch_name;
	$Type = 'O';
	$SpecialText = #tal_purch_special;
	$EncounterNumber = '5';
}

/**
 * onClear()
 * Resets the component to a "blank" state; the name, comment
 * and expansion will already be cleared for you.
 */
function onClear( diy ) {
    $Type = 'O';
    $SpecialText = '';
    $EncounterNumber = '5';
}

/**
 * createInterface( diy, editor )
 * Called to set up the user interface. We are passed a copy of the editor
 * that our component will be shown in, but our component hasn't actually been
 * set on it yet.
 */
function createInterface( diy, editor ) {
	var panel = new Grid( '', '[][grow,fill]' );
	var bindings = new Bindings( editor, diy );

	var nameField = textField();
	diy.setNameField( nameField );
	
	var typeCombo = createTypeCombo();
	var numberCombo = comboBox( [ ' ', '1', '2', '3', '4', '5', '6', '7', '8', '9' ] );
	var specialTextArea = textArea( '', 10, 15, true );
	
	panel.place(
		@tal_title, '', nameField, 'growx, wrap',
		@tal_type, '', typeCombo, 'width pref+20lp, wrap para',
		@tal_effects, 'span, wrap',
		specialTextArea, 'span, gap para, growx, wrap para',
		'', 'span, split 3, growx', @tal_enc_num, '', numberCombo, 'gap i, width pref+20lp'
	);
	panel.setTitle( @tal_content );
	
	bindings.add( 'Type', typeCombo, [0] );
	bindings.add( 'SpecialText', specialTextArea, [0] );
	bindings.add( 'EncounterNumber', numberCombo, [0] );
	
	panel.addToEditor( editor, 'Content', null, null, 0 );	
	bindings.bind();
}

function createFrontPainter( diy, sheet ) {
	// the component's private Settings (the same thing we
	// are accessing with $Notation)
	var s = diy.settings;
	
	titleBox = Talisman.titleBox( sheet, true, 9 );
	typeBox = Talisman.titleBox( sheet, false, 6 );	

	// Create a text box for the main text. We will set it
	// up to flow around the encounter number using a PageShape.
	specialTextBox = Talisman.bodyBox( sheet );	

    // A PageShape adjusts the margins of the box depending on how
    // far down the box you are. They can be used to
    // flow text in complex ways (see the page shape demo for
    // examples), but in many cases all we need is something like
    // this, called the cup shape:
    //        _____
    //    D  |     |  D     Take a notch or  notches out of one
    //   ____|     |____    end of the box to flow around an
    //  |               |   expansions symbol or other decoration (D)
    //
    // You can create a cup shape using new PageShape.CupShape(...), 
    // but it is so commonly used that there is special support for
    // creating one right from a setting. The setting should end in
    // -shape and include 5 numbers: the left and right inset above
    // the split point, the split point, and the left and right inset
    // after the split point. Note that the split point is an absolute
    // y-coordinate (it is the actual row on the template, rather than
    // relative to the top of the markup box).
    specialTextBox.pageShape = s.getCupShape( 'generic-text' );
    // the above is equivalent to the following (but it gets the vlues
    // from the card settings):
    // new PageShape.CupShape(
	//         0,  0, // use the normal margin in the top part
	//         316,   // starting at Y = 316...
	//         28, 28 // ...inset both margins by 28px		
    // );
    
    updateClipStencil( diy, true );
}

// This keeps track of whether the portrait clip stencil is currently
// the stencil for the long or short version of the card. Creating
// a stencil is expensive, so we only want to do it when we have to.
// The stencil changes when a change in the text length causes us
// to switch templates, which we only find out about when we're painting
// the card face.
function updateClipStencil( diy, useLongFormat ) {
	if( this.currentlyLong === undefined || this.currentlyLong != useLongFormat ) {
		var clipRegionKey = useLongFormat ? 'long-portrait-clip' : 'portrait-clip';
		var stencilKey = diy.portraitKey + (useLongFormat ? '-long' : '') + '-front-template';
		var stencil = ImageUtils.get( $(stencilKey) );
		Talisman.customizePortraitStencil( diy, stencil, R(clipRegionKey, true) );
		this.currentlyLong = useLongFormat;
	}
}

function paintFront( g, diy, sheet ) {
	var settings = diy.settings;

	g.setPaint( Color.BLACK );

	// Set the text for the card's type, but don't draw it yet:
	// the location depends on whether we are using the long card format
	typeBox.markupText = #('tal-type-' + $Type);

	// See if the text is longer than the text region on the
	// short version of the card, and set isLong accordingly.
	specialTextBox.markupText = $SpecialText;
	var textRegion = R('text', true);
	var isLong = specialTextBox.measure( g, R('measure', true) ) > textRegion.height;

	updateClipStencil( diy, isLong );
	
	if( isLong ) {
		textRegion = R('long-text', true);
		$purch_portrait_clip_region = $generic_long_portrait_clip_region;
		sheet.paintPortrait( g );
		sheet.paintImage( g, 'purch-long-front-template', 0, 0 );
		typeBox.drawAsSingleLine( g, R('long-type', true) );
		Talisman.paintExpansionSymbol( g, diy, sheet, 'purch-long' );
	} else {
		$purch_portrait_clip_region = $generic_portrait_clip_region;
		sheet.paintPortrait( g );
		sheet.paintTemplateImage( g );
		typeBox.drawAsSingleLine( g, R('type', true) );
		Talisman.paintExpansionSymbol( g, diy, sheet, 'purch' );
	}
	specialTextBox.draw( g, textRegion );

	titleBox.markupText = diy.name;
	titleBox.drawAsSingleLine( g, R('title', true) );

	g.setPaint( Color.WHITE );
	sheet.drawTitle( g, $EncounterNumber, R('encounter-number', true), Talisman.encounterNumberFont, 9, sheet.ALIGN_CENTER );
}

// This is a PLAIN_BACK card, so these are
// never called:
function createBackPainter( diy, sheet ) {}
function paintBack( g, c, s ) {}

// These can be used to perform special processing during open/save.
// For example, you can seamlessly upgrade from a previous version
// of the component script.
function onRead( diy, ois ) {}
function onWrite() {}



// These are some helper functions that we call on from the rest of
// the script. Placing them in their own function keeps the main code
// tidier and easier to understand.




/**
 * createTypeCombo()
 * Returns a combo box of all of the different purchase card types.
 */
function createTypeCombo() {
	var types = ['O', 'M', 'F'];
	var items = [];
	for( let i=0; i<types.length; ++i ) {
		items[i] = new ListItem( types[i], #('tal-type-' + types[i]) );
	}

	return comboBox( items );
}

/**
 * Returns a region for this component. The nametag is
 * the middle part of the region name, without the
 * 'purch-' prefix or '-region' suffix.
 *
 * If the generic flag is true, then a generic region
 * will be looked up instead of a purchase region.
 */
function R( nametag, generic ) {
	var value;
	if( generic ) {
		value = $('generic-' + nametag + '-region');
	} else {
		value = $('purch-' + nametag + '-region');
	}
	if( value == null ) {
		throw new Error( 'region not defined: ' + nametag );
	}
	return new Region( value );
}

// This will cause a test component to be created when you run the script
// from a script editor. It doesn't do anything when the script is run
// other ways (e.g., when you choose to create the component by selecting
// it in the New Game Component dialog).
testDIYScript( Talisman.GAME_CODE );
