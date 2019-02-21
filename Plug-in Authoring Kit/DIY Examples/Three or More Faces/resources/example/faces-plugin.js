useLibrary( 'extension' );

function getName() {
    return 'Three and Four Face Examples';
}

function getDescription() {
    return 'Demonstrates the CARD_AND_MARKER and FOUR_FACES face styles';
}

function getVersion() {
    return 1;
}

// Add our example cards to the New Component Dialog
ClassMap.add( 'example/faces.classmap' );