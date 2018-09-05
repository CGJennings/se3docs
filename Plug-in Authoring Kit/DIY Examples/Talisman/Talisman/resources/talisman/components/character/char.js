/*
     Talisman Character Component
     
     As cards go, character cards are fairly typical although
     there is a fair amount of content to handle. The only
     tricky bit is the way we handle portraits. Instead of
     painting the portrait and then stamping down a template
     image with a portrait-sized hole in it overtop, we
     use shaped portraits that are drawn over a background
     texture. This means a little extra work to make sure the
     right shape is used for the portrait area in the user
     interface.
*/

useLibrary( 'diy' );
useLibrary( 'ui' );
useLibrary( 'imageutils' );

importClass( arkham.diy.ListItem );
importClass( arkham.component.AbstractPortrait );

// When the script is run directly from the editor, this will load
// the test-lib library, which does the setup tasks that the
// plug-in would have done if it was run. This lets us test and
// develop the plug-in without having to rebuild the plug-in bundle
// and start a new copy of Strange Eons every time we make a change.
if( sourcefile == 'Quickscript' ) {
	useLibrary( 'project:DIY Examples/Talisman/Talisman/resources/talisman/test-lib.js' );
}

const Talisman = Eons.namedObjects.Talisman;

var titleBox;
var specialTextBox;
var startBox;

/**
 * create( diy )
 * Called when the component is created so that the basic component
 * properties can be configured (face style, template keys, etc.).
 * Also sets up the initial content for the component (name, comment,
 * and other stats depending on the component type).
 */
function create( diy ) {
	diy.cardVersion = 1;
	diy.extensionName = 'Talisman.seext';
	diy.faceStyle = FaceStyle.CARD_AND_MARKER;
	diy.frontTemplateKey = 'char-front';
	diy.backTemplateKey = 'char-back';
	diy.setTemplateKey( 2, 'char-marker' );

	diy.portraitKey = 'char';
	diy.portraitBackgroundFilled = false;
	diy.portraitScaleUsesMinimum = true;
	diy.portraitClipping = false;
	
	diy.markerBackgroundFilled = false;
	diy.markerClipping = false;

	// install the example character
	diy.name = #tal_char_name;
	$Alignment = 'N';
	$Start = #tal_char_start;
	$SpecialText = #tal_char_ability;
	$Strength = '2';
	$Craft = '4';
	$Life = '4';
	$Fate = '5';
	$Base = 'overgrown';
}

/**
 * onClear()
 * Resets the component to a "blank" state; the name, comment
 * and expansion will already be cleared for you.
 */
function onClear() {
	$Alignment = 'G';
	$Start = '';
	$SpecialText = '';
	$Strength = '3';
	$Craft = '3';
	$Life = '3';
	$Fate = '3';
	$Base = 'none';
}


/**
 * createInterface( diy, editor )
 * Called to set up the user interface. We are passed a copy of the editor
 * that our component will be shown in, but our component hasn't actually been
 * set on it yet.
 */
