# Three or more faces

This example demonstrates how to create components with three or more faces.
A face is (generally) one side of a card. Each face of a game component is
managed by a `Sheet` object, which is responsible for painting it.
(For `DIY` components, a `DIYSheet` paints the component by calling into
your scipt code.)

A typical game component has two faces, a front and a back. It is also possible
to make a component with one face (for example, a sheet with nothing printed
on the back). Components with more faces are possible, but not as common.

You can check out each of the example components directly without installing the plug-in.
Right click on the script, and choose **Run**.

`3-face-diy.js`  
This is the script for a component with three faces: a sheet with a front and back, and
a character marker token. (Strange Eons will know that if you put two copies of the
token next together in a deck they should be considered the front and back of a token,
so it will add fold lines if the two sides are correctly aligned and rotated
with respect to each other.)

`4-face-diy.js`, `6-face-diy.js`, `8-face-diy.js`  
These examples showcase, in order, a component that consists of 2, 3, and 4 cards
(each with two faces).