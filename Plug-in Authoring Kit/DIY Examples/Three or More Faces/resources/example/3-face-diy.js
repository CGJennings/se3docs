/*
 * 3-face-diy.js
 *
 * An example DIY card that demonstrates the new card + marker
 * option for DIY components. This is a common special case
 * that allows you to create a card for a character with a
 * matching marker or token. (The token is only shown with
 * one side, but an identical back side is created automatically
 * when the component is printed. Investigators for Arkham Horror
 * use this format.)
 *
 ****************************************************************
 * NOTE: This example is much more complex than 4-face-diy.js   *
 * because it includes support for a marker with its own        *
 * portrait settings. You might wish to start with that example *
 * to get the basics, then return here.                         *
 ****************************************************************
 */

useLibrary( 'diy' );
useLibrary( 'ui' );
useLibrary( 'markup' );

importClass( ca.cgjennings.graphics.composites.BlendMode );


function create( diy ) {
	diy.faceStyle = FaceStyle.CARD_AND_MARKER;
	
	// Since this is just an example, we'll set the keys
	// we need directly in the component script. For a
	// complete plug-in for a real game, it would be best
	// to load these value's into the game's master settings
	// file when the plug-in loads.
	$char_front_template = 'example/character-front.jp2';
	$char_back_template = 'example/character-back.jp2';
	$char_marker_template = 'example/token.jp2';
	
	$char_portrait_template = 'example/character-portrait.jp2';
	$char_portrait_clip_region = '7,4,302,391';
	// This acts just like the portrait clip region, but it
	// sets the clip region for drawing the portrait on the marker:
	$char_marker_clip_region = '3,5,144,192';
	
	$char_name_region = '109,303,105,34';
	$char_stats_region = '355,62,195,273';
	
	diy.frontTemplateKey = 'char-front';
	diy.backTemplateKey = 'char-back';
	diy.portraitKey = 'char';
	
	// Beyond the standard front and back templates, we need
	// to set template keys using their index; the index of
	// the front key is 0; of the back key is 1; and of the
	// marker is 2.
	diy.setTemplateKey( 2, 'char-marker' );
	
	// default character attributes
	diy.name = 'John H. Watson';
	$Prowess = '4';
	$Wits = '3';
	$Logic = '2';
	$Etiquette = '3';

	// Prevent unsaved file warnings since this is just a demo:
	diy.markSaved();
}

// This example doesn't create any controls, it just shows how to
// set up the faces; but there is nothing extraordinary to do here
// for more than two faces; just remember to use 2 as the sheet index
// for the token.
function createInterface( diy, editor ) {}

let foreground = new Colour( 0x3a330b );
let nameBox, statsBox;


// When there are more than two faces, the createFrontPainter and
// paintFront functions are called once for each front face;
// these are the faces with even index numbers (0, 2, 4, ...).
// That means that this will be called once to set up painting
// for the front face of the card, and once to set up painting
// for the token.
// The index of the sheet you are creating or painting can be
// looked up from "sheet.sheetIndex".
function createFrontPainter( diy, sheet ) {
	if( sheet.sheetIndex == 0 ) {
		// setup the front face of the card
		nameBox = markupBox( sheet );
		let style = nameBox.defaultStyle;
		style.add(
			FAMILY, FAMILY_BODY,
			SIZE, 12,
			WEIGHT, WEIGHT_BOLD,
			POSTURE, POSTURE_OBLIQUE
		);
		nameBox.alignment = LAYOUT_CENTER | LAYOUT_MIDDLE;
		
		statsBox = markupBox( sheet );
		statsBox.defaultStyle = style;
		statsBox.alignment =  LAYOUT_JUSTIFY | LAYOUT_CENTER | LAYOUT_MIDDLE;
		statsBox.lineTightness = 4;
		statsBox.setDefinitionForTag( 'hello', '@1;' );
	} else {
		// setup the token
		// (we don't need to do any setup in this case, though)
	}
}

// The create and paint functions for the back face work
// analogously to those for the front face when painting
// more than two faces, but since this card type has
// three faces, this will only be called once. Moreover,
// there isn't much to do since this painter just draws
// a static image.
function createBackPainter( diy, sheet ) {
}


// When there are more than two faces, this gets called for each
// front face; these are the faces with even index numbers
// (0, 2, 4, ...). You can find out which one you are painting
// using "sheet.sheetIndex".
function paintFront( g, diy, sheet ) {
	// Check if we are painting the marker, and if so do that in
	// its own separate function.
	if( sheet.sheetIndex == 2 ) {
		paintMarker( g, diy, sheet );
		return;
	}
	
	// It isn't the marker, so it must be the front face of the
	// card: draw its content.
	sheet.paintPortrait( g );
	sheet.paintTemplateImage( g );

	g.setPaint( foreground );
	g.setComposite( BlendMode.LinearBurn );
	nameBox.markupText = diy.fullName;
	nameBox.draw( g, new Region( $char_name_region ) );
	
	statsBox.markupText =
		  'Prowess ......... '    + $Prowess +
		'\nWits ............... ' + $Wits +
		'\nLogic .............. ' + $Logic +
		'\nEtiquette ........ '   + $Etiquette
	;
	statsBox.draw( g, new Region( $char_stats_region ) );
}

function paintBack( g, diy, sheet ) {
	sheet.paintTemplateImage( g );
}

// Our own function for drawing the marker face; we call this
// from paintFront when the sheet index tells us the marker is
// being painted.
function paintMarker( g, diy, sheet ) {
	// This works just like paintPortrait, but it uses the
	// clip region for the marker portrait instead of main portrait.
	sheet.paintMarkerPortrait( g );
	sheet.paintTemplateImage( g );
}

function onClear() {}
function onRead( diy, ois ) {}
function onWrite( diy, oos ) {}

testDIYScript();