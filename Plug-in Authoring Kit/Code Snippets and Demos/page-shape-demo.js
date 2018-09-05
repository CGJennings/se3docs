/*
 * page-shape-demo.js - version 4
 *
 * This script uses a DIY component to demonstrate:
 *   - how to flow text using a PageShape
 *   - the effect of the various built-in PageShapes
 *   - how to write a custom PageShape from scratch using script code
 *     (see the makeHexShape function)
 * Run from the code editor window or by right clicking in the project pane.
 */

useLibrary( 'diy' );
useLibrary( 'ui' );
useLibrary( 'markup' );
useLibrary( 'imageutils' );
importClass( java.awt.AlphaComposite );


var textBox, s1Combo, s2Combo, combinerCombo, alignCombo, codeEditor;

var decoration = ImageUtils.resize(
	ImageUtils.get( 'icons/black-fedora.png' ),
	48, 72
);
var decorationFlipped = ca.cgjennings.graphics.ImageUtilities.flip(
	decoration, false, true
);


// This is the region that is used to draw the text;
// the PageShape will be used to shape the left and
// right margins of this region.
var textRegion = new Region( 20, 20, 200, 340 );

// This function creates custom PageShapes
// by subclassing PageShape.
function makeHexShape( region, insetFactor, topOnly ) {
	if( topOnly ) {
		region = region.clone();
		region.height *= 2;
	}
	var ry0 = region.y;
	var ry1 = region.y + region.height/2;
	var ry2 = region.y + region.height;
	if( insetFactor <= 0 || insetFactor >= 0.5 )
		throw new Error( 'insetFactor must be between 0 and 0.5 (exclusive)' );
	var iMax = region.width * insetFactor;

	var shape = {
		lerp : function lerp( y ) {
			return 1 - (y - ry0) / (ry1 - ry0);
		},
		insetAt : function insetAt( y ) {
			if( y <= ry1 ) {
				return this.lerp( y ) * iMax;
			} else if( y <= ry2 ) {
				return this.lerp( ry1-(y-ry1) ) * iMax;
			} else {
				return 0;
			}
		},
		getInset: function getInset( y1, y2 ) {
			return Math.max( this.insetAt( y1 ), this.insetAt( y2 ) );
		},
		// the getLeftInset, getRightInset, and debugDraw functions
		// form our implementation of the PageShape class
		getLeftInset: function getLeftInset( y1, y2 ) {
			return this.getInset( y1, y2 );
		},
		getRightInset: function getRightInset( y1, y2 ) {
			return this.getInset( y1, y2 );
		},
		debugDraw: function debugDraw( g, r ) {
			var li = new java.awt.geom.Line2D.Double(
					region.x + region.width * insetFactor,
					region.y,
					region.x,
					region.y + region.height/2
			);
			g.draw( li );
			[li.y1, li.y2] = [region.y + region.height, li.y2 ];
			if( !topOnly ) g.draw( li );
			li.x1 = region.x + region.width - (region.width * insetFactor);
			li.x2 = region.x + region.width;
			if( !topOnly ) g.draw( li );
			[li.y1, li.y2] = [r.y, li.y2];
			g.draw( li );
		}
	};
	// Create a new object that subclasses PageShape using the
	// functions defined in 'shape'. When a function in shape has
	// the same name as a method in PageShape, that function is used
	// to override the method.
	// (PageShape is a Java class, shape is a JavaScript object)
 	return new JavaAdapter( PageShape, shape );
 }
 
// This function creates a custom PageShape
// by building a geometric shape and passing it
// to PageShape.GeometricShape.
function makeWaveShape( region, amplitude, inset ) {
	var x = region.x + inset;
	var y = region.y;
	var w = region.width - inset*2;
	var h = region.height;
	var path = new java.awt.geom.Path2D.Double();
	
	path.moveTo( x, y );
	path.curveTo( x - amplitude, y+h/3,
				  x + amplitude, y+h*2/3,
				  x, y+h
	);
	path.lineTo( x+w, y+h );
	path.curveTo( x + w + amplitude, y+h*2/3,
	              x + w - amplitude, y+h/3,
	              x + w, y
	);
	path.lineTo( x, y );
	
	return new PageShape.GeometricShape( path, region );
}

