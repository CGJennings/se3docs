/*
   export-all.js

   This is an example of an automation script based on the skeleton
   code that is provided when you choose New|Automation Script in
   a project. It creates 300 ppi images for every game component
   stored in the same project folder as the script.
 
   NOTE:
   To use this as an automation script (i.e. it runs automatically
   instead of opening in an editor when double-clicked), rename
   the file to use the .ajs extension instead of .js
*/

useLibrary( 'imageutils' );
importClass( java.io.File );
importPackage( arkham.project );



// The resolution (in pixels per inch) of the exported images
const RESOLUTION = 300;
// The extension of the image file format to use, e.g., png, jpg
const FORMAT = ImageUtils.FORMAT_PNG;


// track the number of files converted so we know if we should tell
// the user that there were no components
let exports = 0;

// for everything in the same folder as this script...
//    that matches the '.eon' extension...
//       call the exportMember function
forAll( member.parent, matchesExtension( exportMember, 'eon' ) );
if( exports == 0 ) {
	alert( 'There are no .eon files to export in this folder', true );
}

function exportMember( m ) {
	try {
        // count the number of export attempts
		++exports;
		
		// load the game component
		let gc = ResourceKit.getGameComponentFromFile( m.file, false );
		if( gc == null ) throw new Error();

		// create the sheets that will paint the faces of the component
		let sheets = gc.createDefaultSheets();
		if( sheets == null ) return;
		
		// for each sheet, paint it at the resolution set at the top of the script
		// and save it to a file
		for( let i=0; i<sheets.length; ++i ) {
			let bi = sheets[i].paint( arkham.sheet.RenderTarget.EXPORT, RESOLUTION );
			let file = new File( m.parent.file, m + '-' + (i+1) + '.' + FORMAT );
			ImageUtils.write( bi, file, FORMAT, -1, false, RESOLUTION );
		}
	} catch( ex ) {
		println( 'Error while opening ' + m.name + ', skipping file' );
		Error.handleUncaught( ex );
	}
}




////////////////////////////////////////////////////////////////////////////
// THESE FUNCTIONS ARE FROM THE SKELETON CODE FOR NEW AUTOMATION SCRIPTS: //
////////////////////////////////////////////////////////////////////////////

/*
 * forAll( parent, somethingToDo )
 * Use this function to perform some action on each file in a folder.
 * You pass it the member object that is the parent of the files you want to
 * process, and a function that will be called to process each member.
 *
 * Example use:
 *     // print the file path of everything in the task or project where
 *     // this script is located
 *     forAll( task == null ? project : task, printFileName );
 */
function forAll( parent, somethingToDo ) {
	if( parent == null || !(parent instanceof Member)) {
		error( 'missing parent, or parent is not a Member' );
	}
	if( !somethingToDo ) {
		error( 'missing somethingToDo' );
	}

	let i;
	let child;
	let children = parent.getChildren();

    for( i=0; i<children.length; ++i ) {
		child = children[i];
		if( child.isFolder() ) {
			forAll( child, somethingToDo );
		}
		somethingToDo( child );
	}
	// this tells the project system that some of the files in
	// parent may have changed without its knowing; it will look
	// for new or deleted files and update the project accordingly
	parent.synchronize();
}

/*
 * matchesExtension( somethingToDo, extension )
 * Only runs somethingToDo on members that are files with a file name
 * extension that matches extension. (For example, 'js' to match script files.)
 */
function matchesExtension( somethingToDo, extension ) {
	// converting the argument to a Java string explicitly
	// to save doing it implicitly for each file
	if( !(extension instanceof java.lang.String) ) {
		extension = new java.lang.String( extension.toString() );
	}
    return function extensionFilter( member ) {
		if( ProjectUtilities.matchExtension( member, extension ) ) {
			somethingToDo( member );
		}
	};
}