# Register Game

This example demonstrates how to
[register a new game, and how to register an expansion for that game](http://se3docs.cgjennings.ca/dm-register-game.html).

## Registering a game
Registering a game lets you group all of the related game components under that
game's name. For example, in the **File/New** dialog, you can choose to filter
the listed components so that only those from a certain game are shown.
Plug-ins can also declare that they add on to a certain game (in their
[root file](http://se3docs.cgjennings.ca/dm-eons-plugin.html#for-game)).
This lets users search for plug-ins related to a given game.

Games also have their own settings that are shared between all components
for that game. This lets you load a single collection of settings for
all of your components. These will be "inherited" automatically and
if you change them in a future update, all components for that game
will get those changes automatically. (This is unlike the settings
set directly on a component's "private settings", which are are unique
to each individual component.)

## Registering an expansion
Registering expansions for a game lets you take advantage of the built-in
system for adding expansion symbols to your designs: a few lines each
near the end of `register-game-plugin.js`.

### Expansion symbol templates
Most of the code in the plug-in script is used to create an
[expansion symbol template](http://se3docs.cgjennings.ca/dm-register-game.html#custom-expansionsymboltemplates).
This is used to add custom "variants" of expansion symbols.
(For example, a light version for some card designs and a dark verison for others.)
In most cases, you can ignore this code and stick with the default template
by passing `null` to `registerGame` as the `ExpansionSymbolTemplate`.