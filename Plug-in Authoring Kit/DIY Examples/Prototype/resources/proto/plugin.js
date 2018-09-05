useLibrary( 'extension' );

function getName() {
	return 'Prototype';
}

function getDescription() {
	return 'Simple card layouts for prototyping';
}

function getVersion() {
	return 1.0;
}

Language.game.addStrings( 'proto/game.properties' );
Settings.shared.addSettingsFrom( 'proto/layout.settings' );
ResourceKit.registerFont( 'proto/Unkempt-Regular.ttf' );
ClassMap.add( 'proto/proto.classmap' );