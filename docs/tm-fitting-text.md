# Fit translated text

Translated strings are generally 30% to 50% longer than the English strings which are typically used as the default language. This can lead to trouble fitting the translation in the available space.

## On game component layouts

When translating the text that appears on game components, it is sometimes necessary to make slight adjustments the layout of the component. This is easy to do if the plug-in author uses `.settings` files to define the basic card layout. You can create translated versions in much the same was as for `.properties` files, by adding suffixes for the appropriate locale. To work correctly, the plug-in author should use something like `Language.getResourceChain` to load the appropriate files.

Some strategies that are used to fit translated design elements include:

1. Shift the element's *region* over slightly to make more space.
2. Similarly, slightly increase the width and/or height or the *region*.
3. Reduce the font size used to render the element.
4. Squash the font by scaling it horizontally. This should be a last resort as it distorts the letter shapes.

If there is an "official" design for the component in the target language, you should try to copy whatever strategy is used there for consistency, even if it might be a suboptimal choice design-wise.

## Interface text

Interface layouts are generally more flexible than game component layouts because windows can grow and shrink to accommodate different text lengths. When the interface does break, one trick you can use is to change the text of labels and buttons to start with `<html>`. This lets you use simple HTML tags (like `<b>`...`</b>`) in the label text. In particular, you can then force a line break within the text using a `<br>` tag, as in `<html>Gesundheit<br>Geistige `.