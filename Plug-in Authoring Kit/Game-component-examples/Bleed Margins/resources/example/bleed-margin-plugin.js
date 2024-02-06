useLibrary('extension');

function getName() {
    return 'Bleed Margin Example';
}

function getDescription() {
    return 'Include a bleed margin in a template design';
}

function getVersion() {
    return 1.0;
}

// Add the settings used to lay out the card
Settings.shared.addSettingsFrom('res:example/bleed-margin.settings');

// Add our example card to the New Component Dialog
ClassMap.add('example/bleed-margin.classmap');