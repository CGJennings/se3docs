//
// psd-extractor.js
//
// A plug-in that extracts the individual layers from a PSD
// (Photoshop) file and saves them to separate files.
//

useLibrary('project');
useLibrary('imageutils');

importClass(java.io.File);
importClass(ca.cgjennings.imageio.PSDImageReader);

const PSD = new java.lang.String('psd');
const ICON = ImageUtils.getIcon('cgj/psd-extractor.png');

function getName() {
    return 'PSD Layer Extractor';
}

function getDescription() {
    return 'Extracts layers from a PSD project file';
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
    let psdAction = {
        getLabel: function getLabel() {
            return 'Extract Layers';
        },
        getActionName: function getActionName() {
            return 'psd-extractor';
        },
        getIcon: function getIcon() {
            return ICON;
        },
        appliesTo: function appliesTo(project, task, member) {
            return !member.isFolder() && ProjectUtilities.matchExtension(member, PSD);
        },
        perform: function perform(project, task, member) {
            try {
                let psd = new PSDImageReader(member.file);
                let parent = member.file.parent;
                let name = ProjectUtilities.changeExtension(member.file, null).name;
                for (let i = 0; i < psd.layerCount; ++i) {
                    let layer = psd.getLayer(i);
                    let out = new File(parent, name + '-layer-' + i + '.png');
                    ImageUtils.write(layer.image, out, ImageUtils.FORMAT_PNG);
                }
            } catch (ex) {
                arkham.dialog.ErrorDialog.displayError('Failed to extract layers\n' + ex, null);
            }
        }
    };
    // Create and return a Java object that subclasses TaskAction using
    // the script object psdAction:
    return new JavaAdapter(TaskAction, psdAction);
}