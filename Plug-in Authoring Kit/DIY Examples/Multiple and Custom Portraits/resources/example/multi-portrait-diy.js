/*
 * multi-portrait.js
 *
 * An example DIY card that demonstrates custom portrait
 * features, including multiple portraits, rotatable portraits,
 * controlling where the portrait control appears in the interface
 * (i.e. which tab, and what other controls appear with it).
 */

useLibrary( 'diy' );
useLibrary( 'ui' );
useLibrary( 'markup' );
useLibrary( 'imageutils' );

// This class provides a default implementation of the Portrait interface
// that does all of the hard work for us.
importClass( arkham.component.DefaultPortrait );

// DefaultPortraits are very similar to the basic DIY portrait
// system, using the same patterns of settings keys.

// This array will store our portraits:
var portraits = [];

// When you set the custom portrait option in your DIY, you
// must implement the following two functions in your script:

// Returns the number of portraits we will be using.
function getPortraitCount() {
	return portraits.length;
}

// Given an index from 0 to getPortraitCount()-1, this
// function must return the (index+1)th Portrait.
function getPortrait( index ) {
	if( index < 0 || index >= portraits.length ) {
		throw new Error( 'invalid portrait index: ' + index );
	}
	return portraits[ index ];
}




function create( diy ) {
	diy.faceStyle = FaceStyle.ONE_FACE;
	diy.name = 'Multiple Portraits';

	// The magic line that causes the component's portraits to be
	// obtained from our getPortraitCount and getPortrait function
	// instead of using the simple system built into DIYs:	
	diy.customPortraitHandling = true;

	// NOTE: a portrait is a complex object that can't easily be represented
	// as a string, so we don't store it as a private setting on the component.
	// Instead, we store it in a standard script variable, but script variables
	// (unlike private settings) are not automatically saved for us. This
	// means that we need to add our own code to load and save the portrait
	// objects (see onRead/onWrite below).

	// The DefaultPortrait constructor is passed a reference to the DIY object
	// and a setting key prefix that is used in essentially the same way as
	// DIY.portraitKey (except that it applies only to this particular portrait).
	$top_portrait_template = 'portraits/misc-portrait.jp2';
	$top_portrait_clip_region = '75,16,96,96';
	portraits[0] = new DefaultPortrait( diy, 'top' );
	// This tells the portrait which faces of the component need to be repainted
	// when the portrait is modified (that is, which faces the portrait will appear
	// on). If you don't set this, every face will be marked for repainting.
	// You set it the same way as when creating a binding, e.g., [0,1] to indicate
	// that both the front and back should be repainted.
	portraits[0].facesToUpdate = [0];
	// For this portrait, we'll turn off clipping and painting the background.
	// Basically, any option that you could set on a DIY component that starts
	// with "portrait" is available from DefaultPortrait.
	portraits[0].backgroundFilled = false;
	portraits[0].clipping = false;
	// If we don't call this we'll start with a blank image instead of the
	// default set with the above key. Generally, installDefault() should
	// always be your last setup step for a DefaultPortrait.
	portraits[0].installDefault();

	$bottom_portrait_template = 'portraits/marker-portrait.jp2';
	$bottom_portrait_clip_region = '75,264,96,96';
	// By passing true as the third parameter, we'll get a portrait with
	// the option to set a rotation angle.
	// The setting key <key prefix>-portrait-rotation sets the default angle
	// (in degrees, positive angles rotate anticlockwise).
	$bottom_portrait_rotation = '0';
	portraits[1] = new DefaultPortrait( diy, 'bottom', true );
	portraits[1].facesToUpdate = [0];
	portraits[1].scaleUsesMinimum = true;
	portraits[1].installDefault();
}

function createInterface( diy, editor ) {
	var stack = new Stack();

	// For this demo we don't need to create a Bindings object
	// because DefaultPortrait takes care of updating the faces.
	
	// portraitPanel creates the control panel used to adjust a portrait.
	// We pass it the component that we are creating a panel for and the
	// index of the portrait. It will use our getPortrait function
	// to get the Portrait object with that index, and then create a panel
	// suited to to the portrait.
	var topPanel = portraitPanel( diy, 0 );
	// This sets the title displayed around the border of the panel:
	topPanel.panelTitle = 'Top';
	var bottomPanel = portraitPanel( diy, 1 );
	bottomPanel.panelTitle = 'Bottom';

	// Because we are creating our own portrait panel controls, we add them
	// to a layout container and then add the container to the editor just
	// like we would with any other controls. That means that we can
	// mix-and-match the portrait panel with any other controls we like, and
	// give that tab a custom name, too:
	stack.add( topPanel, bottomPanel );
	stack.addToEditor( editor, 'Custom Portraits' );
}





function createFrontPainter( diy, sheet ) {}
function createBackPainter( diy, sheet ) {}





function paintFront( g, diy, sheet ) {
	// Prevent unsaved file warnings since this is just a demo:
	diy.markSaved();

	sheet.paintTemplateImage( g );

	// Paint all of the portraits; this code
	// uses a loop, though in practice since
	// there are only two portraits in this
	// demo it would be just as easy to write
	//    portraits[0].paint( g, target );
	//    portraits[1].paint( g, target );
	var target = sheet.getRenderTarget();
	for( let i=0; i<portraits.length; ++i ) {
		portraits[i].paint( g, target );
	}
}

function paintBack( g, diy, sheet ) {}

function onClear() {
}

// As noted above, the portrait state is stored in the DefaultPortrait
// objects in the portraits array, not as private settings. We need to
// add code to onWrite and onRead that will save and restore these
// objects "manually" when the game component is opened or saved.
// DefaultPortrait supports this out of the box, so all we have to
// do is add some "readObject" and "writeObject" calls (for those
// familiar with the terms, DefaultPortrait implements the Serializable
// interface).

function onRead( diy, ois ) {
	portraits[0] = ois.readObject();
	portraits[1] = ois.readObject();
}

function onWrite( diy, oos ) {
	oos.writeObject( portraits[0] );
	oos.writeObject( portraits[1] );
}

if( sourcefile == 'Quickscript' ) {
	testDIYScript();
}