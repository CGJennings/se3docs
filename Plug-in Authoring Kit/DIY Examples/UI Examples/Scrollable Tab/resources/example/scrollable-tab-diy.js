/*
 * scrollable-tab.js
 *
 * An example DIY card that demonstrates the use of
 * AbstractContainer.editorTabScrolling to create an editor tab
 * that can be scrolled vertically. This is useful for
 * tab panels with a height over 550 pixels or so as it allows
 * users with older graphics cards or displays to access all
 * the controls.
 *
 * For editors that use a variable or large number of child
 * controls, it may be a better design practice to redesign the
 * layout. For example, you might provide a list of children to
 * choose from, and display only the selected child underneath.
 */

useLibrary( 'diy' );
useLibrary( 'ui' );
useLibrary( 'markup' );


function create( diy ) {
	diy.faceStyle = FaceStyle.PLAIN_BACK;
	diy.name = 'Scrollable Tabs';
}

function createInterface( diy, editor ) {
	var stack = new Stack();

	// this is all we need to do to make the stack scrollable
	// when added to an editor's tabs
	stack.editorTabScrolling = true;
	
	for( var i=1; i<=50; ++i ) {
		var r = new Row();
		r.add( 'Label ' + i, textField( 'Field ' + i ) );
		stack.add( r );
	}

	// For this demo we don't need to create a Bindings object
	// since the controls don't actually do anything

	stack.addToEditor( editor, 'Very Tall Layout' );
}

function createFrontPainter( diy, sheet ) {}
function createBackPainter( diy, sheet ) {}

function paintFront( g, diy, sheet ) {
	// Prevent unsaved file warnings since this is just a demo:
	diy.markSaved();
	sheet.paintTemplateImage( g );
}

function paintBack( g, diy, sheet ) {}
function onClear() {}
function onRead( diy, ois ) {}
function onWrite( diy, oos ) {}

if( sourcefile == 'Quickscript' ) {
	testDIYScript();
}