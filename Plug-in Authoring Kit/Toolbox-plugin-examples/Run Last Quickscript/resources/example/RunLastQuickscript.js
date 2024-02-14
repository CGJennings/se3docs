/*
 * RunLastQuickscript.js
 */


/**
 * Returns a short name for the plug-in. This will also be the label
 * of the plug-in's Toolbox menu item.
 */
function getName() {
	return 'Run Last Quickscript';
}


/**
 * Returns a brief description of the plug-in. This will also be the
 * popup tooltip used for the plug-in's Toolbox menu item.
 */
function getDescription() {
	return 'Reruns the most recently run Quckscript';
}


/**
 * Returns a version number for the plug-in.
 */
function getVersion() {
	return 1.0;
}

/**
 * Suggests assigning a shortcut of Ctrl+Shift+Q
 * (or Command+Shift+Q on macOS).
 */
function getDefaultAcceleratorKey() {
    return "menu shift Q";
}

/**
 * Called when the plug-in is activated by the user.
 * We get the last-run code, set a wait cursor, and then
 * run the code by calling execute.
 */
function run() {
    // the Quickscript dialog writes the current script
    // to this file just before running it
    const file = Eons.getUserStorageFile("quickscript");
    const code = arkham.project.ProjectUtilities.getFileText(file, "utf-8");    
    if (code == null) {
        println("Nothing to run");
        return;
    }

    Eons.setWaitCursor(true);
    try {
        execute(code);
    } finally {
        Eons.setWaitCursor(false);
    }
}

function execute(code) {
    // create a script engine with the "Quickscript" file name
    const monkey = new arkham.plugins.ScriptMonkey(string("qs-title"));
    // Quickscripts are run with a fake PluginContext for testing
    const context = arkham.plugins.PluginContextFactory.createDummyContext(0);
    monkey.bind(context);
    const result = monkey.eval(code);

    // print the value of the last expression like Quickscript does
    if (result != null) {
        print("⤷ ");
        println(result);
    }
}