# Prototype

This example plug-in registers six new game component types.
They are intended to be used to create quick prototype cards
for games. The six card types are two different common
playing card sizes (poker and bridge) in portrait layout,
landscape layout, and with a portrait image.

## Running the examples

One way to test the plug-in is to right click on it and choose
**Test Plug-in**, then choose **Test**. The new card types
will be found in the **Miscellaneous** category.

You can also try it out without building it by running the
diy scripts directly. If you try right clicking on
`poker.js` and choosing **Run**, the card will appear but
you will also get an error message (`#proto-deck` is not defined).
This happens because this plug-in is designed to be translated
into multiple languages, and the translated strings are missing.
You can get around this by right clicking on the string table
(`game.properties`) and choosing **Merge Strings Into/Game Language**.
Now if you right click and **Run** `poker.js` it will work as expected.
You still won't get the same experience as using **Test Plug-in**,
because the custom font used by the cards hasn't been
loaded&mdash;but it will run!

## Tour of the files

`plugin.js`  
This is the main plug-in script. It loads the translatable strings,
card template settings, custom font, and the class map (which adds
the new card types).

`plug-in.png`  
This image is used to create an icon for the plug-in. (You'll see
this icon in the **Plug-in Manager**, for exmaple.)

`prefab-ext`  
This is a shared library used by all of the card DIY scripts. It
loads the standard `prefab` library and then customizes it.
(See the **Prefab** example for an introduction to prefabs.)

`bridge.js`, `bridge-ls.js`, `bridge-im.js`  
The diy scripts for the bridge-sized cards (portrait, landscape,
and portrait with image).

`poker.js`, `poker-ls.js`, `poker-im.js`  
The diy scripts for the poker-sized cards.

*The diy scripts are all simple stubs because this example uses
prefab components.*

`poker-tpl.png`, `bridge-tpl.png`  
The template images for the poker and bridge-sized cards.

`poker-ls-tpl.js`, `bridge-ls.js`  
These are [resource creation scripts](http://se3docs.cgjennings.ca/dm-res-image.html#resource-creation-scripts).
When loading using `ResourceKit.getImage()` they will create the
landscape versions of the template images using script code that
rotates the portrait images.
This is a fancy way to do it. You could just as easily
rotate the templates in a paint program and save them as `.png`
images just like the portrait images.

**Note:** These scripts won't work as expected unless you install
the plug-in or run it with **Test Plug-in**.

`Unkepmpt-Regular.ttf`  
This is the font file that contains the custom font used on the
prototypes. As mentioned above, to see it in use you have to
build and install the plug-in or use **Test Plug-in**. However,
you can explore the font by double-clicking on it.

`game.properties`  
This is the string table. It assigns named keys to a set of strings.
Then those strings can be referred to by their key, so that
translated versions will be used when running in a different game
language. You can add a translation by right clicking and choosing
**Add Locale**.

`layout.settings`  
This file defines settings that direct the prefab library as to how
to lay out the cards.

`proto.classmap`  
This is used to register the new card types with Strange Eons.
(The registration step happens in `plugin.js`.)