var shapeNames = [
	'Rectangle (Default)',
	'Inset (both)',
	'Inset (right only)',
	'Cup (top)',
	'Cup (bottom)',
	'Cup (one deep corner)',
	'Diamond',
	'Hexagon',
	'Triangle',
	'Cone',
	'Ellipse',
	'Wave',
	'<html><b>Custom Code'
];

var CUSTOM_CODE = shapeNames.length - 1;

var shapes = [
	PageShape.RECTANGLE_SHAPE,
	new PageShape.InsetShape( 32, 32 ),
	new PageShape.InsetShape(  0, 32 ),
	new PageShape.CupShape( 32, 32, textRegion.y + 32, 0, 0 ),
	new PageShape.CupShape(  0,  0, textRegion.y + textRegion.height - 32, 32, 32 ),
	new PageShape.CupShape(  0, 96, textRegion.y + 32, 0, 0 ),
	makeHexShape( textRegion, 0.499 ),
	makeHexShape( textRegion, 0.25 ),
	makeHexShape( textRegion, 0.499, true ),
	makeHexShape( textRegion, 0.33, true ),
	new PageShape.GeometricShape(
		new java.awt.geom.Ellipse2D.Double(
			textRegion.x, textRegion.y,
			textRegion.width, textRegion.height
		), textRegion
	),
	makeWaveShape( textRegion, 64, 16 ),
	PageShape.RECTANGLE_SHAPE
];

var combinerNames = [
	'None (Main Shape Only)',
	'CompoundShape',
	'MergedShape',
	'Interpolation'
];

var alignmentNames = [
	'Left',
	'Centered',
	'Right',
	'Justified'
];

var alignments = [
	LAYOUT_LEFT|LAYOUT_TOP,
	LAYOUT_LEFT|LAYOUT_TOP,
	LAYOUT_CENTER|LAYOUT_TOP,
	LAYOUT_RIGHT|LAYOUT_TOP,
	LAYOUT_LEFT|LAYOUT_TOP|LAYOUT_JUSTIFY,
];
	



// Returns a PageShape based on the current controls
function createShape() {
	var i1 = s1Combo.selectedIndex;
	var i2 = s2Combo.selectedIndex;
	var method = combinerCombo.selectedIndex;
	if( i1 < 0 || i2 < 0 || method < 0 ) return null;
	
	if( i1 == CUSTOM_CODE || i2 == CUSTOM_CODE ) {
		var result = eval(
			'try { ' + codeEditor.text + ' } catch(e) { error.handleUncaught(e); }'
		);
		if( !(result instanceof PageShape) ) {
			result = PageShape.RECTANGLE_SHAPE;
		}
		shapes[CUSTOM_CODE] = result;
	}
	
	var shape = shapes[i1];
	switch( method ) {
		case 0:
			break;
		case 1:
			var y = textRegion.y + textRegion.height/2;
			shape = new PageShape.CompoundShape( shape, y, shapes[i2] );
			break;
		case 2:
			shape = new PageShape.MergedShape( shape, shapes[i2] );
			break;
		case 3:
			var s1 = shape, s2 = shapes[i2];
			var interpolator = {
				getLeftInset: function getLeftInset( y1, y2 ) {
					return (s1.getLeftInset( y1, y2 ) + s2.getLeftInset( y1, y2 )) / 2;
				},
				getRightInset: function getRightInset( y1, y2 ) {
					return (s1.getRightInset( y1, y2 ) + s2.getRightInset( y1, y2 )) / 2;
				}
			};
			shape = JavaAdapter( PageShape, interpolator );
			break;
	}
	return shape;
}

