/*
 * mutex-diy.js
 *
 * An example DIY card that demonstrates the use of
 * various controls for representing a set of mutually exclusive
 * options (that is, only one of the possible options can be
 * selected at any one time).
 */

useLibrary( 'diy' );
useLibrary( 'ui' );
useLibrary( 'markup' );


function create( diy ) {
	diy.name = 'Radio Buttons';
	$RadioValue = 'orange';
	$ToggleValue = 'purple';
	$CycleValue = 'brown';
	$ToggleBoolean = 'true'; // (or yes or 1)
	$CheckBoolean = 'true';
}

function createInterface( diy, editor ) {
	var bindings = new Bindings( editor, diy );

	//
	// Create a tab of radio buttons
	//

	var radioPanel = new TypeGrid();

	var radioBtns = [
		radioButton( 'Cabbage' ),
		radioButton( 'Tomato' ),
		radioButton( 'Carrot' )
	];

	// these are the values to be used for the setting for each
	// of the above buttons
	var radioValues = [
		'green',
		'red',
		'orange'
	];

	// Radio buttons need to be placed in sets
	// called button groups; when any button in
	// the group is selected, every other button
	// in that group is deselected automatically.
	//
	// Instead of binding to the buttons individually,
	// as you would with other controls, you bind to
	// the button group.
	var radioGroup = buttonGroup( radioBtns, radioValues );
	bindings.add( 'RadioValue', radioGroup, [0] );

	for( let i=0; i<radioBtns.length; ++i ) {
		radioPanel.place( radioBtns[i], (i > 0 ? 'br' : '') );
	}

	radioPanel.addToEditor( editor, 'Radio Buttons' );



	//
	// Create a tab of toggle buttons
	//

	// Note that this is *exactly* the same process; the only difference
	// is that we create toggle buttons instead of radio buttons.

	var togglePanel = new TypeGrid();

	var toggleBtns = [
		toggleButton( 'Plum' ),
		toggleButton( 'Banana' ),
		toggleButton( 'Blueberry' )
	];

	var toggleValues = [
		'purple',
		'yellow',
		'blue'
	];

	var toggleGroup = buttonGroup( toggleBtns, toggleValues );
	bindings.add( 'ToggleValue', toggleGroup, [0] );

	for( let i=0; i<toggleBtns.length; ++i ) {
		togglePanel.add( toggleBtns[i] );
	}

	togglePanel.addToEditor( editor, 'Toggle Buttons' );



	//
	// Create a tab with a cycle button
	//

	var cyclePanel = new TypeGrid();
	var cycleBtn = cycleButton( ['Water', 'Tea'], ['clear', 'brown'] );
	cyclePanel.add( cycleBtn );
	bindings.add( 'CycleValue', cycleBtn, [0] );
	cyclePanel.addToEditor( editor, 'Cycle Button' );





	//
	// Create a tab with regular toggle buttons
	// and check box buttons. When you create a toggle button
	// without putting it in a button group, and bind the
	// button directly, it acts like a simple on/off toggle,
	// just like a check box button.
	//

	var checkPanel = new TypeGrid();
	var ungroupedToggleBtn = toggleButton( 'Typeset Content' );
	var checkBtn = checkBox( 'Bold' );
	bindings.add( 'ToggleBoolean', ungroupedToggleBtn, [0] );
	bindings.add( 'CheckBoolean', checkBtn, [0] );
	checkPanel.place( ungroupedToggleBtn, '', checkBtn, 'br' );
	checkPanel.addToEditor( editor, 'Boolean Controls' );

	bindings.bind();
}

var textBox;

function createFrontPainter( diy, sheet ) {
	textBox = markupBox( sheet );
	textBox.tabWidth = 0.6;
	textBox.defaultStyle.add( SIZE, 8 );
}

function createBackPainter( diy, sheet ) {
}


function paintFront( g, diy, sheet ) {
	sheet.paintTemplateImage( g );
	if( $$ToggleBoolean.yesNo ) {
		g.setPaint( Color.BLACK );
		textBox.markupText = ($$CheckBoolean.yesNo ? '<b>' : '') +
							 'Vegetable:\t' + $RadioValue +
							 '\nFruit:\t' + $ToggleValue +
							 '\nBeverage:\t' + $CycleValue;
		textBox.draw( g, new Region( 20, 20, 200, 340 ) );
	}
}

function paintBack( g, diy, sheet ) {
}

function onClear() {
    $RadioValue = 'green';
    $ToggleValue = 'purple';
    $CycleValue = 'clear';
	$ToggleBoolean = 'false';
	$CheckBoolean = 'false';
}

function onRead() {}
function onWrite() {}

if( sourcefile == 'Quickscript' ) {
	testDIYScript();
}