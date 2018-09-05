//
// PNGPack.js
//
// A simple plug-in that adds a new action (command) that repacks PNG
// files in any project folder.
//

useLibrary( 'project' );
useLibrary( 'imageutils' );
useLibrary( 'uilayout' );

function getName() {
    return 'PNG Packer';
}

function getDescription() {
    return 'Repack PNG files in project folders to reduce file size';
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
	ActionRegistry.register( createAction(), Actions.PRIORITY_IMPORT_EXPORT );
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
	var pngAction = {
		getLabel: function getLabel() {
			return 'Pack PNG Images';
		},
		getActionName: function getActionName() {
			return 'pngpack';
		},
		appliesTo: function appliesTo( project, task, member ) {
			member = ProjectUtilities.simplify( project, task, member );
			if( member.isFolder() ) {
				var kids = member.getChildren();
				for( var i=0; i<kids.length; ++i ) {
					if( ProjectUtilities.matchExtension( kids[i], 'png' ) ) {
						return true;
					}
				}
			}
			return false;
		},
		perform: function perform( project, task, member ) {
			member = ProjectUtilities.simplify( project, task, member );
			Eons.setWaitCursor( true );
			try {
				this.performImpl( member );
			} catch( ex ) {
				Error.handleUncaught( ex );
			} finally {
				Eons.setWaitCursor( false );
			}
		},
		performImpl: function performImpl( member ) {
			var packed = 0;
			var skipped = 0;
			var inSize = 0;
			var outSize = 0;
			var kids = member.getChildren();
			for( var i=0; i<kids.length; ++i ) {
				if( ProjectUtilities.matchExtension( kids[i], 'png' ) ) {
					var file = kids[i].file;
					// if the length can't be obtained, we can't tell if the
					// file is smaller after repack
					var inLength = file.length();
					if( inLength < 1 ) {
						++skipped;
						continue;
					}
					// read the image, then write it back into a byte buffer
					// so we can examine the repacked size
					inSize += inLength;
					try {
						var bi = ImageUtils.read( file );
						var buff = new java.io.ByteArrayOutputStream( inLength );
						// write the image without extra metadata
						javax.imageio.ImageIO.write( bi, 'png', buff );
						if( buff.size() < inLength ) {
							// rename the original file to a backup file name
							// in case there is an error
							var backup = new java.io.File( file.parentFile, 'backup_' + file.name );
							backup = ProjectUtilities.getAvailableFile( backup );
							if( !file.renameTo( backup ) ) {
								alert( 'Failed to backup original: ' + kids[i], true );
								continue;
							}
							ProjectUtilities.copyStream(
								new java.io.ByteArrayInputStream( buff.toByteArray() ),
								file
							);
							// everything is OK: delete the original
							backup['delete']();
							++packed;
							outSize += buff.size();
						} else {
							++skipped;
							outSize += inLength;
						}
					} catch( ex ) {
						alert( 'Error while processing ' + kids[i], true );
					}
				}
			}
			// in case there are lingering backups
			member.synchronize();
			showSummary( packed, skipped, inSize, outSize );
		}		
	};
	// Create and return a Java object that subclasses TaskAction using
	// the script object pngAction:
	return new JavaAdapter( TaskAction, pngAction );
}

function showSummary( packed, skipped, inSize, outSize ) {
	var panel = new TypeGrid();
	panel.place(
		'<html><b>PNG Packer Summary', '',
		'Repacked images:', 'p',	sprintf( '%.0f', packed ), 'tab',
		'Skipped images:', 'br',	sprintf( '%.0f  (repacked image was not smaller)', skipped ), 'tab',
		'Original size:', 'br',		ProjectUtilities.formatByteSize( inSize ), 'tab',
		'New size:', 'br',			ProjectUtilities.formatByteSize( outSize ), 'tab',
		'Ratio:', 'br',				sprintf( '%.1f%%', outSize/inSize * 100 ), 'tab'
	);
	panel.createDialog( 'PNG Packer', '', @close ).showDialog();
}