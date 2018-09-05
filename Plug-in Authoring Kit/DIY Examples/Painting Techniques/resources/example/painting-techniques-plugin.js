useLibrary( 'extension' );

function getName() {
    return 'Painting Techniques Example';
}

function getDescription() {
    return 'Demonstrates various painting and filter effects';
}

function getVersion() {
    return 3;
}

// Add our example card to the New Component Dialog
ClassMap.add( 'example/painting-techniques.classmap' );