function create( diy ) {
	diy.faceStyle = FaceStyle.ONE_FACE;
	$text = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do '
		+ 'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut '
		+ 'enim ad minim veniam, quis nostrud exercitation ullamco laboris '
		+ 'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor '
		+ 'in reprehenderit in voluptate velit esse cillum dolore eu fugiat '
		+ 'nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt '
		+ 'in culpa qui officia deserunt mollit anim id est laborum.';
	$code = 'new PageShape.CompoundShape(\n'
		+ '\tnew PageShape.InsetShape( 64, 64 ),\n'
		+ '\t181,\n'
		+ '\tmakeHexShape( textRegion, 0.499 )\n'
		+ ');';
	// the 'show' check boxes are both on by default
	$sr = $sd = 'yes';
}

function createInterface( diy, editor ) {
	var panel = new Stack();
	s1Combo = comboBox( shapeNames );
	s1Combo.maximumRowCount = 16;
	s2Combo = comboBox( shapeNames );
	s2Combo.maximumRowCount = 16;
	combinerCombo = comboBox( combinerNames );	
	alignCombo = comboBox( alignmentNames );
	alignCombo.selectedIndex = 3;
	var showRegion = checkBox( 'Show Region Box and Page Shape', true );
	var showDecorations = checkBox( 'Show Corner Decorations', true );
	var field = textArea( '', 7 );
	var secondaryShapeLabel = new swing.JLabel( 'Secondary Shape' );
	codeEditor = codeArea( '', 100, 140 );
	
	panel.add( 'Main Shape', s1Combo );
	panel.add( 'Combination Method', combinerCombo );
	panel.add( secondaryShapeLabel, s2Combo );
	panel.add( 'Sample Text', new swing.JScrollPane( field ) );
	panel.add( 'Text Alignment', alignCombo );
	panel.add( showRegion );
	panel.add( showDecorations );
	panel.add( ' ', 'Custom Code Editor', codeEditor );
	
	combinerCombo.addActionListener( function() {
		var enable = combinerCombo.selectedIndex > 0;
		secondaryShapeLabel.enabled = enable;
		s2Combo.enabled = enable;
	} );
	combinerCombo.selectedIndex = 0;
		
	var bindings = new Bindings( editor, diy );
	// we add bindings for the combo boxes just to get it to redraw
	// the card when the user makes a selection
	bindings.add( 's1', s1Combo );
	bindings.add( 's2', s2Combo );
	bindings.add( 'c', combinerCombo );
	bindings.add( 'al', alignCombo );
	bindings.add( 'sr', showRegion );
	bindings.add( 'sd', showDecorations );
	bindings.add( 'code', codeEditor );
	bindings.add( 'text', field );

	panel.addToEditor( editor, 'PageShape Demo' );	
	bindings.bind();
}

function createFrontPainter( diy, sheet ) {
	textBox = markupBox( sheet );
	textBox.textFitting = FIT_SCALE_TEXT;
}

function paintFront( g, diy, sheet ) {
	sheet.paintTemplateImage( g );
	g.setPaint( Color.BLACK );
	textBox.markupText = '';
	textBox.markupText = $text;
	
	textBox.pageShape = createShape();
	textBox.alignment = alignments[ alignCombo.selectedIndex+1 ];
	
	var oldDebug = textBox.DEBUG;
	textBox.DEBUG = Settings.yesNo($sr);
	textBox.draw( g, textRegion );
	textBox.DEBUG = oldDebug;
	// don't ask about unsaved changes when
	// the demo window is closed
	diy.markSaved();
	
	// paint fake 'decorations' to show how shape can be used to flow text
	if( Settings.yesNo($sd) ) {
		g.setComposite( AlphaComposite.SrcOver.derive(0.66) );
		//g.clip( textRegion );
		var dw = decoration.width;
		var dh = decoration.height;
		var x2 = sheet.templateWidth - dw;
		var y2 = sheet.templateHeight - dh;
		g.drawImage( decorationFlipped, 0, 0, null );
		g.drawImage( decorationFlipped, x2, 0, null );
		g.drawImage( decoration, 0, y2, null );
		g.drawImage( decoration, x2, y2, null );
	}
}

function createBackPainter( diy, sheet ) {}
function paintBack( g, diy, sheet ) {}

function onClear() {
	$text = '';
}

function onRead() {}
function onWrite() {}

testDIYScript(); 