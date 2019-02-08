# Create new prefab game component types

A prefab component is a type of DIY component that requires almost no code to create. A prefab component includes a card design graphic (template), an optional title, an optional portrait (user-selected image), an optional title, and an optional markup box for rules or other content. The back face can either be a plain card design graphic or it can be identical to the front face. (If the base design does not meet your needs, it can be [changed and extended](#customizing-and-extending-prefab-designs).)

## DIY script

You still create a [DIY script](dm-diy.md) for the component, but it has almost no content. It can be as short as two lines, something like:

```js
useLibrary("prefab");
pfBaseKey = "my-unique-prefab-key";
```

## Settings

The design and layout of a prefab component is determined by looking up settings that add a suffix to the base key name that you assigned to the variable `pfBaseKey`. Your main plug-in script should [load these settings](dm-res-settings.md) and [register a class map for the component](dm-res-classmap.md) that points to your prefab script. You can find an example prefab component in the [Plug-in Authoring Kit](dm-pak.md); you can [browse the source files on GitHub](https://github.com/CGJennings/se3docs/tree/master/Plug-in%20Authoring%20Kit/DIY%20Examples/Prefab).

### Front face keys

The following keys describe the front face of the component. They are all optional except for `-front-template`.

| Key suffix              | Effect or purpose                                            | Default |
| ----------------------- | ------------------------------------------------------------ | ------- |
| `-front-template`       | Background image of front face.                              |         |
| `-front-template-hires` | Optional double resolution version of the background image for print/export. | null    |
| `-front-ppi`            | Background image resolution in pixels per inch.              | 150     |
| `-front-expsym-region`  | Location of expansion symbol(s) on front face.               | null    |
| `-front-expsym-invert`  | Index of the expansion symbol logical variant to use.        | 0       |

### Back face keys

The following keys describe the back face of the component. They are all optional; if the `-back-template` key is not defined, the component's back face will be identical to its front (`FaceStyle.SHARED_FACE`).

| Key suffix             | Effect or purpose                                            | Default |
| ---------------------- | ------------------------------------------------------------ | ------- |
| `-back-template`       | Background image of back face.                               | null    |
| `-back-template-hires` | Optional double resolution version of the background image for print/export. | null    |
| `-back-ppi`            | Background image resolution in pixels per inch.              | 150     |
| `-back-expsym-region`  | Location of expansion symbol(s) on back face.                | null    |
| `-back-expsym-invert`  | Index of the expansion symbol variant to use.                | 0       |

### Portrait keys

The following keys control whether, and where, a portrait image is drawn on the component. If the `-portrait-template` key is not defined, no portrait will appear.

| Key suffix                 | Effect or purpose                                            | Default               |
| -------------------------- | ------------------------------------------------------------ | --------------------- |
| `-portrait-template`       | Image to use as the default portrait image.                  | null                  |
| `-portrait-clip-region`    | The region that the portrait image is drawn within.          | null                  |
| `-portrait-scale`          | The scale to use for the default portrait.                   | fit automatically     |
| `-portrait-panx`           | The x-offset to use for the default portrait.                | 0                     |
| `-portrait-pany`           | The y-offset to use for the default portrait.                | 0                     |
| `-portrait-overlay`        | Image to draw over the portrait. If not present, the portrait is drawn first, then the template. Otherwise, the template is drawn, followed by the portrait, and finally the overlay image. | null                  |
| `-portrait-overlay-region` | Region covered by the overlay image.                         | cover the entire card |
| `-portrait-on-back`        | Boolean setting; if true, the portrait appears on the back face. | false                 |

### Content keys

The following keys control the initial content and labels for the component's text fields. They are all optional. (The default labels are built-in translatable strings in the UI language.)

| Key suffix       | Effect or purpose                                            | Default             |
| ---------------- | ------------------------------------------------------------ | ------------------- |
| `-name`          | The initial name (title) used for new components.            | empty string        |
| `-content`       | The initial body content used for new components.            | empty string        |
| `-name-label`    | The label used for the name (title) text field.              | `@prefab-l-name`    |
| `-content-label` | The label used for the body content text field.              | `@prefab-l-content` |
| `-tab-label`     | The label used for the tab added to the editor.              | `@prefab-l-tab`     |
| `-panel-title`   | The title applied to the layout panel containing the controls. | null                |
### Title text keys

The following keys control the location and style of the name (title) text.

| Key suffix        | Effect or purpose                                            | Default                                        |
| ----------------- | ------------------------------------------------------------ | ---------------------------------------------- |
| `-name-region`    | Region where the title is drawn; if null, there will be no title field. | null                                           |
| `-name-oneliner`  | Boolean setting; if true, the title is drawn as a single line. | null (false)                                   |
| `-name-alignment` | Text alignment of the title text.                            | centre, middle                                 |
| `-name-style`     | Text style of the title text.                                | null (uses default style for new markup boxes) |

### Content text keys

The following keys control the location and style of the content text.

| Key suffix           | Effect or purpose                                            | Default                                        |
| -------------------- | ------------------------------------------------------------ | ---------------------------------------------- |
| `-content-region`    | Region where the content is drawn; if null, there will be no content field. | null                                           |
| `-content-alignment` | Text alignment of the content text.                          | centre, top                                    |
| `-content-style`     | Text style of the content text.                              | null (uses default style for new markup boxes) |

## Customizing and extending prefab designs

It is possible to extend and build upon the standard prefab library. For example, you could create a new type of prefab that uses additional keys to add a new type of content. You would do this by creating a replacement for the prefab library that includes the original prefab library and then implements your customizations. Your component scripts would then [include your customized library](dm-script-api.md#defining-your-own-libraries) instead of the standard library.

To extend a base library DIY function, you can either define a hook function or replace the original function. Hook functions use the same name as a standard DIY function, but with either `before` or `after` at the start of the function name. For example, to define a script to be called just after the standard `create` function, you would define `function afterCreate(diy) {...}`.

To completely replace one of the standard DIY functions, assign the function name your replacement function: `create = function myCreate(diy) {...}`.

You can also use the following variables to access features of the standard implementation:

`pfDIY`  
This variable holds a reference to the DIY component itself.

`pfSettings`  
A reference to the component's private settings.

`pfTitleBox`  
A reference to the markup box used to lay out the card name (title), or `null` if none is defined. Set during `createFrontPainter`.

`pfContentBox`  
A reference to the markup box used to lay out the content text, or `null` if none is defined. Set during `createFrontPainter`.