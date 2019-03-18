/*
 * on-paint-hacking-example.js - version 1
 *
 * This example shows how an on-paint handler can be used to customize
 * how a component is painted without modifying (or even having access
 * to) the component's source code.
 *
 * The example modifies an investigator card for the game Arkham Horror.
 * In this game, investigators have a number of attributes, two of which are
 * Sanity and Stamina. These two attributes are normally linked so that
 * they sum to 10. The example breaks this rule by creating an investigator
 * with a Sanity value that is fixed at 3, regardless of its Stamina value.
 * There is no simple way to do this with the component itself, because it
 * actually calculates the Sanity value Sanity = 10 - Stamina. Thus, changing
 * one of these two attributes always changes the other one. Instead, what we
 * will do is allow the component to use the calculated Sanity value,
 * but paint our own value whenever the card's front sheet is repainted.
 * To do this, we use an on-paint handler. An on-paint handler allows you
 * to add a bit of custom script code to any component by defining the
 * private setting $on-paint. The value of the setting is a string that
 * includes code that defines a function, onPaint, that will be called
 * when any of the component's sheets are painted, just after the normal
 * painting process completes.
 */

// Create a new Arkham Horror investigator; this will require
// the Arkham Horror plug-in, so we ensure that's installed first.
resources.CoreComponents.validateCoreComponents(
	'CATALOGUEID{7c299a1e-3ed6-49ea-9830-fc5c967764e9:2013-7-27-0-0-0-0}'
);
Eons.addEditor( new arkham.InvestigatorEditor() );

// Use the new component's private settings for $-notation:
useSettings( Component );

// Set this to the standard location of the sanity value;
// this controls where we will paint our value, and should
// the standard location ever change we can fix our component
// by updating this setting.
$fixed-sanity-region = $sanity-region;

// Now move the standard sanity value off the card face; this is
// where the original component painting code will draw the
// calculated Sanity value. The calculated value is still drawn,
// but since this location 200 units up and left of where the
// actual sheet starts, the calculated value won't actually
// appear anywhere on the finished sheet.
$sanity-region = '-200,-200,100,100';

// This is the onPaint function that we want to be called each time
// one of the component's sheets is drawn. Writing it within the
// script allows us to check it for basic syntax errors before
// running this script, but it is important to remember that it is
// not actually *this* function that is being called. Instead, a copy of
// this function's source code will be evaluated anew each time part of
// the component is drawn. So, for example, if we defined a global
// variable in this script and then used that variable from the onPaint
// function, the global variable wouldn't exist when the on-paint
// handler was actually called.
//
// The arguments passed to this function are: a graphics context that
// can be used to paint on the sheet; the game component being updated;
// and the specific sheet of the game component that is being repainted.
function onPaint( g, gc, sheet ) {
	let font, region;

	// This is called for every sheet (card face); we need to make
	// sure that we are dealing with the *front* face since that
	// is the only one we want to modify. To do that we ask the
	// component for the array of faces currently attached to it,
	// and check if the one we are drawing matched the one at
	// index 0 of that array. (The order of the elements in this
	// array will match the order of the tabs in the preview area
	// of the component editor.)
	if( sheet != gc.sheets[0] ) return;

	// Change $-notation to refer to the game component being updated.
	useSettings( gc );
	// The rest of the function is specific to painting a fixed Sanity
	// value: we set the drawing colour of the graphics context to the
	// colour used for black by Arkham Horror components (which is stored
	// in one of the master settings for that game). We then create a
	// region based on the custom region we defined for our component;
	// this is where we will draw our Sanity value, and it should match
	// the original location before we moved that off the card face.
	// We then get the font we want to use; the ArkhamFonts class is defined
	// by the Arkham Typefaces plug-in and is used to share fonts between
	// the various games in the Arkham Horror family (Arkham Horror,
	// Mansions of Madness, etc.). Finally, we draw the string '3' at the
	// location and size used for the Sanity attribute, replacing the
	// calculated value (which was already drawn, but now appears off the
	// card face area so it isn't visible) with our custom, fixed value.
	// See javadoc:ca/cgjennings/apps/arkham/sheet/Sheet for details
	// on the drawTitle method.
	g.setPaint( new Colour( $ah-black-colour ) );
	// for demo purposes, draw the sanity value in red to make it stand out;
	// if you were really customizing a component, you'd delete this line:
	g.setPaint( new Colour( $ah-red-colour ) );
	region = new Region( $fixed-sanity-region );
	font = resources.ArkhamFonts.monoTitleFont;
	sheet.drawTitle( g, '3', region, font, $sanity-pointsize, 0 );
}

// Calling the toSource() function returns a copy of the source
// code that defines the onPaint function as a string (without comments).
// We then assign that source string to the component's on-paint setting.
// The sheet painting system looks for this setting, and if found it evaluates
// the string it contains and then calls the onPaint function it defines.
$on-paint = onPaint.toSource();
Editor.redrawPreview();