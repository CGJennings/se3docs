useLibrary( 'extension' );

function getName() {
    return 'Scrollable Tab Example';
}

function getDescription() {
    return 'Demonstrates the use of scrollable editor tabs';
}

function getVersion() {
    return 1;
}

// Add our example card to the New Component Dialog
ClassMap.add( 'example/scrollable-tab.classmap' );