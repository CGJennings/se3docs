# Silhouette resources

**File extension:** `.silhouettes`

The marker and token editor is a built-in game component editor that can be used to design simple shaped playing pieces. The playing piece shapes are defined using *silhouettes*. These are greyscale images in which black areas are considered inside of the shape and white areas are outside of the shape. The size of the playing piece shape is determined by the silhouette image size: the silhouette’s image resolution is taken to be 150 ppi (pixels per inch). New shapes can be added to the editor by defining a `.silhouette` file.

To *register the contents of a silhouette file with Strange Eons*, call [`gamedata.Silhouette.add(path)`](assets/javadoc/gamedata/Silhouette.html#add) using the resource path of the file. This can only be done in extension plug-ins.

## File format

The format of tile set files is a variant of the format used for [settings files](dm-res-settings.md). They can be edited with the [code editor](dm-code-editor.md). Lines starting with `#` are comments that are ignored by Strange Eons. Other (non-empty) lines each define one silhouette shape using the following syntax:

```properties
key = silhouette-resource | portrait-resource | bleed-margin
```

`key`  
A unique key that identifies the silhouette and also defines the name used for it in the token editor. If this starts with `@`, then the actual name is determined by looking up the rest of the key using [`Language.string(key)`](assets/javadoc/resources/Language.html#string).

`silhouette-resource`  
This is the resource path of the greyscale image that defines the silhouette shape and size.

`portrait-resource`  
This is an optional resource path for a custom image to use as the default portrait image used to draw the token content. It should have the same dimensions as the silhouette image.

`bleed-margin`  
This is an optional value that indicates that the shape has been designed with a bleed margin around all four sides of the silhouette. It is the non-negative size of the margin in points (1/72 inch).

The `|` characters may be omitted if the optional parameters are not specified. To specify a bleed margin but no portrait, leave the portrait field blank, as in `key = template.png||8`)

> The `@` syntax used for name keys is the same as that used in script files. However, since `-` is not a legal character in script variable names, script files must use `_` instead. Although `-` would be allowed here, underscores in the silhouette file will still be converted to `-` for consistency.

**Example:**

```properties
# uses a localized name, the default portrait, and no bleed margin
@big-star = mysils/big-star.png

# uses an unlocalized name and a custom portrait
Crescent = mysils/crescent.png | mysils/moon-portrait.jpg
```