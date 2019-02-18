# Typeface viewer

The typeface viewer lets you explore and test compatible [font resources](dm-res-font.md) in a project.

To *preview a font file*, double click it in the project pane to open it in the typeface viewer.

![The typeface viewer dialog](images/font-viewer.png)

## Exploring the available characters

The main area of the viewer consists of a table of Unicode code points. Pink cells indicate code points that are *not supported* by the font. The remaining cells display the glyph (character shape) that the font specifies for that code point. Each row of the table covers 16 code points. The heading at the start of each row gives a base offset for the row. The code point for a given character can be calculated by adding its position in the row to this base. For example, the code point for A is 0x41 (U+0041). The character, code point, and Unicode name can also be seen by hovering over the glyph's cell with the mouse pointer.

> Assuming the Core Typefaces plug-in is installed, the unsupported pink cells will contain a representative character of the relevant code block in a rectangular frame. Otherwise it will display the font's missing character (`.notdef`) glyph, an empty box colloquially referred to as "tofu".

### Previewing characters and text

Choosing any table cell with draw the associated glyph's outline in the large preview area in the lower-left corner of the dialog, print its Unicode name below the table, and insert it into the **Copy** field.

To *enter test text in the target font*, click in the **Copy** field and enter the desired text.

To *insert a selected character* into the **Copy** field, choose that character's cell in the table.

To *change the size of the preview text*, use the **Size** field above and to the right of the **Copy** field.

To *copy the sample text* to the clipboard, choose **Copy**.

### Searching for specific characters

You can search for characters by matching against their official Unicode name. Enter part of the name in the search field and press <kbd>Enter</kbd> or choose **Find Next**.

To *cycle through all matches*, choose **Find Next** repeatedly.

For example, to find all quotation characters, enter `quot` in the search field and use **Find Next** to select each match in turn.

### Displayed character ranges

By default, the viewer shows only the characters in the Unicode *Basic Multilingual Plane*. This includes almost all of the characters used in modern languages, and will usually suffice. The dropdown list in the upper right corner of the dialog can be used to switch to the full Unicode range when required.