function createInterface( diy, editor ) {
	var nameField = textField();
	diy.nameField = nameField;

	// The bindings object links the controls in the component
	// to the setting names we have selected for them: when the
	// user changes a control, the setting is updated; when the
	// component is opened, the state of the settings is copied
	// to the controls.
	var bindings = new Bindings( editor, diy );

	// Background panel
	var bkgPanel = new Grid( '', '[min:pref][0:pref,grow,fill][0:pref][0:pref]', '');
	bkgPanel.setTitle( @tal_content );
	bkgPanel.place( @tal_title, '', nameField, 'growx, span, wrap' );

	var alignmentCombo = createAlignmentCombo();
	bindings.add( 'Alignment', alignmentCombo, [0] );
	
	var startCombo = createStartCombo();
	bindings.add( 'Start', startCombo, [0] );
	
	bkgPanel.place( @tal_start, '', startCombo, 'width pref+16lp, growx',   @tal_alignment, 'gap unrel', alignmentCombo, 'width pref+16lp, wrap' );

	// Character base
	var baseCombo = createBaseCombo();
	bkgPanel.place( @tal_char_base, '', baseCombo, 'width pref+16lp, wrap para' );
	bindings.add( 'Base', baseCombo, [0] );

	// Statistics panel
	// Create a grid that will be centered within the panel overall,
	//     and controls in each of the four columns will be centered in the column
	var statsPanel = new Grid( 'center, fillx, insets 0', '[center][center][center][center]' );
	statsPanel.place(
		noteLabel(@tal_strength), 'gap unrel', noteLabel(@tal_craft), 'gap unrel',
				noteLabel(@tal_life), 'gap unrel', noteLabel(@tal_fate), 'gap unrel, wrap 1px'
	);
	// the $Settings to store the stats in
	var statSettings = ['Strength', 'Craft', 'Life', 'Fate' ];	
	// the range of possible values for each stat
	var statItems = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '-'];
	for( let i=0; i<4; ++i ) {
		let combo = comboBox( statItems );
		statsPanel.place( combo, 'growx, width pref+16lp, gap unrel' + (i==3 ? ', wrap' : '') );
		bindings.add( statSettings[i], combo, [0] );
	}
	// add the --- Stats --- divider and panel
	bkgPanel.place( separator(), 'span, split 3, growx', @tal_stats, 'span, split 2', separator(), 'growx, wrap rel' );
	bkgPanel.place( statsPanel, 'span, growx, wrap rel' );
	bkgPanel.place( separator(), 'span, growx, wrap para' );
	
	// Special Abilities
	var specialTextField = textArea( '', 17, 15, true );
	bkgPanel.place( @tal_abilities, 'span, wrap' );
	bkgPanel.place( specialTextField, 'span, gap para, growx, wrap' );
	bindings.add( 'SpecialText', specialTextField, [0] );

	bkgPanel.addToEditor( editor, @tal_content, null, null, 0 );	
	bindings.bind();

	// Set up custom clip stencil for the portrait panels:
	// The portrait clip stencil is what defines the shape
	// of the portrait area in the portrait panel. It is an
	// image the same size as the portrait's clip region,
	// and the opacity (alpha) of its pixels determines where
	// in the clip region the portrait shows through and where
	// it is covered by other content. The default system 
	// assumes that the card template has a hole in it for
	// the portrait, and that you draw the portrait and then
	// draw the template over it. If you do something different
	// then you may need to customize the clip stencil. In this
	// case, we are using the portrait clip stencil to define
	// the ideal size for portraits, but we allow the portrait
	// to escape from this area (i.e. portrait clipping is
	// disabled). In addition, the portraits are transparent
	// so the card background shows through them. To account for
	// this we need to do two things:
	//
	// 1. Change the size of the clip stencil region. By default,
	//    this is the same as the portrait clip region. Since we
	//    don't clip to that region, we need to set the clip stencil
	//    region to the area that we *do* clip to. Otherwise, the
	//    area where the portrait shows through in the portrait panel
	//    will be the wrong size.
	// 2. In the case of the main portrait, we need to use a different
	//    clip stencil. The default clip stencil is created by taking
	//    the portion of the template image that fits within the
	//    portrait clip region (or the custom clip stencil region if
	//    we set one). In our case, the template image does not have
	//    a transparent area where the portrait is, because the portrait
	//    gets drawn overtop of it. Instead, we need to use the
	//    'front overlay' image, which does have a hole for the portrait
	//    and which gets stamped overtop of the portrait so that the
	//    portrait can't cover up certain decorations.
	//
	// There is a function defined in the Talisman named object for
	// customizing a component's portraits, and we call that below.
	// However, the function is a bit hard to follow because it handles
	// multiple cases, so I have also included a straightforward translation
	// for each call just below that line
	//

	// customize the main portrait stencil to use the front overlay and true clip
	Talisman.customizePortraitStencil( diy, ImageUtils.get( $char_front_overlay ), R('portrait-true-clip') );
	/*
	// Equivalent code:
	var stencil = ImageUtils.get( $char_front_overlay );
	var region = R('portrait-true-clip');
	stencil = AbstractPortrait.createStencil( stencil, region );
	diy.setPortraitClipStencil( stencil );
	diy.setPortraitClipStencilRegion( region );
	*/
	
	// customize the marker portrait to use the true clip
	// (see also the paintMarker function, below)
	Talisman.customizePortraitStencil( diy, null, R('marker-true-clip'), true ); 
	
	/*
	// Equivalent code:
	diy.setMarkerClipStencilRegion( R('marker-true-clip') );
	*/
}




