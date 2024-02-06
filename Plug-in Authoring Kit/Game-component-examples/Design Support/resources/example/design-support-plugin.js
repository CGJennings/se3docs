useLibrary('extension');

function getName() {
    return 'Design Support Example';
}

function getDescription() {
    return 'Add design supports to DIY components';
}

function getVersion() {
    return 1.0;
}

// Add our example card to the New Component Dialog
ClassMap.add('example/design-support.classmap');