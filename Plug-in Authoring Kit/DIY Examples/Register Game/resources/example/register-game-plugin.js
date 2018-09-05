useLibrary( 'extension' );
useLibrary( 'imageutils' );

function getName() {
    return 'Register Game Example';
}

function getDescription() {
    return 'Registers a game and associated expansion';
}

function getVersion() {
    return 1.0;
}

// This function is a convenient shortcut for getting this plug-in's images
function image( resource, ext ) {
	if( ext == undefined ) {
		ext = 'jp2';
	}
	return ImageUtils.get( 'example/' + resource + '.' + ext );
}

// The code below is an example of creating a custom ExpansionSymbolTemplate.
// These templates describe the number and style of expansion symbol variations
// needed by an expansion. For example, an expansion might use a silver-coloured
// variant of the expansion symbol for dark cards, and a bronze-coloured variant
// for light cards. An ExpansionSymbolTemplate is optional; if it is not used,
// a default template will be used.
// A template is also required if you will paint your expansion symbols yourself
// rather than relying on the built-in symbol painting mechanism.
//
// This code creates a template by using JavaAdapter to subclass the Java class
// gamedata.AbstractExpansionSymbolTemplate using a JavaScript object (the code
// between the braces {...}.
//
// To see the effects of this template in action, install the plug-in and choose
// Expansion|New Expansion, select the Exempli Gratia game, and press Continue.
const template = new JavaAdapter(
	AbstractExpansionSymbolTemplate,
	{
		// In our example game, there is only one variant of each expansion symbol,
		// which is described as "Golden".
		getVariantCount: function getSymbolCount() {
			return 1;
		},
		// Returns the "Golden" name for the symbol style.
		getVariantName: function getSymbolName( n ) {
			this.checkIndex( n );
			return 'Golden';
		},
		// Returns a standard icon that features a characteristic colour (#e1b733)
		// from the "Golden" symbol design.
		getVariantIcon: function getVariantIcon( n ) {
			this.checkIndex( n );
			// the icon is only created if actually requested
			if( this.icon == null ) {
				this.icon = SymbolVariantUtilities.createDefaultVariantIcon( 0xe1b733 );
			}
			return this.icon;
		},
		icon: null,
		// returns the sample symbol
		getDefaultSymbol: function getDefaultSymbol( n ) {
			this.checkIndex( n );
			return image( 'template-sample-symbol' );
		},
		// this game draws expansion symbols itself; see register-game-diy.js
		isCustomDrawn: function isCustomDrawn() {
			return true;
		},
		// since there is only one symbol variant, this function rejects
		// all indices other than 0
		checkIndex: function checkIndex( n ) {
			if( n != 0 ) throw new Error( 'invalid symbol index: ' + n );
		}
	}
);


// This call registers the new game. The Game object that represents the
// newly registered game is stored in egGame so that we can associate the
// game's expansion with it below.
//
// The most complete form of the registration method is being used:
// Game.register(
//     String code, String uiName, String gameName, BufferedImage iconImage,
//     ExpansionSymbolTemplate template
// )
// Since this plug-in doesn't support multiple languages, the same, fixed
// name is passed for both the user interface language name and the game
// language name.
const egGame = Game.register(
	'EG', 'Exempli Gratia', 'Exempli Gratia', image( 'game-icon', 'png' ), template
);

// This call registers an expansion for our new game. As before, the most
// complete form of the registration method is used:
// Expansion.register(
//    Game forGame, String code, String uiName, String gameName,
//    BufferedImage iconImage, BufferedImage[] symbols
// )
// The symbols array should contain one image for each variant of the expansion
// symbol (as specified by the template). Since this game only uses one symbol
// variant, it passes an array of a single image.
const ieExp = Expansion.register(
	egGame, 'EG_IE', 'Id Est', 'Id Est', image( 'expansion-icon' ), [ image( 'expansion-symbol' ) ]
);

// Add our example card to the New Component Dialog
ClassMap.add( 'example/register-game.classmap' );