/**
 * createFrontPainter( diy, sheet )
 * Called once for each front-side face of the component to give
 * us a chance to prepare and resources that will be needed for
 * painting, such as setting up markup boxes. In this case,
 * the front of the character sheet and the marker.
 */
function createFrontPainter( diy, sheet ) {
	// Since the marker doesn't have any markup boxes or other objects
	// that need access to the sheet they are used on, we don't need to
	// do anything to set up for the marker, so when we're called the
	// second time to set up the marker we just return.
	if( sheet.sheetIndex == 2 ) return;
	
	// Create the markup boxes we'll use to display formatted text:
	
	// the character title (our name field)
	titleBox = Talisman.titleBox( sheet, true, 13 );
	
	// the text of the special ability
	specialTextBox = Talisman.titleBox( sheet, false, 7.5 );	
	specialTextBox.setReplacementForTag(
		'hr', '<image res://talisman/decorations/character-divider.png 1.853333in>'
	);
	specialTextBox.lineTightness = 1.5;
	specialTextBox.alignment = specialTextBox.LAYOUT_TOP|specialTextBox.LAYOUT_LEFT;

	// the starting location and alignment
	startBox = Talisman.bodyBox( sheet );
}

/**
 * paintFront( g, diy, sheet )
 * Called to paint the front-side faces of the component; in this case,
 * the front of the character sheet and the marker. This method
 * paints the front of the character card and delegates painting
 * the marker to paintMarker(), defined below.
 */
