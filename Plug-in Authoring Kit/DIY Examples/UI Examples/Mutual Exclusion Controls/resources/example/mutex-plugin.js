useLibrary( 'extension' );

function getName() {
    return 'Mutual Exclusion Buttons Example';
}

function getDescription() {
    return 'Using radio, toggle, and cycle buttons in DIY components';
}

function getVersion() {
    return 1.0;
}

// Add our example card to the New Component Dialog
ClassMap.add( 'example/mutex.classmap' );