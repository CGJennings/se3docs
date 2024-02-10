useLibrary('project');
useLibrary('imageutils');
importPackage(java.util.jar);
importClass(java.io.FileOutputStream);


//
// Basic plug-in functions
//

function getName() {
    return 'Zip Tools';
}

function getDescription() {
    return 'Compresses and decompresses Zip archives in a project';
}

function getVersion() {
    return 1.0;
}

function getPluginType() {
    // Injected plug-ins can be loaded and unloaded while the
    // app runs, but unlike ACTIVATED plug-ins they don't appear
    // in the Toolbox menu.
    return arkham.plugins.Plugin.INJECTED;
}

// Called when the plug-in is loaded
function run() {
    install();
}

// Called when the plug-in is unloaded
function unload() {
    unregisterAll();
}





//
// Project system extensions
//

// Called when the plug-in is initialized to install the project extensions.
function install() {
    ActionRegistry.register(createAction(), Actions.PRIORITY_STANDARD_LAST);
    OpenerRegistry.register(createOpener());
    MetadataRegistry.register(createMetadataSource());
}


// Creates a test button during development that calls unload() to clean up.
testProjectScript();


// An InternalOpener is a class provided by the Open TaskAction.
// Open is responsible for opening files in a project (see below for a
// custom task action). The InternalOpener class is provided so that you
// can extend Open with the ability to open new file types. In this case,
// we will add a new opener for zip files that "opens" them by extracting
// their contents.
function createOpener() {
    // this is a helper function used by our opener; it converts
    // a Zip archive path to the format used by the local file system
    const localizePath = function localizePath(path) {
        if (path.endsWith('/')) path = path.substring(0, path.length() - 1);
        return path.replace('/', File.separator);
    };

    // create and return the opener implementation
    return new Open.InternalOpener() {
        // the opener can open files with the 'zip' extension
        appliesTo(file) {
            return ProjectUtilities.matchExtension(file, 'zip');
        },
        // this is what the opener will do to open a file when it applies
        open(file) {
            try {
                if (!confirm.yesno('Unpack ' + file.name + ' here?', 'Zip Archive')) {
                    return;
                }
                let parent = new File(file.parentFile, file.name.substring(0, file.name.length() - 4));
                parent = ProjectUtilities.getAvailableFile(parent);
                parent.mkdirs();
                if (!parent.isDirectory()) {
                    alert('Unable to create folder for unpacking', true);
                    return;
                }

                let inStream;
                let zip = new JarFile(file);
                try {
                    let entries = zip.entries();
                    while (entries.hasMoreElements()) {
                        let entry = entries.nextElement();
                        let name = entry.name;
                        let ofile = new File(parent, localizePath(name));
                        if (name.endsWith('/')) {
                            ofile.mkdirs();
                        } else {
                            if (!ofile.parentFile.exists()) {
                                ofile.parentFile.mkdirs();
                            }
                            inStream = zip.getInputStream(entry);
                            ProjectUtilities.copyStream(inStream, ofile);
                            inStream.close();
                            inStream = null;
                        }
                    }
                } finally {
                    if (inStream) inStream.close();
                    zip.close();
                }
                let project = Eons.getOpenProject();
                if (project != null) {
                    let parentMember = project.findMember(file.parentFile);
                    // update the tree view for the parent folder
                    // immediately so the user doesn't have to wait for
                    // the new files to be discovered
                    if (parentMember != null) {
                        parentMember.synchronize();
                    }
                }
            } catch (ex) {
                error.handleUncaught(ex);
            }
        }
    };
}

