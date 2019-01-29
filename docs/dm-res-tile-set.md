# Tile set resources

**File extension:** `.tiles`

A tile is a prefabricated object, usually art, that can be placed in a [deck](um-deck-adding-content.md ). Tiles are most commonly used to create an expansion board for a game, but creative developers will certainly find other uses for them. Tiles are listed in the deck editor's **Components** section and can be dragged and dropped onto the active deck page.

To *register the contents of a tile set with Strange Eons*, call `gamedata.TileSet.add(path)` using the resource path of the tile set file. This can only be done in extension plug-ins.

## File format

The format of tile set files is a variant of the format used for [settings files](dm-res-settings.md). They can be edited with the [code editor](dm-code-editor.md). Lines starting with `#` are comments that are ignored by Strange Eons. Tile definitions are separated from each other by one or more blank lines. The first two lines of each tile definition do not specify a key name because they are always the same (and appear in the same order). These are the tile's name and image resource. After these two values are listed, the rest of the tile entry may define the other settings in any order. 

### Tile name

**Key:** None (first line of tile definition)  
**Default:** None (a value is required)

The first line of every tile definition is the the name of the tile as it will be listed in the deck editor. If the name begins with `@` then the actual name is found by looking up the rest of the line using `Language.string`.

Sometimes a group of tiles is very similar and it is useful to number them as a sequence using a common name. An `@`-name that ends in /*n* (where *n* is a digit) will format the localized string with the value of *n*. For example, `@key/1` would look up the value of `key` in the UI string resources. If the value of this key is `"Tile %d"`, then the final name of this tile would be `"Tile 1"` after replacing the `%d` with the formatting digit `1`. Other tiles in the series would use the names `@key/2`, `@key/3`, and so on. 

> The `@` syntax used here is the same as that used in script files. However, since `-` is not a legal character in script variable names, script files must use `_` instead. Although `-` would be allowed here, underscores in the tile set will still be converted to `-` for consistency.

### Image resource

**Key:** None (second line of tile definition)  
**Default:** None (a value is required)

The second line of a tile definition is the resource path of the image file (or resource creation script) used for the tile image. Alternately, the resource path can start with `script:` to name a script which implements the `TileProvider` interface.

### Resolution

**Key:** `ppi`  
**Default:** `150`

The `ppi` key declares the resolution of the tile image, in pixels per inch. This determines the tile’s physical size. For example, if an image is 300 by 600 pixels, its physical size would be 2 inches by 4 inches (5.08 cm by 10.16 cm) at a resolution of 150 ppi. 

### Snap class

**Key:** `class`  
**Default:** `tile`

The `class` key declares the tile’s snap class, which affects how it interacts with other tiles and objects when dropping the tile over a deck page. Possible values:

`tile`  
Tiles with this class will snap to each other but will not snap to any other objects (such as cards or other components). This class is commonly used for tiles used to snap together the background art of a game board. 

`inlay`  
Inlays snap to other inlays normally (that is, outside edges snap together). When snapped to an object in the **tile** class, they snap to the *inside edge* of the tile. (They are *laid in* the tile instead of alongside it.) Inlays can be used to create an inside border along one or more tiles.

`overlay`  
Overlays do not snap to any other objects. (They are *laid over* whatever object they dropped on.) Overlays are commonly used for generic decorations. 

`spinnable`  
Spinnables behave as overlays, but they also include a draggable rotation handle so that they can be rotated to any angle. Spinnable tiles work best using small images as arbitrary rotation is computationally expensive on some devices. 

### Credits

**Key:** `credit`  
**Default:** none

This can be used to credit the artist or copyright holder. The value can be any string, but should be kept short.

### Game

**Key:** `game`  
**Default**: all games

The `game` key can be used to limit the tile to being available for a certain game. Its value is the code of the target game. It will only be listed when the deck is set to this game.

### Tile set

**Key:** `set`  
**Default:** `other`

The `set` key declares which group of tiles this tile is included with. It determines which tab the tile is listed under in the deck editor. Possible values:

`tiles`  
Background or map tiles. These are typically large and appear behind other elements on the board. 

`bits`  
The set of board “bits”; these are elements that affect the game but which are created using tiles instead of full game components. For example, spinnable arrows that direct movement on the game board would fall into this category.

`decorations`  
Decorative elements that do not affect the game. These are typically small images that are added over other layers (that is, they use `class = overlay`). 

`other`  
A miscellaneous category.

### Client properties

Special client properties can be assigned to a tile by adding keys with names that start with `client-`. These can be read by tool plug-ins to modify their behaviour or to configure the behaviour of `TileProvider` scripts. To set a client property in a tile set, add a property with a `client-*` key and the desired string value.