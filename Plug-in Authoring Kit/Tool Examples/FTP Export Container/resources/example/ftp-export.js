//
// ftp-export.js
//
// An example plug-in that adds support for exporting
// game components to an FTP server instead of to local
// files.
//
// To add a new method of exporting component images, you
// create an object that implements the ExportContainer
// interface, and then register it using
// Eons.registerExportContainer.  
//
// Note: Because the example uses FTP URLs to implement
// file uploads, the support provided is very basic; for
// example, the user must know the remote directory that
// they wish to upload to instead of browsing for one.
// This could be improved by using a third party library
// such as Apache Commons Net for a more robust FTP API.
//

useLibrary('uilayout');
importClass(java.lang.UnsupportedOperationException);
importClass(java.lang.IllegalStateException);

// A unique identifier for the export container type:
// this can be used to look up this exporter and use it to
// export any arbitrary set of files.
const CONTAINER_ID = 'basic-ftp';



function getName() {
    return 'Export to FTP Server';
}

function getDescription() {
    return 'Export images to an FTP server';
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
    // If the container is already registered, unregister the existing
    // version first.
    if (findRegisteredContainer(CONTAINER_ID) != null) {
        unload();
    }
    // Create and register the container
    let ec = createExportContainer();
    Eons.registerExportContainer(ec);
}

function unload() {
    // Unregister our export container if it is registered
    let ec = findRegisteredContainer(CONTAINER_ID);
    if (ec != null) {
        Eons.unregisterExportContainer(ec);
    }
}





/**
 * If the export container with the given ID is already registered,
 * returns the registered instance. Otherwise, returns null.
 */
function findRegisteredContainer(id) {
    let containers = Eons.registeredExportContainers;
    for (let i = 0; i < containers.length; ++i) {
        if (id == containers[i].identifier) return containers[i];
    }
    return null;
}





/**
 * Create and return an object that implements the ExportContainer
 * interface and exports files via FTP.
 */
function createExportContainer() {
    let ec = {
        // this is an object that stores the information needed to
        // manage the current export session; see showExportDialog()
        session: null,

        // returns the text used to describe the container to the user
        toString() {
            return 'FTP server';
        },

        // returns a unique internal identifier for the container type
        getIdentifier() {
            return CONTAINER_ID;
        },

        // returns true if the container has extra options that can be
        // configured in a separate dialog
        isConfigurable() {
            return false;
        },

        // if the container was configurable, this would be called to
        // display the configuration dialog
        configure() {
            throw new UnsupportedOperationException();
        },

        // a sanity check: checks if a session is active; if not throws an error
        checkOpen() {
            if (this.session == null) {
                throw new IllegalStateException('no session is active');
            }
        },

        // a sanity check: checks if a session is active; if so throws an error
        checkClosed() {
            if (this.session != null) {
                throw new IllegalStateException('a previous session is still active');
            }
        },

        // this is called when the user is about to begin exporting files;
        // we show a dialog that fills in the session property with the
        // information we need to connect to the FTP server
        selectLocation(baseName, componentHint) {
            this.checkClosed();
            this.session = showSessionDialog();
            // we need to return a boolean indicating whether to continue;
            // if the user cancels the session dialog, this.session will be
            // null and we will return false
            return this.session != null;
        },

        // for container types that use the local file system, this can be
        // used to set the destination programmatically
        setLocation(file) {
            throw new UnsupportedOperationException();
        },

        // called at the start of an export; for this container there is
        // nothing to do since the destination (the FTP server) already exists
        createContainer() {
            this.checkOpen();
        },

        // called when a new file is about to exported as part of the export
        // operation; it must return an java.io.OutputStream, which the exported
        // file will be written to
        addEntry(fileName) {
            this.checkOpen();
            let url = this.createURL(fileName);
            return url.openConnection().outputStream;
        },

        // this is called at the end of an export session when everything has
        // gone smoothly; if display is true, the user has requested that
        // the exported files be "displayed" (what this does is up to the
        // container type)
        closeContainer(display) {
            this.checkOpen();
            this.session = null;
        },

        // this is called instead of closeContainer when an error occurs
        // during export; ideally we would delete any files that we created
        // on the server, but we can't do that using FTP URLs, we'd need a more
        // advanced FTP API
        destroyContainer() {
            this.checkOpen();
            this.session = null;
        },

        // this can be called to obtain a hint as to whether files of
        // certain type are fully supported by the container; we can
        // write any kind of file to the FTP server, so this simply
        // returns true
        isFileFormatSupported(ext) {
            return true;
        },

        // creates a URL that can be used to upload a file using the
        // current FTP session parameters
        createURL(fileName) {
            let s = this.session;
            let url = 'ftp://';
            // add login credentials for non-anonymous access
            if (s.user != null) {
                url += encodeURIComponent(s.user) + ':' + encodeURIComponent(s.pass) + '@';
            }
            url += encodeURI(s.host) + ':' + s.port + this.encodePath(s.dir + fileName) + ';type=i';
            return new URL(url);
        },

        // a helper function that splits a path on '/' and
        // encodes each segment individually		
        encodePath: function encodePath(path) {
            let encoded = '';
            let segments = path.split('/');
            for (let i = 0; i < segments.length; ++i) {
                if (i > 0) encoded += '/';
                encoded += encodeURIComponent(segments[i]);
            }
            return encoded;
        }
    };
    // Create a Java object that implements the ExportContainer interface
    // using the functions defined in our script object (ec)
    return new arkham.ExportContainer(ec);
}




