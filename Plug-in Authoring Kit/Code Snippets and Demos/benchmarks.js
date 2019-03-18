/*
 * benchmarks.js - version 4
 *
 * This script runs some timed tests to gauge scripting
 * performance. It also tests and demonstrates some of the
 * new JavaScript 1.7 syntax that programmers may not be
 * familiar with.
 *
 * If you wish to compare performance at different optimization
 * levels, run this in Quickscript, then open preferences,
 * change the optimization level, and run it again. Note that
 * optimization levels 1 and 2 currently have the same effect 
 * (2 is reserved for possible future use).
 *
 * Note: depending on your system, running the tests may take
 * a minute or more to complete. If you are feeling impatient,
 * reduce the value of 'reps'. For more accurate results,
 * increase it. Alternatively, reduce the number of iterations
 * in each of the outermost loops by a factor of 10.
 */

importClass( java.lang.System );

/**
 * time( func )
 * Calls the function <tt>func</tt> with no arguments,
 * and returns the (approximate) number of nanoseconds
 * that the function took to execute.
 */
function time( func ) {
	let start = System.nanoTime();
	func();
	let stop = System.nanoTime();
	return stop-start;
}


// Each element in this array is a test function to be timed:
const TESTS = [

// use iteration to calc 99 factorial 10000 times
function iterative_factorial() {
	for( let r=0; r<10000; ++r ) {
		function fact( n ) {
			let prod = 2;
			for( let i=3; i<=n; ++i ) {
				prod *= i;
			}
		}
		fact( 99 );
	}
},

// use tail recursion to calc factorial
function recursive_factorial() {
	for( let r=0; r<10000; ++r ) {
		function fact( n ) {
			if( n == 2 ) return 2;
			return n * fact(n-1);
		}
		fact( 99 );
	}
},

// use yield to calc factorial
function generative_factorial() {
	for( let r=0; r<10000; ++r ) {
		function fact() {
			let prod = 1, i = 2;
			for( ;; ) {
				yield prod *= i++;
			}
		}
		let gen = fact();
		for( let i=0; i<99; ++i ) {
			gen.next();
		}
	}
},

// implement a Java interface 100 times and call each instance 1000 times
function interface_implementor() {
	for( let r=0; r<100; ++r ) {
		let listener = new java.awt.event.ActionListener() {
			actionPerformed: function() { 1+1; }
		};
		for( let c=0; c<1000; ++c ) {
			listener.actionPerformed(null);
		}
	}
},

// instantiate a JavaScript object with method 100 times and call each instance 1000 times
function function_caller() {
	for( let r=0; r<100; ++r ) {
		let listener = new Object()  {
			actionPerformed: function() { 1+1; }
		};
		for( let c=0; c<1000; ++c ) {
			listener.actionPerformed(null);
		}
	}
},

// evaluate an expression with common subexpressions 200000 times
// optimization level 1 should eliminate common property access subexpressions
function common_subexpression() {
	let x = new Object();
	x.property = 1;
	for( let i=0; i<200000; ++i ) {
		x.property = (x.property + x.property) + (x.property + x.property) + x.property
				+ (x.property + x.property) + (x.property + x.property) + x.property;
	}
},

// convert a number from a JavaScript object to a Java object and back 50000 times
function object_conversion() {
	let y = 0;
	for( let i=0; i<50000; ++i ) {
		let x = new java.lang.Integer(i&3);
		y += x;
	}
},

// swap two variables 500000 times using a temporary
function temp_swap() {
	let a = 1;
	let b = 2;
	for( let i=0; i<500000; ++i ) {
		let t = a;
		a = b;
		b = t;
	}
},

// swap two variables 500000 times using destructuring assignment
function destructuring_swap() {
	let a = 1;
	let b = 2;
	for( let i=0; i<500000; ++i ) {
		[b, a] = [a, b];
	}
},

// perform a string comparison 200000 times using JavaScript == operator
function native_compare() {
	let s = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
	let t = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX.';
	for( let i=0; i<200000; ++i ) {
		s == t;
	}
},

// perform a string comparison 200000 times using JavaScript method calls
function native_call() {
	let s = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
	let t = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX.';
	for( let i=0; i<200000; ++i ) {
		s.equals( t );
	}
},

// perform a string comparison 200000 times using Java String method calls
function java_call() {
	let s = new java.lang.String( 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' );
	let t = new java.lang.String( 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX.' );
	for( let i=0; i<200000; ++i ) {
		s.equals( t );
	}
},

// read, unpack, modify, and write back each pixel of a 300x300
// image using getRGB/setRGB; the lesson of this is that if you
// need to manipulate an image you should use an image filter,
// preferably compiled, unless the image is very small
function unaccel_image_manip() {
	let BI = java.awt.image.BufferedImage;
	let w = 300, h = 300;
	let im = new BI( w, h, BI.TYPE_INT_ARGB );
	for( let y=0; y<h; ++y ) {
		for( let x=0; x<w; ++x ) {
			// get the pixel at (x,y) and unpack it to separate
			// alpha, red, green, and blue components
			let argb = im.getRGB( x, y );
			let b = argb & 0xff;
			let g = (argb>>8) & 0xff;
			let r = (argb>>16) & 0xff;
			let a = (argb>>24) & 0xff;
			// invert the value of each component (0xff == 255)
			a = 0xff-a;
			r = 0xff-r;
			g = 0xff-g;
			b = 0xff-b;
			// repack the components into a single value and replace
			// the original image pixel
			argb = (a<<24)|(r<<16)|(g<<8)|b;
			im.setRGB( x, y, argb );
		}
	}
},

// solve an n-disk (currently 19) Tower of Hanoi puzzle

/////////////////////////////////
// CAUTION   CAUTION   CAUTION ///////////////////////////////////////
/////////////////////////////////                                   //
//                                                                  //
// Hanoi is an O(2^n) algorithm. It is easy to accidentally put in  //
// a number of disks that would require longer than the age of the  //
// universe to complete. Use caution and save your work.            //
//////////////////////////////////////////////////////////////////////

function hanoi_puzzle() {
	function move( from, to ) {
		// move a disk from tower "from" to tower "to"
	}

	// solve a size n tower with the initial goal of
	// moving all discs from tower "from" to tower "to",
	// using tower "by" as a temporary workspace	
	function hanoi( n, from, to, by ) {
		if( n == 1 ) {
			move( from, to );
		} else {
	        hanoi( n-1, from, by, to   );
	        hanoi(   1, from, to, by   );
	        hanoi( n-1, by  , to, from );			
		}
	}
	
	hanoi( 19, 1, 2, 3 );
}

]; // END OF THE ARRAY OF TEST FUNCTIONS

/**
 * runTests()
 * Repeatedly times each function in tests,
 * printing the name of each test and its best time.
 */
function runTests() {
	const REPS = 5;
	for( let t=0; t<TESTS.length; ++t ) {
		printf( '%25s  ', TESTS[t].name );
		let min = Number.MAX_VALUE;
		for( let r=0; r<REPS; ++r ) {
			let dur = time( TESTS[t] );
			min = Math.min( min, dur );
		}
		// shortest time is closest to theoretical best
		printf( '%.0f ms\n', min * 1e-6 );
		Console.flush();
	}
	printf( '%25s  \n', 'ALL TESTS COMPLETED' );
}

Console.clear();
Console.visible = true;

// Run in event thread:
// (this may give more accurate results but SE will freeze until
// the tests complete)

//runTests();

// OR

// Run in background thread:

useLibrary( 'threads' );
Thread.run( runTests );
