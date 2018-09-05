/*
 * plugin.js
 *
 * This is the main plug-in script for the Talisman plug-in.
 * Because the plug-in is an extension, it gets loaded while
 * Strange Eons is starting up. The main jobs of this plug-in
 * are to load our localized strings, register the Talisman
 * game and expansions, and load the Talisman "class map" which
 * tells Strange Eons what game components the plug-in supports.
 */

useLibrary( 'extension' );
importClass( gamedata.SymbolVariantUtilities );

/**
 * Called when the plug-in is loaded, before any other plug-in method.
 * This gives us a chance to load our string tables so we can localize
 * the plug-in name.
 */
function initialize() {
	// Try to set up the plug-in; if anything throws an exception we
	// will return false, which tells Strange Eons not to conrinue
	// loading the plug-in.
	try {
		const uiLang = Language.getInterface();
		const gameLang = Language.getGame();

		// load localized strings
		uiLang.addStrings( 'talisman/text/ui' );
		uiLang.addStrings( 'talisman/text/common' );
		gameLang.addStrings( 'talisman/text/game' );
		gameLang.addStrings( 'talisman/text/common' );

		// create the Talisman named object
		useLibrary( 'res://talisman/namedobj.js' );
		const Talisman = Eons.namedObjects.Talisman;

		// register Talisman as a game supported by Strange Eons
		registerGame();
		registerOfficialExpansions();
		
		// now that the game is regsietered, we can add the
		// default settings to use for new cards
		Game.get( 'TAL' ).masterSettings.addSettingsFrom( 'talisman/base.settings' );
		
		ClassMap.add( 'talisman/base.classmap' );

	} catch( ex ) {
		Eons.log.severe( 'Talisman plug-in failed to start' );
		Error.handleUncaught( ex );
		return false;
	}
	return true;
}


/**
 * Returns the short name for the plug-in.
 */
function getName() {
    return @tal_plug_name;
}



/**
 * Returns a brief description of the plug-in.
 */
function getDescription() {
    return @tal_plug_desc;
}



/**
 * Returns a version number for the plug-in.
 */
function getVersion() {
    return 1.0;
}





/**
 * Registers the game, its code, and its icon.
 */
function registerGame() {
	// the expansion symbol template; note that it differentiates
	// between visual (design style) and logical (intended purpose)
	// expansion symbol variants
	var est = new AbstractExpansionSymbolTemplate() {
	};
	
	
	// this is the class gamedata.Game; the extension
	// library imports the Game class for us
	return Game.register(
		'TAL', @tal_game, #tal_game,
		ImageUtils.get( 'talisman/expansions/game.jp2' ),
		createExpansionSymbolTemplate()
	);
}



/**
 * Registers Talisman expansion products.
 */
function registerOfficialExpansions() {
	// this script contains the actual registration code;
	// it is in a separate library because we also register
	// expansions during testing
	useLibrary( 'res://talisman/register-exps.js' );
}



/**
 * Creates the expansion symbol template for the game;
 * called from registerGame. Talisman does its own custom
 * expansion symbol painting, and uses logical variants
 * (see the description of ExpansionSymbolTemplate in
 * the Strange Eons API).
 */
function createExpansionSymbolTemplate() {
	const STANDARD_EXP_SYM_SIZE = 78;
	const GOLD = 0xd7c926;
	return new JavaAdapter(
		AbstractExpansionSymbolTemplate,
		{
			// Returns the number of visual variants: this is the number
			// of different design variants required for each symbol in
			// order to paint it on any card
			getVariantCount: function getVariantCount() {
				return 3;
			},
			getVariantName: function getVariantName( n ) {
				this.checkIndex( n );
				return @( 'tal-exp-vis-' + n.toInt() );
			},
			// Returns a standard icon representing the variant's visual style
			getVariantIcon: function getVariantIcon( n ) {
				this.checkIndex( n );
				if( this.icons == null ) {
					const SU = SymbolVariantUtilities;
					this.icons = [
						SU.createDefaultVariantIcon( Color.BLACK ),
						SU.createDefaultVariantIcon( Color.WHITE ),
						SU.createDefaultVariantIcon( GOLD )
					];
				}
				return this.icons[n];
			},
			icons: null,

			// two logical variants: part of an epansion, or requires an expansion
						
			getLogicalVariantCount: function getLogicalVariantCount() {
				return 3;
			},
			getLogicalVariantName: function getLogicalVariantName( n ) {
				this.checkLogicalIndex( n );
				return @( 'tal-exp-log-' + n.toInt() );
			},
			getLogicalVariantIcon: function getLogicalVariantIcon( n ) {
				this.checkLogicalIndex( n );
				return null;
			},
			// returns the sample symbol
			getDefaultSymbol: function getDefaultSymbol( n ) {
				this.checkIndex( n );
				var bi = ImageUtils.get( 'talisman/expansions/dungeon.jp2' );
				if( n > 0 ) {
					bi = this.generateVariant( bi, n );
				}
				return bi;
			},
			// this game draws expansion symbols itself
			isCustomDrawn: function isCustomDrawn() {
				return true;
			},
			// since there is only one symbol variant, this function rejects
			// all indices other than 0
			checkIndex: function checkIndex( n ) {
				if( n < 0 || n >= this.getVariantCount() ) throw new Error( 'invalid design variant index: ' + n );
			},
			// since there is only one symbol variant, this function rejects
			// all indices other than 0
			checkLogicalIndex: function checkLogicalIndex( n ) {
				if( n < 0 || n >= this.getLogicalVariantCount() ) throw new Error( 'invalid logical variant index: ' + n );
			},
			// override the base class to return true since we can generate symbol variants
			canGenerateVariantsAutomatically: function canGenerateVariantsAutomatically() {
				return true;
			},
			// generates an expansion symbol from a user-supplied sample image;
			// this uses SymbolVariantUtilities 
			generateVariant: function generateVariant( bi, variant ) {
				this.checkIndex( variant );

				const SU = SymbolVariantUtilities;
				bi = SU.extractSymbol( bi );
				bi = SU.standardizeSize( bi, STANDARD_EXP_SYM_SIZE );
				
				// we now have a simple black or greyscale symbol; which is
				// exactly what we want if variant == 0
				if( variant != 0 ) {
					// for variant 1 or 2:
					// convert to white, then add either a shaodw or a gold outline
					if( SU.isMonochrome( bi ) ) {
						bi = SU.recolor( bi, Color.WHITE );
					}
					if( variant == 1 ) {
						bi = SU.shadow( bi, 0, 0, Color.BLACK, 5, 2 );
					} else {
						bi = SU.outline( bi, new Color( GOLD ), 5 );
					}
				}
				// re-standardize, since some effects add/remove padding
				bi = SU.standardizeSize( bi, STANDARD_EXP_SYM_SIZE );
				return bi;
			}
		}
	);
}