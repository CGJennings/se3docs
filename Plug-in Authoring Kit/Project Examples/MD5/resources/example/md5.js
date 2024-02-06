//
// md5.js
//
// A simple plug-in that adds a new action (command) that computes the
// MD5 checksum for any file and prints it to the script console.
//

useLibrary('project');

function getName() {
    return 'MD5';
}

function getDescription() {
    return 'Calculate an MD5 checksum for any project file';
}

function getVersion() {
    return 1;
}

function getPluginType() {
    // Injected plug-ins can be loaded and unloaded while the
    // app runs, but unlike ACTIVATED plug-ins they don't appear
    // in the Toolbox menu.
    return arkham.plugins.Plugin.INJECTED;
}

function run() {
    ActionRegistry.register(createAction());
}

function unload() {
    unregisterAll();
}

// Creates a test button during development that calls unload() to clean up.
testProjectScript();

// Creates a TaskAction for the new command.
function createAction() {
    // We need to create a temporary object and then use JavaAdapter because
    // we are overriding a method in a concrete class, not implementing
    // an interface.	
    let md5Action = {
        getLabel() {
            return 'Print MD5 Checksum';
        },
        getActionName() {
            return 'md5';
        },
        appliesTo(project, task, member) {
            // Only files can have a checksum, not folders:
            // since projects and tasks are both kinds of folder, member
            // must be non-null and not a folder.
            return member != null && !member.isFolder();
        },
        perform(project, task, member) {
            let md5 = arkham.plugins.catalog.MD5Checksum.forFile(member.file);
            printf('%s: %s\n', member.name, md5.checksumString);
        }
    };
    // Create and return a Java object that subclasses TaskAction using
    // the script object md5Action:
    return new JavaAdapter(TaskAction, md5Action);
}