# Handle %-format strings

Often, the text being displayed needs to have some other text inserted into it when the plug-in runs. For example, a plug-in might want to print a warning like *Are you sure you want to delete 6 files?*, where the *6* gets replaced by different numbers depending on the number of files selected. In Strange Eons, most such *format strings* use `printf`-style syntax. This uses a percent sign (`%`) and a short code wherever a bit of text is going to be inserted. The code ends in a letter which indicates the type of text being inserted. The most common codes are `%s` to insert another string, `%d` to insert an integer number, and `%f` to insert a floating point number (a number with decimal digits). The special sequence `%%` is used to insert a percent sign. Other symbols may appear between the the percent sign and the code letter; these control how the inserted text is formatted. For example, `%.2f` prints a floating point number with decimal places of precision (as in 3.14).

These formatting details and not usually relevant to the translation process, so the formatting code should be included in the translation unchanged at the appropriate point. However, sometimes you need to change the *order* of the formatting codes in the translated string. In this case you need to label the format codes to indicate which position each one had in the original text.

Let's look at an example:

`The %s dog has a toy %s.`

If this is formatted with the strings `happy` and `ball`, then the result is:

`The happy dog has a toy ball.`

In this example, `happy` is *argument number 1* and `ball` is *argument number 2*. Now let's suppose this was going to be translated to a language where the grammar requires the following structure:

`The dog with the toy ball is happy.`

If you just insert the `%s` values from the default translation without thinking, you will get:

`The dog with the toy %s is %s.` ⚠

But since the first `%s` gets *argument number 1* and the second one gets *argument number 2*, the result will be:

`The dog with the toy happy is ball.` ⚠

To translate this correctly, we need to tell the app that the order of the arguments is different. To do that, right after the `%` you insert the argument number you wan to use followed by `$`, then the rest of the format code exactly as it appeared in the original. In this case:

`The dog with the toy %2$s is %1$s.`

## {0} format strings

Although rarely used in Strange Eons, another common convention for formatted text is to place argument numbers is braces. With these strings, the argument numbering starts at 0 instead of 1. For example, if the plug-in programmer chose to format the example above this way, the default string would be:

`The {0} dog has a toy {1}.`

And your translation would use:

`The dog with the toy {1} is {0}.`

Note that you can't pick which to use; you must stick with whatever the programmer uses.

> If you see two similar strings that use the same key name except that one appends `-pl` to the end, it typically indicates the use of [plural forms](tm-plurals.md).