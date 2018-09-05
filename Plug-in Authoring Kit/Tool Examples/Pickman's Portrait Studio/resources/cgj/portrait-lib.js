//
// portrait-lib.js
// A helper library that provides support for getting and
// setting portrait images.
//

const Portraits = {};

useLibrary( 'imageutils' );
importClass( arkham.component.PortraitProvider );
importClass( arkham.component.Portrait );

/**
 * Portraits.getProvider( [gc] )
 * Returns the current game component if it has any portraits.
 * Otherwise, returns null.
 */
Portraits.getProvider = function getProvider( gc ) {
	if( gc === undefined ) gc = Component;
	return ((gc instanceof PortraitProvider) && gc.portraitCount > 0) ? gc : null;
};



/**
 * Portraits.listSettablePortraits( [gc] )
 * Returns an array of the indices of the portraits in a game component that
 * can have a new image set.
 */
Portraits.listSettablePortraits = function listSettablePortraits( gc ) {
	var settable = [];
	gc = Portraits.getProvider( gc );
	if( gc != null ) {
		for( let i=0; i<gc.portraitCount; ++i ) {
			if( gc.getPortrait(i).features.contains( Portrait.Feature.SOURCE ) ) {
				settable[ settable.length ] = i;
			}
		}
	}
	return settable;
};



/**
 * Portraits.getPortrait( gc, index )
 * Returns the portrait image from component gc at the specified portrait index.
 */
Portraits.getPortrait = function getPortrait( gc, index ) {
	try {
		return gc.getPortrait( index ).image;
	} catch( ex ) {
		return null;
	}
};



/**
 * Portraits.setPortrait( gc, index, image, [keepLayout] )
 * Updates the portrait image from component gc at the specified portrait index.
 */
Portraits.setPortrait = function setPortrait( editor, index, image, keepLayout ) {
	gc = Portraits.getProvider( editor.gameComponent );
	if( gc == null ) return;

	waitCursor( true );
	try {
		var port = gc.getPortrait( index );
		var dx = port.panX;
		var dy = port.panY;
		var scale = port.scale;
		var theta = port.rotation;

		var temp = File.createTempFile( 'pickman', '.png' );
		ImageUtils.write( image, temp, ImageUtils.FORMAT_PNG );
		gc.getPortrait( index ).setSource( temp.absolutePath );

		if( keepLayout ) {
			port.panX = dx;
			port.panY = dy;
			port.scale = scale;
			port.rotation = theta;
		}

		editor.populateFieldsFromComponent();
		if( !temp['delete()']() ) {
			temp.deleteOnExit();
		}
	} finally {
		waitCursor( false );
	}
};
