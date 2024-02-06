useLibrary("extension");

function getName() {
    return "Rise of the Servitors";
}

function getDescription() {
    return "Adds Servitor cards";
}

function getVersion() {
    return 2.2;
}

// This function is called when the plug-in is first loaded. If it
// returns false, the plug-in will not be started.
function initialize() {
    // Is Arkham Horror installed?
    // If not, return false so that the plug-in is not installed;
    // otherwise, go ahead and load the settings and class map needed
    // for our component.
    const AH = Game.get("AH");
    if (AH == null) return false;

    AH.settings.addSettingsFrom("cgj/servitors/card-layout.settings");
    ClassMap.add("cgj/servitors/rots.classmap");
    return true;
}