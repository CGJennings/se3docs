# Game component examples
This folder contains the code for several plug-ins.
Each one creates a new kind of game component.
Some are only meant to demonstrate a particular feature,
while others implement components for real (or imaginary)
games.

For the simple examples, you don't have to build or test
the full plug-in to see the effect. Dig into the plug-in
folders and look for the scripts with `-diy` in the name,
right click on one, and choose **Run**.

## Bleed Margins
Shows how to properly create a game component that
includes a bleed margin. This is an extra area around
the outside of a component that extends the design, in order
to allow for imperfections in the printing and cutting process.

Be sure to choose **View/Edge Finish/Include Bleed Margin**
to see the full effect.

## Design Support
Shows how to add various kinds of design supports to a
game component editor. A design support helps the user
by analyzing their design and making suggestions or pointing
out violations of the game's rules.

Be sure to try editing the text to see how the various
supports respond to changes.

## Multiple and Custom Portraits
Shows how to create:
 - a game component with multiple portraits;
 - a game component with a single portrait image that is
   drawn in multiple places (with different adjustments
   for each);
 - a game component with a portrait that is drawn in
   different places depending on the component state.

## Prefab
Demonstrates the "prefab" system for creating a custom game
component. If your game component's design is fairly
simple, you can use a prefab to create without having to
write a significant amount of code.

## Prototype
When installed, this plug-in adds several new card types of
various common sizes, meant to be used for quick game
prototyping.

## Register Game
This plug-in demonstrates how to register a new game and
add support for expansion icons in your main plug-in script.

## Rise of the Servitors
The plug-in is a small but complete example. It adds one
new type of card, but with enough polish that the result
is suitable for printing.

## Talisman
This is an example of a more extensive plug-in. It registers
a new game, adds several types of components, includes
translations, and even includes a separate optional plug-in
that adds higher-res graphics for better print quality.

## Three or More Faces
This plug-in for a hypothetical Sherlock Holmes game shows
how to create game components with more than just a front
and back face. Common uses for this capability are to
design two closely-linked cards at the same time, or to
include a character's marker token with along with the
character's stat card.