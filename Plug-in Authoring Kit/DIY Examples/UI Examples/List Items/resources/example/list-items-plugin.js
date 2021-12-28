useLibrary('extension');

function getName() {
    return 'List Items Example';
}

function getDescription() {
    return 'Control list items in DIY components';
}

function getVersion() {
    return 1.0;
}

// Add our example card to the New Component Dialog
ClassMap.add('example/list-items.classmap');