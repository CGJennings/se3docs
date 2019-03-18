//
// kdiff3.js
//
// An example that specializes an existing action:
// This will specialize the task action that compares files so
// that it uses KDiff3 (an external application) instead of the
// simple built-in diff dialog.
//

useLibrary( 'project' );

// setting key used to store the location of the KDiff3 binary
const EXE_KEY = 'kdiff3-exe';

function getName() {
    return 'KDiff3 Integration';
}

function getDescription() {
    return 'Replaces the built-in file comparison tool with KDiff3';
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

function run() {
	customAction = createAction();
	// there is no need to register the resulting action because
	// SpecializedActions are self-installing
}

function unload() {
	if( customAction ) {
		customAction.uninstall();
	}
}

let customAction;

// Creates a TaskAction for the new command.
function createAction() {
	// We need to create a temporary object and then use JavaAdapter because
	// we need to create an object that overrides a concrete class
	// (rather than implementing a method).
	let kd3Action = {
		appliesToSelection: function appliesToSelection( members ) {
			// unlike the built-in task action, KDiff3 can operate on
			// 2 *or* 3 files, and it also works on folders
			if( members.length < 2 || members.length > 3 ) return false;
			
			// we need to check that all of the files are the same type,
			// and that the type is either a text file or a folder
			let m0Type = fileType( members[0] );
			if( m0Type == INVALID ) return false;

			for( let i=1; i<members.length; ++i ) {
				if( fileType( members[i] ) != m0Type ) return false;
			}
			return true;
		},
		performOnSelection: function performOnSelection( members ) {
			if( this.appliesToSelection( members ) ) {
				try {
					kdiff3( members );
				} catch( ex ) {
					Error.handleUncaught( ex );
				}
			}
		}		
	};
	// create a Java object that subclasses SpecializedAction using
	// the script object kd3Action:
	let specialAction = new JavaAdapter( SpecializedAction, kd3Action );
	// install the action as a specialization of the existing file comparison action
	specialAction.install( 'comparefiles' );
	return specialAction;
}

// Attempts to run KDiff3 on the specified project members
function kdiff3( members ) {
	if( members.length < 2 || members.length > 3 ) {
		throw new Error( 'must specify 2 or 3 members' );
	}
	// build an array representing the command we want to run and its arguments
	let args = [ Settings.user.get( EXE_KEY, getDefaultBinaryLocation() ) ];
	for( let i=0; i<members.length; ++i ) {
		args[ args.length ] = members[i].file.absolutePath;
	}
	// try running the command; if the command can't be run, ask the user to
	// verify the location of the kdiff3 binary and try again
	try {
		java.lang.Runtime.getRuntime().exec( args );
	} catch( ex ) {
		let path = prompt( 'Please provide the full path to the KDiff3 binary:', getBinaryLocation() );
		if( path != null ) {
			Settings.user.set( EXE_KEY, path );
			kdiff3( members );
		}
	}
}

// Returns a default location for the kdiff3 command by platform
function getDefaultBinaryLocation() {
	if( ca.cgjennings.platform.PlatformSupport.PLATFORM_IS_WINDOWS ) {
		return java.lang.System.getenv( 'ProgramFiles' ) + '\\KDiff3\\kdiff3.exe';
	} else if( ca.cgjennings.platform.PlatformSupport.PLATFORM_IS_OSX ) {
		return '/Applications/kdiff3.app/Contents/MacOS/kdiff3';
	} else {
		return 'kdiff3';
	}
}






// file is not a type that can be compared
const INVALID = -1;
// file is a text file
const TEXT_FILE = 0;
// file is a folder
const FOLDER = 1;

// Identifies the basic type of a member. (Only text files and folders
// can be compared.)
function fileType( member ) {
	let type = INVALID;
	if( member.isFolder() ) {
		type = FOLDER;
	} else if( member.metadataSource.getDefaultCharset( member ) != null ) {
		// the above is a fancy way to determine if the member is
		// a text file format recognized by Strange Eons
		type = TEXT_FILE;
	}
	return type;
}






// Creates a test button during development that calls unload() to clean up.
testProjectScript();