/**
 * Shows a dialog that can be used to configure an FTP session.
 * Returns null if the user cancels the dialog, or else returns
 * an object with the following properties:
 * host : the FTP server host name
 * port : the port (default is 21)
 * dir : the remote working directory
 * user : the login name (null for anonymous FTP)
 * pass : the login password
 */
function showSessionDialog() {
    let session = {};
    let s = PluginContext.settings;

    let dir = new swing.JTextField(s.get('dir', '/'), 25);

    let host = new swing.JTextField(s.get('host', ''), 20);
    let port = new swing.JTextField(4);
    port.horizontalAlignment = swing.JTextField.TRAILING;
    port.document = ca.cgjennings.ui.FilteredDocument.createDigitDocument();
    port.text = s.get('port', '21');

    let loginPanel = new TypeGrid();
    let user = new swing.JTextField(s.get('user', ''), 15);
    let pw = s.get('pass');
    if (pw) pw = resources.RawSettings.unobfuscate(pw);
    let pass = new swing.JPasswordField(pw, 15);
    pass.echoChar = '\u2022';
    loginPanel.place(
        'User', 'br', user, 'tab',
        'Password', 'br', pass, 'tab'
    );
    loginPanel = loginPanel.realize();

    let anon = new swing.JCheckBox('Use anonymous FTP');
    anon.addActionListener(function anonActionPerformed() {
        ca.cgjennings.ui.JUtilities.enableTree(loginPanel, !anon.selected);
    });
    // if the settings indicate anonymous access is preferred,
    // simulate clicking the box so that the action listener is called
    if (s.getYesNo('anonymous')) {
        anon.doClick(0);
    }

    let hostPanel = new TypeGrid();
    hostPanel.place(
        'Host', '', host, 'tab hfill', 'Port', '', port, '',
        anon, 'p',
        ' ', 'br', loginPanel, ''
    );
    hostPanel.title = 'FTP Server';

    let destPanel = new TypeGrid();
    destPanel.place(
        'Server folder where files will be stored:', '',
        dir, 'br hfill'
    );
    destPanel.title = 'Destination';

    let layout = new Stack();
    layout.add(hostPanel, destPanel);

    let dlg = layout.createDialog(getName(), 'Upload', null, null, true);
    if (dlg.showDialog() < 1) return null;

    useSettings(s);
    $dir = dir.text;
    $host = host.text;
    $port = port.text;
    $anonymous = anon.selected ? 'yes' : 'no';
    $user = user.text;
    $pass = resources.RawSettings.obfuscate(pass.text);

    // Fill in the session object used by the export container:

    // Format the directory name as expected by createURL,
    // so that it has an initial '/', and a trailing '/'
    // if non-empty.
    dir = $dir;
    if (!dir.startsWith('/')) dir = '/' + dir;
    if (dir.length > 1 && !dir.endsWith('/')) dir = dir + '/';
    session.dir = dir;

    session.host = $host;
    session.port = $port;
    if (anon.selected) {
        session.user = null;
        session.pass = null;
    } else {
        session.user = $user;
        session.pass = pass.text;
    }
    return session;
}

if (sourcefile == 'Quickscript') {
    run();
}