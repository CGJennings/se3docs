# Graphics templates
This folders contains samples for images that are commonly used when preparing
plug-ins. They can be used as templates to ensure that images that you design
are the correct size, so that they will match the app's existing graphics.

Each image come in two sizes: one at the standard size and another that is
twice the size (`@2x`) for high DPI displays. Note that you are free to add
other high DPI variants if you wish (`@1.5x`, `@3x`, etc.), though generally
these two sizes are sufficient.

## Included graphics

**`blank-editor-icon.png`** (standard size: 24×24)  
A blank icon of the dimensions used for editors and categories in the
**File/New** new component dialog. This icon is set in the plug-in's
`.classmap` file.

**`category-banner.png`**  (standard size: 117×424)  
An empty banner of the dimensions used for a category's banner graphic in
the **File/New** new component dialog. Categories are defined in the
plug-in's `.classmap` file.

**`expansion-icon.png`** (standard size: 24×18)  
A sample image of the dimensions used for the small icon that represents
an expansion pack for a game. This is the icon used in places like the
**Expansion** menu, not the symbol that might be drawn on cards to
show that they belong to the expansion.

**`plugin-representative-image.png`**  (standard size: 24×24)  
A sample image of the dimensions expected for a plug-in's representative
image. This is used as its icon in menus and plug-in dialogs. By default,
a plug-in tries to locate this image by looking for a resource with the
same file name and path but a `.png` or `.jp2` extension. However, the
plug-in can override this by supplying an appropriate function/method.

**`project-icon.png`** (standard size 18×18)  
A sample image of the size used for icons in the project tree. While
bitmap icons can be used, it is preferable to use a vector icon. An
easy way to do this is with a `gly:` URL. You can find examples in the
[application icon map](https://github.com/CGJennings/strange-eons/blob/main/src/main/resources/resources/icons/map.properties).
Icons of this size are also suited for use as in application menu items.

**`theme.png`** (standard size 48×48)  
A sample image of the size used for a theme's representative image.
This is the icon shown for the theme in the **Preferences** dialog.

**`theme_screenshot.png`** (standard size 394×297)  
A sample of the optional preview screenshot that can be included with
a theme to show the user what it looks like when applied. This uses
only a single resolution; there is no `@2x` version.
