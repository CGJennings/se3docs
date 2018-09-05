useLibrary( 'extension' );

function getName() {
    return 'Talisman HD';
}

function getDescription() {
    return 'Talisman high definition graphics add-on';
}

function getVersion() {
    return 1.0;
}

// Find out if Talisman is registered as a game; because the Talisman
// plug-in is set to a higher priority than this plug-in in its root
// file (eons-plugin), the main Talisman plug is guaranteed to be
// started first if installed.
var talismanGame = Game.get( 'TAL' );

if( game != null ) {
	// add the keys needed to activate high resolution mode
	talismanGame.masterSettings.addSettingsFrom( 'talisman/hd.settings' );
} else {
	Eons.log.warning( 'Talisman HD cannot find Talisman' );
}

// NOTE: to save space in the plug-in authoring kit, the high-res images in
// this plug-in have been lossily compressed a small amount. A true HD plug-in
// might instead use lossless JPEG2000 images for maximum image fidelity
// (convert to JPEG2000 with quality at 100%).
