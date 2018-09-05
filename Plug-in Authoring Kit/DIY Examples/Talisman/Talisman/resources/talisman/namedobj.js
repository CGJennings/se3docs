/*
 * namedobj.js
 *
 * This script is normally called from the main plug-in script.
 * It defines an object to contain fonts and other shared resources,
 * and then registers it as a named object. A named object is an
 * object that can be created in one script, and used from another
 * script that is run at a later time.
 */

useLibrary( 'fontutils' );
useLibrary( 'imageutils' );
useLibrary( 'markup' );

// Note that anything that we put in 'this' while inside this function will
// be available from our named object later.
function TalismanObject() {
	this.GAME_CODE = 'TAL';
	
	const base = 'talisman/';
	this.base = base;
	
	// Register the fonts needed for our cards, and store the family names
	const registerFont = function registerFont() {
		for( let i=0; i<arguments.length; ++i ) {
			arguments[i] = base + 'fonts/' + arguments[i] + '.ttf';
		}
		return FontUtils.registerFontFamilyFromResources.apply( this, arguments );
	};
	
	this.titleFamily = registerFont( 'windlass-extended' );
	// the actual cards use a font called "Caxton"; if you have that available
	// you could substitute it here
	this.bodyFamily = registerFont( 'alegreya-regular', 'alegreya-italic' );
	this.abilityFamily = registerFont( 'alegreya-bold' );


	// The font we use for stats like Life and Craft; when you draw text
	// using one of the sheet's text drawing methods, you need to create
	// a Font object for it; when you draw text in a markup box, you
	// set the font's family name (e.g., 'Arial'), style, and size using
	// TextStyles (see the definition of titleBox, for example).
	this.titleFont = new Font( this.abilityFamily, Font.BOLD, 7 );
	this.encounterNumberFont = new Font( this.bodyFamily, Font.BOLD, 9 );
	
	// Returns a string containing an image tag
	const imageTag = function imageTag( resource, width, height, unit ) {
		if( unit === undefined ) unit = 'pt';
		var tag = '<image res://' + base + resource;
		if( width !== undefined ) tag += ' ' + width + unit;
		if( height !== undefined ) tag += ' ' + height + unit;
		return tag + '>';
	};
	
	this.dividerTag = imageTag('decorations/card-divider.png', 60, 3.5);
	this.halfspaceTag = imageTag('decorations/card-halfspace.png', 60, 3.5);
	
	//
	// Define some helper functions for creating markup boxes
	//
	
	/**
	 * titleBox( sheet, useTitleFamily, size )
	 * Creates a new markup box for title areas.
	 *
	 * sheet : the sheet to create the box for
	 * useTitleFamily : true for titleFamily, false for bodyFamily
	 * size : font size
	 */
	this.titleBox = function titleBox( sheet, useTitleFamily, size ) {
		var box = markupBox( sheet );
		
		box.defaultStyle = new TextStyle(
			FAMILY, useTitleFamily ? this.titleFamily : this.bodyFamily,
			SIZE,   size
		);
	
		box.alignment = box.LAYOUT_CENTER | box.LAYOUT_MIDDLE;
		box.headlineAlignment = box.LAYOUT_CENTER;
		
		box.lineTightness = 4;
		box.textFitting = box.FIT_SCALE_TEXT;
		
		return box;
	};
	
	/**
	 * bodyBox( sheet, useTitleFamily, size )
	 * Creates a new markup box for card body areas.
	 *
	 * sheet : the sheet to create the box for
	 */
	this.bodyBox = function bodyBox( sheet ) {
		var box = markupBox( sheet );
		
		box.defaultStyle = new TextStyle(
			FAMILY, this.bodyFamily,
			SIZE,   7,
			WEIGHT, WEIGHT_LIGHT
		);
		
		box.setReplacementForTag( 'hr', this.dividerTag );
		box.setReplacementForTag( 'hs', this.halfspaceTag );
		box.alignment = box.LAYOUT_CENTER;
		box.headlineAlignment = box.LAYOUT_CENTER;
		box.lineTightness = 0.3;	
		box.textFitting= box.FIT_SCALE_TEXT;
		
		return box;		
	};


    /**
     * customizePortraitStencil( diy, image, region, applyToMarker )
     * Customizes the portrait clip stencil for the standard portrait or
     * marker portrait of a component.
     *
     * diy : the component whose portraits will be modified
     * image : the image to use to create a custom stencil, or null to ...
     *          leave the stencil unchanged
     * region : the region of the stencil image covered by the portrait, ...
     *          or null to use the portrait's clip region setting; if not null,
     *          also changes the portrait stencil clip region (determines the
     *          size of the portrait area shown in the portrait editing control;
     *          the component still uses the portrait clip region setting to
     *          determine the initial size of a new portrait image selection).
     */
	this.customizePortraitStencil = function customizePortraitStencil( diy, image, region, applyToMarker ) {
		var stencilMethod = applyToMarker ? 'setMarkerClipStencil' : 'setPortraitClipStencil';
		var regionMethod = applyToMarker ? 'setMarkerClipStencilRegion' : 'setPortraitClipStencilRegion';

		if( region != null ) {
			// call setXXXClipStencilRegion
			diy[ regionMethod ]( region );
		}
		if( image != null ) {
			// the region to use to create the stencil; either the one provided
			// or the component's standard clip region
			var r = region;
			if( r == null ) r = diy.settings.getRegion(
				diy.portraitKey + (applyToMarker ? '-marker' : '-portrait') + '-clip'
			);
			var stencil = arkham.component.AbstractPortrait.createStencil( image, region );
			// call setXXXClipStencil
			diy[ stencilMethod ]( stencil );
		}
	};

	/**
	 * paintExpansionSymbol( g, diy, baseKey )
	 * Paints an expansion symbol: g is the graphics context, diy is the component,
	 * sheet is the sheet being drawn. The baseKey will look up the following:
	 *
	 * If set to the "part of" variant:
	 *   baseKey-expsym-region = [where to draw symbol]
	 *   baseKey-expsym-gem = [gem image and position; see below]
	 * 
	 * If set to the "requires" variant:
	 *   baseKey-rqdexp-region = [where to draw symbol]
	 *   baseKey-rqdexp-gem = [gem image and position; see below]
	 *
	 * If the first key does not exist, nothing is painted. If the second key exists,
	 * it describes an image to be drawn underneath the expansion symbol, and
	 * where it should be drawn. The format of the key is imageResource,x,y
	 * (e.g. /talisman/image.png,0,0).
	 */
	this.paintExpansionSymbol = function paintExpansionSymbol( g, diy, sheet, baseKey ) {
		var s = diy.settings;
		
		// look up the logical variant (returns a setting string)
		var type = s.getExpansionVariant( null );
		
		// look up the expansion symbol(s) to draw
		var exp = s.getExpansionCode();
		// return if set to base game: nothing to draw
		if( 'NX' == exp ) return;

		// these are used to store the expansion to paint as the
		// member-of and required-by expansions, respectively;
		// first, though, we're just grabbing the first two selected
		// expansions
		var mExp = null, rExp = null;

		// we only draw the first selected expansion; 
		// get a list of selected expansions and pick
		// the first one that is registered (not null)
		var selected = arkham.sheet.Sheet.parseExpansionList( exp );
		for( let i=0; i<selected.length; ++i ) {
			if( selected[i] != null ) {
				if( mExp == null ) {
					mExp = selected[i];
				} else {
					rExp = selected[i];
					break;
				}
			}
		}

		// if an expansion code is set, but no expansion with
		// that code is registered, there is nothing to draw
		if( mExp == null ) return;
		
		// we now have either one or two two valid expansions,
		// we'll adjust mExp and rExp based on the variant type
		if( type == 0 ) {
			// selected member-of variant: only first selection is valid
			rExp = null;
		} else if( type == 1 ) {
			// selected requires variant: only first selection is valid but we need to move it
			rExp = mExp;
			mExp = null;
		} else {
			// selected both: if two expansions selected, use as-is, otherwise duplicate first expansion
			if( rExp == null ) rExp = mExp;
		}
		
		// draw the regular (member-of) expansion symbol, if any
		if( mExp != null ) {
			paintExpansionSymbolImpl( g, s, sheet, baseKey, '-expsym', mExp );
		}
		
		// draw the required expansion symbol, if any
		if( rExp != null ) {
			paintExpansionSymbolImpl( g, s, sheet, baseKey, '-rqdexp', rExp );
		}
	};


	/**
	 * paintExpansionSymbolImpl( g, s, sheet, baseKey, typeKey, exp )
	 * This private helper function is called by paintExpansionSymbol
	 * to paint a single gem-and-symbol pair. The s parameter is the
	 * component's settings instance; typeKey is either -expsym or
	 * -rqdsym depending on if the normal expansion symbol
	 * or the required symbol is being painted; exp is the Expansion
	 * whose symbol is to be painted.
	 */
	function paintExpansionSymbolImpl( g, s, sheet, baseKey, typeKey, exp ) {
		baseKey += typeKey; // e.g., char-expsym or char-rqdsym
		
		// get the region to draw the symbol in
		var region = s.getRegion( baseKey );
		// if no region defined, no symbol is wanted
		if( region == null ) return;

		// if there is a -gem setting, we need to parse and paint it
		var gem = s.get( baseKey + '-gem' );
		if( gem != null ) {
			// parse the gem value into an array with image, x, and y
			gem = parseGem( gem );
			
			// there is a low-res version, check if the HD plug-in added a hi-res version
			var hiresGem = s.get( baseKey + '-gem-hires' );
			if( hiresGem != null ) {
				// parse the hires key and replace the image, x, and y values
				// for the lowres gem, but keep the same width and height
				hiresGem = parseGem( hiresGem );
				gem[0] = hiresGem[0];
				gem[1] = hiresGem[1];
				gem[2] = hiresGem[2];
			}
			//           image   x       y       width   height
			g.drawImage( gem[0], gem[1], gem[2], gem[3], gem[4], null );
		}
		
		// finally, draw the symbol itself
		var symbol = sheet.getExpansionSymbol( exp, '0', region.width * sheet.scalingFactor );
		g.drawImage( symbol, region.x, region.y, region.width, region.height, null );		
	}

	/**
	 * parseGem( gemValue )
	 * A helper function called by paintExpansionSymbolImpl. It parses the value of
	 * an expansion symbol -gem key and returns the gem image, the x and y position to
	 * paint the image at, and the image width and height in an array.
	 */	
	function parseGem( gemValue ) {
		var tokens = gemValue.split( ',' );
		if( tokens.length != 3 ) {
			throw new Error( 'bad gem ' + baseKey + '-gem: ' + gem );
		}
		// now the tokens array is ['token/resource.jp2', 'xPos', 'yPos']
		// replace tokens[0] with the image loaded from the resource name
		// and append the image width and height to the array:
		// [image, 'xPos', 'yPos', width, height]
		//
		// However, the array we got back from split cannot be resized
		// (the gem value is Java string, so split returned a Java array).
		// Therefore, we create a new (JavaScript) array to hold the result.
		var image = ImageUtils.get( tokens[0] );
		return [ image, tokens[1], tokens[2], image.width, image.height ];
	}
}

//
// Create the object and place it in the named object database;
// then we can look it up from other scripts in the same way, e.g.:
//
// const Talisman = Eons.namedObjects.Talisman;
// println( Talisman.titleFamily );
//

Eons.namedObjects.Talisman = new TalismanObject();