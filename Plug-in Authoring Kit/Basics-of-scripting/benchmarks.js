/*
 * benchmarks.js - version 4
 *
 * The script runs a series of timed tests and prints the
 * results, to give you a sense of the performance of the
 * script engine. As a side effect it also demonstrates
 * various features of the language and script engine, so
 * it may be useful for programmers who are familiar with
 * other languages to get a quick overview of JavaScript.
 *
 * Note: depending on your system, these tests may take
 * from several seconds to several minutes to complete.
 */

importClass(java.lang.System);

/**
 * time( func )
 * Calls the function <tt>func</tt> with no arguments,
 * and returns the (approximate) number of nanoseconds
 * that the function took to execute.
 */
function time(func) {
    let start = System.nanoTime();
    func();
    let stop = System.nanoTime();
    return stop - start;
}


// Each element in this array is a test function to be timed:
const TESTS = [
    // use iteration to calc 99 factorial 10000 times
    function iterative_factorial() {
        for (let r = 0; r < 10000; ++r) {
            function fact(n) {
                let prod = 2;
                for (let i = 3; i <= n; ++i) {
                    prod *= i;
                }
            }
            fact(99);
        }
    },

    // use tail recursion to calc factorial
    function recursive_factorial() {
        for (let r = 0; r < 10000; ++r) {
            function fact(n) {
                if (n == 2) return 2;
                return n * fact(n - 1);
            }
            fact(99);
        }
    },

    // use yield to calc factorial
    function generative_factorial() {
        for (let r = 0; r < 10000; ++r) {
            function* fact() {
                let prod = 1,
                    i = 2;
                for (;;) {
                    yield prod *= i++;
                }
            }
            let gen = fact();
            for (let i = 0; i < 99; ++i) {
                gen.next();
            }
        }
    },

    // implement a Java interface 100 times and call each instance 1000 times
    function interface_implementor() {
        for (let r = 0; r < 100; ++r) {
            let listener = new java.awt.event.ActionListener() {
                actionPerformed: function() {
                    1 + 1;
                }
            };
            for (let c = 0; c < 1000; ++c) {
                listener.actionPerformed(null);
            }
        }
    },

    // instantiate a JavaScript object with method 100 times and call each instance 1000 times
    function function_caller() {
        for (let r = 0; r < 100; ++r) {
            let listener = new Object() {
                actionPerformed: function() {
                    1 + 1;
                }
            };
            for (let c = 0; c < 1000; ++c) {
                listener.actionPerformed(null);
            }
        }
    },

    // evaluate an expression with common subexpressions 200000 times
    // optimization level 1 should eliminate common property access subexpressions
    function common_subexpression() {
        let x = new Object();
        x.property = 1;
        for (let i = 0; i < 200000; ++i) {
            x.property = (x.property + x.property) + (x.property + x.property) + x.property
            + (x.property + x.property) + (x.property + x.property) + x.property;
        }
    },

    // convert a number from a JavaScript object to a Java object and back 50000 times
    function java_object_conversion() {
        let y = 0;
        for (let i = 0; i < 50000; ++i) {
            let x = new java.lang.Integer(i & 3);
            y += x;
        }
    },

    // convert a JS number to a JS string and back 50000 times
    function js_object_conversion() {
        let y = 0;
        for (let i = 0; i < 50000; ++i) {
            let s = String(y);
            y = Number(s) + i;
        }
    },

    // swap two variables 500000 times using a temporary
    function temp_swap() {
        let a = 1;
        let b = 2;
        for (let i = 0; i < 500000; ++i) {
            let t = a;
            a = b;
            b = t;
        }
    },

    // swap two variables 500000 times using destructuring assignment
    function destructuring_swap() {
        let a = 1;
        let b = 2;
        for (let i = 0; i < 500000; ++i) {
            [b, a] = [a, b];
        }
    },

    // create an object 500000 times by explicitly setting property name from variable
    function longhand_props() {
        let prop = 7;
        for (let i = 0; i < 500000; ++i) {
            let obj = { prop: prop };
        }
    },

    // create an object 500000 times using shorthand properties
    function shorthand_props() {
        let prop = 7;
        for (let i = 0; i < 500000; ++i) {
            let obj = { prop };
        }
    },

    // calls a function that creates and returns a function 500000 times
    function function_creation() {
        let make = function () {
            return function (a) { return a + 1; }
        }
        for (let i=0; i < 500000; ++i) {
            let f = make();
            f(2);
        }        
    },

    // calls a function that creates and returns an arrow function 500000 times
    function lambda_creation() {
        let make = function () {
            return a => a + 1;
        }
        for (let i=0; i < 500000; ++i) {
            let f = make();
            f(2);
        }        
    },    

    // perform a string comparison 200000 times using JavaScript === operator
    function native_compare() {
        let s = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
        let t = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX.';
        for (let i = 0; i < 200000; ++i) {
            s === t;
        }
    },

    // perform a string comparison 200000 times using JavaScript method calls
    function native_call() {
        let s = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
        let t = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX.';
        for (let i = 0; i < 200000; ++i) {
            s.equals(t);
        }
    },

    // perform a string comparison 200000 times using Java String method calls
    function java_call() {
        let s = new java.lang.String('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
        let t = new java.lang.String('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX.');
        for (let i = 0; i < 200000; ++i) {
            s.equals(t);
        }
    },

    // simulate a large stack with an array
    function array_stack() {
        let stack = [];
        for (let j=0; j<100; ++j) {
            for (let i=0; i<10000; ++i) {
                stack.push[i];
            }
            for (let i=0; i<5000; ++i) {
                stack.pop();
            }            
        }
        while (stack.length > 0) {
            stack.pop();
        }
    },

    // build a string with concatenation 200000 times
    function string_concat() {
        for (let i = 0; i < 200000; ++i) {
            let s = "i: " + i + " i1: " + (i+1) + " i2: " + (i+2);
        }
    },

    // build a string from a template string 200000 times
    function string_template() {
        for (let i = 0; i < 200000; ++i) {
            let s = `i: ${i} i1: ${i+1} i2: ${i+2}`;
        }
    },

    // build a string with sprintf 200000 times
    function string_sprintf() {
        for (let i = 0; i < 200000; ++i) {
            let s = sprintf("i: %d i1: %d i2: %d", i, i+1, i+2);
        }
    },

    // read, unpack, modify, and write back each pixel of a 300x300
    // image using getRGB/setRGB; the lesson of this is that if you
    // need to manipulate an image you should use an image filter,
    // preferably compiled, unless the image is very small
    function unaccel_image_manip() {
        let BI = java.awt.image.BufferedImage;
        let w = 300,
            h = 300;
        let im = new BI(w, h, BI.TYPE_INT_ARGB);
        for (let y = 0; y < h; ++y) {
            for (let x = 0; x < w; ++x) {
                // get the pixel at (x,y) and unpack it to separate
                // alpha, red, green, and blue components
                let argb = im.getRGB(x, y);
                let b = argb & 0xff;
                let g = (argb >> 8) & 0xff;
                let r = (argb >> 16) & 0xff;
                let a = (argb >> 24) & 0xff;
                // invert the value of each component (0xff == 255)
                a = 0xff - a;
                r = 0xff - r;
                g = 0xff - g;
                b = 0xff - b;
                // repack the components into a single value and replace
                // the original image pixel
                argb = (a << 24) | (r << 16) | (g << 8) | b;
                im.setRGB(x, y, argb);
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
        function move(from, to) {
            // move a disk from tower "from" to tower "to"
        }

        // solve a size n tower with the initial goal of
        // moving all discs from tower "from" to tower "to",
        // using tower "by" as a temporary workspace	
        function hanoi(n, from, to, by) {
            if (n == 1) {
                move(from, to);
            } else {
                hanoi(n - 1, from, by, to);
                hanoi(1, from, to, by);
                hanoi(n - 1, by, to, from);
            }
        }

        hanoi(19, 1, 2, 3);
    }

]; // END OF THE ARRAY OF TEST FUNCTIONS

/**
 * runTests()
 * Repeatedly times each function in tests,
 * printing the name of each test and its best time.
 */
function runTests() {
    const REPS = 5;
    for (let t = 0; t < TESTS.length; ++t) {
        printf('%25s  ', TESTS[t].name);
        let min = Number.MAX_VALUE;
        for (let r = 0; r < REPS; ++r) {
            let dur = time(TESTS[t]);
            min = Math.min(min, dur);
        }
        // shortest time is closest to theoretical best
        printf('%.0f ms\n', min * 1e-6);
        Console.flush();
    }
    printf('%25s  \n', 'ALL TESTS COMPLETED');
}

Console.clear();
Console.visible = true;

// Run in event thread:
// (this may give more accurate results but SE will freeze until
// the tests complete)

//runTests();

// OR

// Run in background thread:

useLibrary('threads');
Thread.run(runTests);