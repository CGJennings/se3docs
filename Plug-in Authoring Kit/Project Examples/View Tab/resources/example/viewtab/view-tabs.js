//
// view-tabs.js
//
// A minimal example of adding a new ViewTab to the project view;
// also demonstrates how to create a new kind of TrackedRegistry.
//

useLibrary('project');

let tabRegistry = null;

function getName() {
    return 'View Tabs Example';
}

function getDescription() {
    return 'An example that adds a simple example ViewTab to projects';
}

function getVersion() {
    return 1.0;
}

function getPluginType() {
    return arkham.plugins.Plugin.INJECTED;
}

function unload() {
    unregisterAll();
}

function run() {
    if (tabRegistry == null) {
        // Creates a new tracked registry capable of (un)registering
        // new view tabs
        tabRegistry = new TrackedRegistry(
            function registerTab(vt) {
                ProjectView.registerViewTab(vt);
                println('Registered ' + vt.getLabel());
            },
            function unregisterTab(vt) {
                ProjectView.unregisterViewTab(vt);
                println('Unregistered ' + vt.getLabel());
            }
        );

        // Creates a new object that implements the ViewTab interface, which
        // we can then register
        let tab = new ViewTab {
            createViewForProject(projectView, project) {
                try {
                    let view = new swing.JLabel('Example View');
                    view.opaque = true;
                    view.background = Color.WHITE;
                    view.horizontalAlignment = swing.JLabel.CENTER;
                    return view;
                } catch (ex) {
                    Error.handleUncaught(ex);
                    throw ex;
                }
            },
            getLabel() {
                return 'Example';
            },
            getViewTabName() {
                return 'dummy-example';
            }
        };

        // Register our custom tab via our new TrackedRegistry
        tabRegistry.register(tab);
    }
}

testProjectScript();