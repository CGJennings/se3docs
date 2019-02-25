/*
 * printf.js - version 1
 *
 * This script demonstrates some of the capabilities of
 * printf/sprintf style functions.
 */
 
// The printf function prints formatted text to the console,
// while sprintf returns the formatted text as a string.
// You supply a pattern or template, and it fills in
// the pattern using the objects that you supply.
//
// The basic form is like this:
//   printf(formatString, objects...)
//
// To tell it where to insert one of your objects in the
// template, you put a % and a conversion code for the type
// of object. For example, %s means a "string object"
// (the \n means start a new line):
printf("put a %s here\n", "string");

// the % codes are called format specifiers; you can have as
// many as you want and it will use the arguments one after another
printf("and %s, and %s!\n", "here", "there");

//
// CONVERSIONS
//
// The full syntax of a conversion looks like this:
//   %  index$  flags  width  .precision  conversion
// All the parts are optional except the % and the conversion.
// We'll go through them, but let's start with the conversions.

// Here are conversion codes for integer numbers:
//   %i (decimal) %d (also decimal) %o (octal, or base 8) %x, %X (hexadecimal)
// Usually you just want %d.
printf("%i %d %o %x %X\n", 255, 255, 255, 255, 255);

// Both JS numbers and the various Java number objects can be passed as
// the object for an integer conversion. Floating point types will have
// their fractional part chopped off.
printf("%d\n".repeat(10),
	// JS number
	3.5,
	// Java integer types
	new java.lang.Byte(127),
	new java.lang.Short(32767),
	new java.lang.Character(65535),
	new java.lang.Integer(2147483647),
	java.lang.Long.valueOf("9223372036854775807"),
	new java.math.BigInteger("265252859812191058636308480000000"),
	// Java floating point types
	new java.lang.Float(3.40282e+38),
	new java.lang.Double(1.79769e+308),
	new java.math.BigDecimal("9876543210.123456789")
);

// Here are the conversion codes for floating point numbers:
//   %f : always uses decimal notation for the number
//   %e : always uses computerized scientific notation (e.g., 1.5e-6);
//        use %E for capital E
//   %g : uses decimal or scientific notation depending on the value
//        and precision (see below); use %G for capital E
//   %a : uses exponential hexadecimal notation; use %A for upper case
// Usually you just want %f.
//
// As with integer conversions, all kinds of numbers are accepted,
// except that %a does not accept BigInteger or BigDecimal.
printf("%f %e %g %a\n", 123.456, 123.456, 123.456, 123.456);

// There are some other conversions available, including:
//   %%     : converts to "%"
//   %n     : converts to newline (\n)
//   %b/%B  : coverts to "true" or "false"
//   %c/%C  : converts a number to a single character by Unicode code point
//   %h/%H  : prints the object's Java hash code in hexadecimal
// There is an entire set of time and date related conversions as well;
// these start with %t or %T followed by another letter.
printf("%b %b %b %b\n", true, false, "not null", null);
printf("%c%c %c\n", 72, 73, 0x1f642);

//
// WIDTH AND PRECISION
//
// Width values specify the minimum number of characters; shorter
// values will be padded to make up the difference:
printf("[%4d] [%8s] [%3f]\n", 12, "string", 1);

// Precision values limit the number of characters of strings
// and the number of decimal places that floating point
// numbers are rounded to:
printf("%.3s %.2f %.0f [%6.2f]\n", "dogged", 1.526, 1.526, 1.526);

//
// FLAGS
//
// The following flags can appear (before the width and precision,
// if any):
//    - : values padded to a width will be left-justified
//    0 : numeric conversions use "0" for padding instead of spaces
//    + : numeric conversions use a + sign for positive values
//      : (a space) use a leading space for positive values
//    ( : numeric conversions enclose negative values in ( )
//    , : numeric conversions use locale-specific grouping separators
//    # : use 0 prefix to indicate octal values, 0x for hex;
//        for floating point values, always include decimal separator
//    Numeric flags generally only apply to %d, %i, %f, %e, and %g
printf("[%-4d] %04d %+d, [% d] %(d %,d\n", 1, 1, 1, 1, -1, 12345678);

//
// ARGUMENT ORDER
//
// The flag < will cause the format specifier to re-use the last object.
// (This is mainly useful for formatting dates.)
printf("%d %<d %d %<d %<+.1f\n", 1, 2, 3, 4, 5);

// Use N$ right after the % to use the Nth object, counting from 1.
// This is particularly useful when translating a format string
// to another language.
printf("%4$c %3$c %1$c %2$c\n", 67, 68, 66, 65);

//
// LOCALE
//
// By default, formatting uses the interface language.
// Use a Language or Locale as the first argument to format
// for that language.
printf(Language.game, "%,d", 123456);

// Pass null to prevent localization, which is effectively
// the same as using the en_US locale. This is useful when
// formatting values that will be parsed by the computer,
// such as Setting values. For example, to safely format
// a Region setting, you could use:
//
// let region = sprintf(null, "%d,%d,%d,%d", x, y, width, height);