// A TaskAction is a command that can be performed within a project.
// (The selection of available project commands depends on the type of
// task folder you are currently working in, along with other factors.
// Hence the name TaskAction.) This method creates a new TaskAction
// that creates a .zip archive from the selected files.
function createAction() {
    // We need to create a temporary object and then use JavaAdapter because
    // we are overriding a method in a concrete class, not implementing
    // an interface.	
    let zipAction = {
        getLabel() {
            return 'Compress';
        },
        getActionName() {
            return 'zipcompress';
        },
        appliesToSelection(members) {
            // Don't show the command if exactly 1 zip file is selected
            if (members.length == 1 && !members[0].isFolder() && ProjectUtils.matchExtension(members[0], 'zip')) {
                return false;
            }
            // Otherwise, call the superclass implementation to check
            // individual files.
            return this.super$appliesToSelection(members);
        },
        appliesTo(project, task, member) {
            // Don't show command if only the project is selected
            return task != null || member != null;
        },
        performOnSelection(members) {
            members = ProjectUtilities.merge(members);
            if (members.length == 0) return;

            let parent = members[0].parent;
            for (let i = 1; i < members.length; ++i) {
                if (members[i].parent != parent) {
                    parent = null;
                    break;
                }
            }
            if (parent == null) {
                parent = members[0].project;
            }

            // copy selected members into archive
            let zipFile = new File(parent.file, 'Archive.zip');
            zipFile = ProjectUtilities.getAvailableFile(zipFile);

            let archive = ProjectUtilities.createPluginBundleArchive(zipFile, false);
            try {
                for (let i = 0; i < members.length; ++i) {
                    ProjectUtilities.copyToArchive(
                        archive, members[i].file, '', true, true, true
                    );
                }
            } finally {
                archive.close();
            }

            // Update the contents of the folder immediately so the
            // new archive is discovered before we try to rename it below.
            // (The archive file won't become a member of the project until
            // it is discovered as a new file. This will happen automatically
            // eventually, but we need to do it right away or else the
            // call to findChild would not find the file.)
            parent.synchronize();
            // Offer to rename the new archive
            Actions.getUnspecializedAction('rename').performOnSelection(
                [parent.findChild(zipFile)]
            );
        },
        perform(project, task, member) {
            // We override performOnSelection, which by default will call this
            // with individual members. We put a dummy implementation here
            // just in case someone wants to use our action and calls this
            // directly.
            this.perform([this.resolveTarget(project, task, member)]);
        }
    };
    return new JavaAdapter(TaskAction, zipAction);
}

// A MetadataSource is an object that provides metadata
// about a type of project member, such as its icon and a description.
// It can also extend the "Properties" tab in the project view
// with new kinds of information specific to the file type.
function createMetadataSource() {
    let zipIcon = ImageUtils.getIcon('cgj/zip-tools.png');
    let zipMetadata = {
        appliesTo(member) {
            return ProjectUtilities.matchExtension(member, 'zip');
        },
        getIcon(member) {
            return zipIcon;
        },
        getDescription(member) {
            return 'Zip archive';
        },
        fillInMetadataImpl(member, consumer) {
            // This bit of voodoo is how you access a superclass method
            // from script code that implements a Java class.
            // In this case, it fills in the basic metadata common to all
            // files (name, type, size, modification time).
            this.super$fillInMetadataImpl(member, consumer);

            let zip = null;
            try {
                zip = new JarFile(member.file);
                let fileCount = 0;
                let uncompressedSize = 0;
                let entries = zip.entries();
                while (entries.hasMoreElements()) {
                    let entry = entries.nextElement();
                    // Skip folder entries in the archive
                    if (!entry.name.endsWith('/')) {
                        ++fileCount;
                        let size = entry.size;
                        if (size < 0) uncompressedSize = -1;
                        if (uncompressedSize >= 0) uncompressedSize += size;
                    }
                }

                consumer.addProperty(
                    member, 'Files', sprintf('%.0f', fileCount)
                );

                if (uncompressedSize >= 0) {
                    consumer.addProperty(
                        member, 'Uncompressed Size',
                        ProjectUtilities.formatByteSize(uncompressedSize)
                    );
                }
            } catch (ex) {
                // ignore errors while getting metadata
                Eons.log.warning('zip error while reading metadata: ' + member.file);
            } finally {
                if (zip != null) zip.close();
            }
        }
    };
    return new JavaAdapter(MetadataSource, zipMetadata);
}