useLibrary( 'extension' );

function getName() {
	return 'Prefab Library Example';
}

function getDescription() {
	return 'Demo components created using the prefab library';
}

function getVersion() {
	return 1.0;
}

Settings.shared.addSettingsFrom( 'res:example/prefab.settings' );
ClassMap.add( 'example/prefab.classmap' );