function paintFront( g, diy, sheet ) {
	if( sheet.sheetIndex == 2 ) {
		paintMarker( g, sheet );
		return;
	}
	
	sheet.paintTemplateImage( g );
	
	// We turned off automatic clipping because we wanted to
	// make the default size for a new portrait image
	// smaller than the true clipping region, and the
	// default portrait size is always based on the portrait's
	// clip region. Now we are ready to paint the portrait,
	// so we need to install our own (larger) clip region.
	var oldClip = g.getClip();
	g.clip( new Region( $char_portrait_true_clip_region ) );
	paintCharacterBase( g, $Base );
	sheet.paintPortrait( g );
	g.setClip( oldClip );
	
	// Because some of the decorations on the card back intrude
	// into the portrait area, the portrait may draw overtop of
	// them and we don't want it to. So we have another image
	// that looks just like the left half of the card but the
	// background is cut out so only the decorations that go
	// over the portrait are included. We'll draw it now to
	// hide anywhere that the decorations were hidden by the
	// portrait image.
	sheet.paintImage( g, 'char-front-overlay', 0, 0 );

	g.setPaint( Color.BLACK );
	
	// draw the title
	titleBox.markupText = diy.name;
	titleBox.drawAsSingleLine( g, R('title') );
	
	// draw the special ability
	sheet.drawTitle( g, #tal_abilities, R('special-title'), Talisman.titleFont, 10, sheet.ALIGN_CENTER );
	specialTextBox.markupText = $SpecialText;
	specialTextBox.draw( g, R('special-text') );
	
	// draw the start location and alignment
	//   $Alignment will be one of G, N, or E; we'll look up the
	//   localized text using the key tal-align-X
	//   (where X is the value of $Alignment)
	startBox.markupText = sprintf(
			#tal_start_format,
			#tal_start, $Start,
			#tal_alignment, #('tal-align-' + $Alignment)
	);
	startBox.draw( g, R('start') );
	
	// draw the stats around the outside
	paintStat( g, sheet, #tal_strength, $Strength, 'strength', 3 );
	paintStat( g, sheet, #tal_craft, $Craft, 'craft', 3 );
	paintStat( g, sheet, #tal_objects, null, 'objects', 0 );
	paintStat( g, sheet, #tal_followers, null, 'followers', 0 );
	paintStat( g, sheet, #tal_life, $Life, 'life', 1 );
	paintStat( g, sheet, #tal_gold, null, 'gold', 1 );
	paintStat( g, sheet, #tal_fate, $Fate, 'fate', 1 );
	
	// draw the expansion symbol using our custom painting code
	Talisman.paintExpansionSymbol( g, diy, sheet, 'char' );
}



/**
 * paintStat( g, sheet, stat, value, region, turns )
 * Paints text for a character stat in a 'char-' region:
 * stat is the name of the stat (Life, Craft, etc.);
 * value is null for stats like Gold, or the amount to print
 * for stats like Life; turns is the number of anti-clockwise
 * turns to rotate the text.
 */
function paintStat( g, sheet, stat, value, region, turns ) {
	if( value != null ) {
		stat = sprintf( #tal_stat_format, stat, value );
	}
	sheet.drawRotatedTitle( g, stat, R(region), Talisman.titleFont, 7, sheet.ALIGN_CENTER, turns );
}



/**
 * paintCharacterBase( g, internalName )
 * Given the internal name of a character base as stored in the $Base
 * setting, paint the base onto the sheet.
 */
 function paintCharacterBase( g, internalName ) {
 	if( internalName != 'none' ) {
 		const bi = ImageUtils.get( 'talisman/components/character/base-' + internalName + '.jp2' );
 		g.drawImage( bi, 0, 400, null );
 	}
 }



function paintMarker( g, sheet ) {
	// Notice that we set the template key to the overlay image,
	// and we draw it last. This is a clever trick to get the clip
	// stencil (the shape in the portrait panel) to look right
	// without having to explicitly set it: by default the stencil
	// shape is taken from the template image.
	sheet.paintImage( g, 'char-marker-underlay', 0, 0 );
	// This works just like paintPortrait, but it uses the
	// clip region for the marker portrait instead of main portrait.
	sheet.paintMarkerPortrait( g );
	sheet.paintTemplateImage( g );
}





// Since this is a CARD_AND_MARKER type, we have to paint
// the back ourselves even though it is plain:
function createBackPainter( diy, sheet ) {}
function paintBack( g, diy, sheet ) {
	sheet.paintTemplateImage( g );
}






// These can be used to perform special processing during open/save.
// For example, you can seamlessly upgrade from a previous version
// of the script.
function onRead() {}
function onWrite() {}



// These are some helper functions that we call on from the rest of
// the script. Placing them in their own function keeps the main code
// tidier and easier to understand.



/**
 * createAlignmentCombo()
 * Returns a new combo box for selecting an alignment. The setting it
 * is bound to will be set to one of G, N, or E for good, neutral, or evil.
 */
function createAlignmentCombo() {
	var labels = [#tal_align_G, #tal_align_N, #tal_align_E];
	var icons = ['good', 'neutral', 'evil'];
	var values = ['G', 'N', 'E'];
	var items = [];
	
	for( let i=0; i<labels.length; ++i ) {
		icons[i] = ImageUtils.createIcon( ImageUtils.get( 'talisman/icons/' + icons[i] + '.png' ), 18 );
		items[i] = new ListItem( values[i], labels[i], icons[i] );
	}
	
	return comboBox( items );
}


/**
 * createStartCombo()
 * Creates an editable, autocompleting combo box that contains
 * common starting locations while also allowing you to enter any
 * location name.
 */
function createStartCombo() {
	// create a combo containing all game strings of the form tal-start-<n>
	var items = [];
	for( let i=0; ; ++i ) {
		var key = 'tal-start-' + i.toInt();
		if( !Language.getGame().isKeyDefined( key ) ) break;
		items[i] = Language.game.get( key );
	}
	
	return autocompletionField( items, true );
}



/**
 * createBaseCombo()
 * Returns a combo box of all of the different character base types.
 */
function createBaseCombo() {
	// Get the list of bases from $char_bases, put 'none,' at the
	// start and split it up on the commas
	var bases = ('none,' + $char_bases).split( ',' );
	// For each base name, create a list item that displays the
	// localized base name but sets the setting to the internal
	// name ('field', 'path', 'cobbles', etc.).
	var items = [];
	for( let i=0; i<bases.length; ++i ) {
		items[i] = new ListItem( bases[i], @('tal-char-base-' + bases[i]) );
	}

	return comboBox( items );
}



/**
 * Returns a region for this component. The nametag is
 * the middle part of the region name, without the
 * 'char-' prefix or '-region' suffix.
 */
function R( nametag ) {
	var value = $('char-' + nametag + '-region');
	if( value == null ) {
		throw new Error( 'region not defined: ' + nametag );
	}
	return new Region( value );
}



// This will cause a test component to be created when you run the script
// from a script editor. It doesn't do anything when the script is run
// other ways (e.g., when you choose to create the component by selecting
// it in the New Game Component dialog).
testDIYScript( 'TAL' );