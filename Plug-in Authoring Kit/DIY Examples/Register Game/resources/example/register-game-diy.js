/*
 * register-game-diy.js
 *
 * An example DIY card that performs its own expansion
 * symbol painting.
 */

useLibrary( 'diy');
useLibrary( 'ui' );
useLibrary( 'markup' );

importClass( gamedata.Expansion );

function create( diy ) {
	diy.name = 'Game Example';
	$Countdown = '5';
}

function createInterface( diy, editor ) {
	var nameField = textField();
	var counter = slider( 0, 9 );
	counter.majorTickSpacing = 1;
	counter.paintTicks = true;
	counter.paintLabels = true;
	counter.snapToTicks = true;

	// TypeGrid is an easy to use container for laying out controls.
	// It is meant to work akin to a typewriter, using tabs to line
	// up controls.
	var panel = new TypeGrid();
	// Add the label name, then nameField after a tab (it will grow to
	// fill leftover space in the row). Then add the label Count after
	// a line break; finally add counter after a tab (so it lines up
	// with nameField, and again make it take up the rest of the row).
	panel.place( 'Name', '', nameField, 'tab hfill' );
	panel.place( 'Count', 'br', counter, 'tab hfill' );
	panel.setTitle( 'Minimal Settings' );

	var bindings = new Bindings( editor, diy );
	// Here "Countdown" is the name of the setting key
	// that we want updated with the value from counter.
	bindings.add( 'Countdown', counter, [0] );

	// Tell the DIY which control will hold the component's name
	// (the DIY has special support for a component's name and
	// no binding is required).
	diy.setNameField( nameField );
	panel.addToEditor( editor, 'Name' );
}

var textBox;

function createFrontPainter( diy, sheet ) {
	textBox = markupBox( sheet );
}

function createBackPainter( diy, sheet ) {
}


function paintFront( g, diy, sheet ) {
	// prevent unsaved file warnings
	diy.markSaved();
	
	sheet.paintTemplateImage( g );
	
	// This is the custom painting code for the expansion symbol.
	// In this example, we use custom painting code to paint
	// the expansion symbol underneath the card text.
	var expCode = diy.settings.expansionCode;
	if( 'NX' != expCode ) { // 'NX' is the code for the base game
		// Looks up the Expansion object for the component's expansion.
		// This could be null if the user adds a custom expansion and then
		// removes it later.
		var symbol = null;
		var exp = Expansion.get( expCode );
		if( exp != null ) {
			symbol = exp.getSymbol( 0 );
		}
		// If symbol is null, nothing is painted.
		g.drawImage( symbol, 56, 126, 128, 128, null );
	}

	// This is the code for drawing the card content; it is
	// essentially the same as the "minimal DIY" example script.
	g.setPaint( Color.BLACK );
	var text = '<center><middle>Hello, ' + diy.name;
	var count = new Number( $Countdown );
	for( var i=count; i>=0; --i ) {
		text += '\n' + i;
	}
	textBox.markupText = text;
	textBox.draw( g, new Region( 20, 20, 200, 340 ) );
}

function paintBack( g, diy, sheet ) {
}

function onClear() {
    $Countdown = '0';
}

function onRead() {}
function onWrite() {}

if( sourcefile == 'Quickscript' ) {
	// When tested this way instead of being created via a class map,
	// the game won't be set correctly unless we pass it to the
	// test function.
	testDIYScript( 'EG' );
}