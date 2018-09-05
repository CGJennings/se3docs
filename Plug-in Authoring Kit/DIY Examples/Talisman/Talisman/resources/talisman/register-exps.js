/*
 * register-exps.js
 * Registers the standard expansions for Talisman. This is normally
 * done when the plug-in loads, but the test-lib will also register
 * them for testing purposes.
 */
 
useLibrary( 'imageutils' );
 
importClass( gamedata.Game );
importClass( gamedata.Expansion );

/**
 * registerExpansion( code, baseKey, customWhite, customGold )
 * Registers an expansions with the given code. The name of the expansion
 * will be looked up (for the both the game and UI languages) using the
 * string key tal-exp-{baseKey}. The image for the black visual variant
 * will be loaded from the resource talisman/expansions/{baseKey}.jp2.
 * By default, the images for the white shadow and gold outline visual
 * variants will be generated using the expansion symbol template code
 * (see plugin.js). However, if customWhite and/or customGold are set to
 * true, then custom images will be loaded from the same resource folder
 * as the black variant, using the names {baseKey}-white.jp2 and
 * {baseKey}-gold.jp2, respectively.
 */
function registerExpansion( code, baseKey, customWhite, customGold ) {
	// expansion already registered (may happen while testing)
	if( Expansion.get( code ) != null ) return;

	// add expansions to the Talisman game if available,
	// but fall back to the All Games game if not (for testing)
	var gameInstalled = true;
	var game = Game.get( Eons.namedObjects.Talisman.GAME_CODE );
	if( game == null ) {
		gameInstalled = false;
		game = Game.get( Game.ALL_GAMES_CODE );
	}

	const folder = 'talisman/expansions/';
	var blackImage = ImageUtils.get( folder + baseKey + '.jp2' );
	var whiteImage;
	var goldImage;

	// for testing when the game is not installed
	if( !gameInstalled ) {
		whiteImage = blackImage;
		goldImage = blackImage;
	} else {
		var template = game.symbolTemplate;
		if( customWhite ) {
			whiteImage = ImageUtils.get( folder + baseKey + '-white.jp2' );
		} else {
			whiteImage = template.generateVariant( blackImage, 1 );
		}
		if( customGold ) {
			goldImage = ImageUtils.get( folder + baseKey + '-gold.jp2' );
		} else {
			goldImage = template.generateVariant( blackImage, 2 );
		}
	}

	Expansion.register(
		game, code, @('tal-exp-' + baseKey), #('tal-exp-' + baseKey),
		ImageUtils.get( 'talisman/expansions/' + baseKey + '-icon.jp2' ),
		[
			blackImage,
			whiteImage,
			goldImage
		]
	);
}

registerExpansion( 'TAL-RP', 'reaper' );
registerExpansion( 'TAL-DN', 'dungeon' );
registerExpansion( 'TAL-FM', 'frostmarch' );
registerExpansion( 'TAL-HI', 'highland' );
registerExpansion( 'TAL-SP', 'sacredpool' );
registerExpansion( 'TAL-DR', 'dragon' );
registerExpansion( 'TAL-BM', 'bloodmoon' );
