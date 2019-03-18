/*
 * ui-listeners.js - version 1
 *
 * This simple example shows how listeners can be
 * used to make an interface more responsive, by
 * making one interface control react to the state
 * of another.
 */
 
useLibrary( 'ui' );

let c1, c2, panel;
c1 = checkBox( 'Check box', true, function listener( actionEvent ) {
	try {
		// disable the second check box if the first check box
		// is not selected (checked)
		c2.enabled = c1.selected;
	} catch( ex ) {
		Error.handleUncaught( ex );
	}
});
c2 = checkBox( 'Dependent check box' );

panel = new Stack();
panel.add( c1, c2 );
panel.createDialog( 'Test', '' ).showDialog();

//
// A less compact way of adding the listener function would be:
//
// c1 = checkBox( 'Check box', true );
// c2 = checkBox( 'Dependent check box' );
//
// function c1ActionListener( actionEvent ) {
//     try {
//         c2.enabled = c1.selected;
//     } catch( ex ) {
//         Error.handleUncaught( ex );
//     }
// };
//
// c1.addActionListener( c1ActionListener );
//
// Not all components use ActionListeners, but
// Buttons, radio buttons, and check box buttons all do.
// For other types of controls you may need other types
// of listener. A good quick reference for most kinds
// of control is the source of the uibindings library:
//
// scriptdoc:uibindings/source
//
// For more information on other control types and the
// listeners they support, start here:
//
// javadoc:javax/swing/package-summary
// 
// By the way, an even friendlier interface would remember
// whether c2 was checked when c1 is unchecked, and then
// uncheck (or check) c2. Then when c1 is checked again,
// it would restore the user's previous selection for c2.
//