# Deck sharing tips

## Keep decks, game components, and images together

To keep the size of deck files down, game components and custom tile images are not saved as part of the deck. Instead, the deck contains a link to the location of the original file on your computer. This can be a problem when you want to share the deck with someone, because the linked files won't be in the same place on their computer.

These steps are tried in order to locate a linked file:

1. Look for the exact file and folder named by the link. This fails on other people's computers, or if you move the file.
2. Look for a file with the same name and the same location relative to the deck. For example, up one folder, in a different subfolder named `Cards`. This can fail on different platforms, or if the relative location changed.
3. Look for a file with the same name, in the same directory as the deck.
4. Prompt you to locate the file with a file chooser.

Considering these rules, the best way to share decks reliably is to keep the deck and linked files (game components and custom tile images) together in the same folder. This will work as long as the file name of the link objects doesn't change.

## Use paper size PA4 for international sharing

Different parts of the world use different paper sizes. The two most commonly used sizes are A4 and letter. You can lay out content that works on both of these paper sizes by using the special size PA4. The PA4 size uses the smaller of A4 and letter in each dimension, so the contents will fit on both without being clipped on the edges. To make sure that objects line up correctly, go through each page and first select all the objects (<kbd>Ctrl</kbd> + <kbd>A</kbd>), then use the **Deck/Center Content on Page** command.

There is no need to worry about paper size for large expansion boards when sharing, since the recipient can choose their own paper size when [splitting the pages](um-deck-page-split.md).

## Use projects instead of laying out a deck yourself

[Projects](um-proj-intro.md) can make it easier to share decks. In fact, you can often leave the deck out altogether. If the deck only contains game components and you don't care about the order, then the recipient can automatically generate a deck at whatever page size they desire using the **Make Deck** action. And projects can be shared easily, either as packaged projects or by zipping them up using the **Export** action.

Another advantage of projects is [**project:** URLs](dm-special-urls.md). For example, if one of your game components uses a portrait image, put the image in a convenient location in your project, then drag-and-drop the image from the project view to the portrait panel. The portrait is now linked to a location relative to the open project and not a fixed location on your computer.
