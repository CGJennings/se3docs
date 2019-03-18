/*
 * busy-window.js - version 1
 *
 * Demonstrates the use of Thread.busyWindow.
 */

useLibrary( 'threads' );

/*
  Thread.busyWindow allows you to perform a long-running
  task while providing feedback to the user on the current
  progress. To use Thread.busyWindow, you pass a function
  to it that performs the desired task. By default, an
  'indeterminate' progress bar and default message will be
  displayed:
*/

function task1() {
	// simulate doing a lot of work
	sleep( 1500 );
}

Thread.busyWindow( task1 );



/*
  A 'callback' object is passed to your task function.
  This object has several write-only properties that
  give you more control over the window that appears.

  The currentProgress and maximumProgress values allow
  you to provide feedback on the progress being made.
*/

function task2( callback ) {
	callback.maximumProgress = 15;
	for( let i=0; i<=15; ++i ) {
		callback.currentProgress = i;
		sleep( 100 );
	}
}

Thread.busyWindow( task2, 'Making Progress...' );



/*
  You can also update the title and display a status message
  using the callback.
*/

function task3( callback ) {
	callback.maximumProgress = 100;
	for( let i=0; i<=100; ++i ) {
		if( i == 50 ) {
			callback.title = 'Phase II';
		}
		callback.currentProgress = i;
		callback.status = 'Step ' + i, 100;
		sleep( 50 );
	}
}

Thread.busyWindow( task3, 'Phase I' );



/*
  Finally, if you call busyWindow with a value of true
  for the third parameter, then the window will have a
  Cancel button. To check if the user has cancelled
  the operation, use the callback object's cancelled
  property. If it is true, the operation has been cancelled
  and you should stop the operation at the earliest
  opportunity.
*/
 
function task4( callback ) {
	callback.maximumProgress = 1000;
	for( let i=0; i<=1000; ++i ) {
		// quit if the user presses Cancel
		if( callback.cancelled ) return;
		callback.currentProgress = i;
		sleep( 10 );
	}
}

Thread.busyWindow( task4, 'Lengthy Task...', true );


/*
  Note: Keep in mind that the task is run outside of the
  event dispatch thread. If you want to update any user
  interface features from the task thread, you *must* use
  invokeLater or invokeAndWait.
*/