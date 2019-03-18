/*
 * design-support-diy1.js
 *
 * An example DIY card that demonstrates how to create design supports.
 * This example uses a default base class to create a design support
 * based on text formatted with simple HTML (~HTML 3.2). To give you
 * an idea of the range of possibilities, the design supports for
 * investigator cards and monster tokens in the Arkham Horror plug-in
 * are both implemented this way. (See also the second example in
 * this folder for more on creating supports like those in the
 * investigator editor.
 */

useLibrary( 'diy' );
useLibrary( 'ui' );
useLibrary( 'imageutils' );

// This class lets us make a text-based design support that calls into
// a script function to perform design analysis
importClass( arkham.diy.VerbalDesignSupportAdapter );


function analyzeDesign( diy, sb ) {
	// "sb" is a StringBuilder; a StringBuilder lets you build up
	// a long string of text but is more efficient than using
	// the 'string' + ' ' + 'concatenation' operator over multiple
	// lines in the script
	sb.append( '<h3>Design Support</h3>' )
	  .append( 'Given the circumstances, about the only thing I can suggest is...<br>' )
	  .append( 'have you considered using a name other than <i>' )
	  .append( diy.fullName )
	  .append( '?</i>' )
	  .append( '<p>Also... would anyone like any toast?' );

	  
	// the function *must* return either true or false to indicate
	// whether the design is considered 'valid'
	return true;
}



function create( diy ) {
	diy.faceStyle = FaceStyle.ONE_FACE;
	diy.name = 'Design Support';
}

function createInterface( diy, editor ) {
	// add a control for the name so that the design can be
	// changed; this will lead to the design support being
	// asked to re-analyze the design, which in turn will
	// cause our function to be called
	let stack = new Stack();
	let nameField = new textField();
	stack.add( nameField );
	diy.nameField = nameField;
	
	stack.addToEditor( editor, 'Design Support 1', null, null, 0 );
	
	// Design supports need to be attached to the editor,
	// so the best place to set them up is in
	// createInterface.
	//
	// Note that we are passing the "analyzeDesign"
	// function that we defined above. That function
	// will get called whenever the design support
	// needs to be updated.
	let support = new VerbalDesignSupportAdapter( diy, analyzeDesign );
	editor.designSupport = support;
}

function createFrontPainter( diy, sheet ) {}
function createBackPainter( diy, sheet ) {}
function paintFront( g, diy, sheet ) {}
function paintBack( g, diy, sheet ) {}
function onClear() {}
function onRead( diy, ois ) {}
function onWrite( diy, oos ) {}

testDIYScript();