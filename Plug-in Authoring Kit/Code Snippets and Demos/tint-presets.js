/*
 * tint-presets.js - version 1
 *
 * This script uses a DIY component to demonstrate how to add a list of
 * preset tint settings to the controls for a tintable element.
 * Run from the code editor window or by right clicking in the project pane.
 */

useLibrary( 'diy' );
useLibrary( 'ui' );
useLibrary( 'imageutils' );

function create( diy ) {
	diy.faceStyle = FaceStyle.ONE_FACE;
	$tintValue = '0,1,1'; // note that this will match the "Enraged" preset
	$peacefulPreset = '-60,0.43,0.78'; // normally would be in a separate .settings file
}

function createInterface( diy, editor ) {
	let panel = new Stack();
	hsbPanel = tintPanel();

	// define the preset tint values to use
	// (the user can still choose a custom tint if they wish)
	hsbPanel.setPresets(
		'Peaceful', $peacefulPreset, // preset values can be set from setting value
		'Enraged',  '0,1,1',         //   or just a string that uses the setting value format
		'Toxic',    [0.34,1,1]       //   or an array [h,s,b] with h=angle/360
	);

	panel.add( hsbPanel );

	let bindings = new Bindings( editor, diy );
	bindings.add( 'tintValue', hsbPanel );
	panel.addToEditor( editor, 'Tint Presets Demo' );
	bindings.bind();
}

let tintable; // the image we will tint

function createFrontPainter( diy, sheet ) {
	tintable = ImageUtils.create( 100, 100 );
	let g = tintable.createGraphics();
	try {
		g.setPaint( Colour.RED );
		g.fillRect( 0, 0, tintable.width, tintable.height );
		g.setPaint( Colour.BLACK );
		g.drawRect( 0, 0, tintable.width-1, tintable.height-1 );
	} finally {
		if(g) g.dispose();
	}
}

function paintFront( g, diy, sheet ) {
	sheet.paintTemplateImage( g );
	let hsb = $$tintValue.tint;
	let tinted = ImageUtils.tint( tintable, hsb );
	g.drawImage( tinted,
		(sheet.templateWidth-tintable.width)/2,
		(sheet.templateHeight-tintable.height)/2,
		null
	);

	// don't ask about unsaved changes when
	// the demo window is closed
	diy.markSaved();
}

function createBackPainter( diy, sheet ) {}
function paintBack( g, diy, sheet ) {}
function onClear() {}
function onRead() {}
function onWrite() {}

testDIYScript();