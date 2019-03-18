/*
 * prefab2-diy.js
 *
 * The prefab library can be used to create components with common
 * layouts entirely from settings. All the script needs to do is
 * set the value of the variable pfBaseKey to the prefix of the
 * family of settings keys to use. See the documentation for
 * the prefab library for more information (Help|Librarian).
 *
 * This example shows how to use the before and after function
 * mechanism to customize the default behaviour of the component.
 */

useLibrary( 'prefab' );

pfBaseKey = 'demo2';

function afterCreateFrontPainter( diy, sheet ) {
	// set a custom page shape on the content layout box,
	// which was created just before this function was called
	let textRegion = $$demo2_content_region.region2D;
	let ellipse = new java.awt.geom.Ellipse2D.Double(
		textRegion.x, textRegion.y, textRegion.width, textRegion.height
	);
	let shape = new PageShape.GeometricShape( ellipse, textRegion );
	pfContentBox.pageShape = shape;
}

function beforePaintFront( g, diy, sheet ) {
	// fill in the portrait blank area with a white
	// background for the text
	g.setPaint( Colour.WHITE );
	g.fill( $$demo2_portrait_clip_region.region );
	g.setPaint( Colour.BLACK );
}


// load settings during testing
if( sourcefile == 'Quickscript' ) {
	Settings.shared.addSettingsFrom( 'res:example/prefab.settings' );
}