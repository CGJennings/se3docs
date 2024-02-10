/*
 * console-basics.js - version 2
 * 
 * Printing to the console.
 */

println("When experimenting with script code, it is often useful to be able");
println("to print things out. Strange Eons includes a console-like output");
println("area called the Script Output window.");
println();
println("You can print to it by calling println() with whatever objects");
println("you would like to see.");
println();
println("For example:");
println("println(\"Hello\")");
println("-> ", "Hello");
println();
println("println(7)");
println("-> ", 7);
println();
println("let a = [0, 1, 2, \"three\"];");
println("println(a);");
let a = [0, 1, 2, "three"];
println("-> ", a);
println();
println("You can use println() with no arguments to leave a blank line,");
println("or use print(anObject) to print without starting a new line:");
println();
println("print('all '); print('together '); println('on a line');");
print("-> ", 'all '); print('together '); println('on a line');
println();
println("You can pass as many arguments as you would like to");
println("print each one in turn:");
println();
println("println(1, 2, a);");
println(1, 2, a);

println();
println("The Console object provides access to more features.");
Console.println("For example, Console.clear() clears it from a script.", "test");
println("The print() and println() functions are just shorthand for");
println("Console.print() and Console.println().");
println();

Console.scrollToTop();