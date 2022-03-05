# High DPI displays and desktop scaling

Strange Eons 3.4 adds a host of new capabilities to support high DPI displays. This page provides an overview of how to take advantage of these features.

## What is high DPI?

A high DPI display is a display that packs more pixels into the same space as a “regular” display. For example, a 1080p display has 1080 rows of pixels, and each row is 1920 pixels across. A 4K UHD display doubles each of these numbers: it has 2160 rows of 3840 pixels each. *That’s 4 times as many pixels.* For a typical display size viewed from a typical distance, the pixels are so small that it is difficult for the human eye to perceive them.

### Desktop scaling

Adding so many more pixels would be a problem if your computer just drew your desktop normally. Everything would suddenly be much smaller. Regular text would look footnotes, and footnotes would look like ant poop. Imagine trying to click on icons that are only a quarter of the size you are used to. To account for this, operating systems use *desktop scaling*. Everything you see is *scaled up* so that objects like icons have the same *physical* size that they would on a “regular” display. They just look a lot nicer because they are drawn with many more pixels.

> Continuing with the example of the 4K UHD display and 1080p displays: If we apply a desktop scaling factor of 200% then everything is drawn twice as wide and twice as tall. Since a 4K display is twice as wide and twice and tall as a 1080p display, that means all of the icons, text, and other objects on the desktop will have the same physical size as they would on a 1080p display.

#### Problems with desktop scaling

If the operating system takes care of everything for us, why does this topic need a special page? The problem is that some things handle scaling better than others. TrueType fonts and SVG images, for example, are designed to scale nicely to any reasonable size that may be needed. They look great on high DPI displays. Bitmap graphics, such as PNG or JPEG images, not so much. When bitmap graphics are scaled up, they tend to become either blocky or blurry. And images with high spatial frequency, which includes nearly all icons, tend to look *particularly* bad when scaled.

Strange Eons provides a number of tools to deal with this:

- Provide multiple versions of bitmap images for different scaling factors.
- Switch to vector-based images.
- Use a scaling method optimized for high-frequency images.

The rest of this page describes how to take advantage of these changes. These techniques can also be applied to improve the quality of rendered game components.

#### How common is desktop scaling?

Scaling is very common for small form factor devices such as phones. On desktop and laptop computers it is less common, but that is changing. Macs with “Retina” displays use 200% scaling, and scaling factors up to 200% are somewhat common on Windows and Linux, especially on Windows laptops. Factors above 200% are currently rare outside of phones.

#### What if I don’t wanna?

With a little planning, the extra effort required to support high DPI displays ranges from “none at all” to “not that much.” For example, if you use vector images and glyph icons for your UI elements, there’s nothing more to do.

If you have an existing plug-in, you may be faced with a slightly more daunting task. Most plug-ins can be updated in a few minutes; the main job is updating code that registers games or expansions (see below). Keep in mind that supporting high DPI is not an all-or-nothing affair: if you only want to update some icons and not others, that’s fine. Strange Eons will do the best it can with what you give it.

## Quick fixes

This section describes ways to “fix up” the most common kinds of plug-in iconography. For more details, refer to the next section.

### Plug-in icons

By default, Strange Eons creates an icon for your plug-in by looking for a PNG or JP2 image in the same folder and with the same file name as the plug-in script or class. If you place `MyPlugin.png` together with `MyPlugin.js` in the same folder, the image is used automatically.

To add high DPI support, you can supplement the base icon with additional versions for different scaling factors. If you have a 24×24 icon image named `MyPlugin.png`, you can add a 48×48 version named `MyPlugin@2x.png` and it will be detected and used automatically. Adding a 2x version is generally good enough, but you can provide other scales if you wish. The full range of supported scaling factors is [listed below](#multi-resolution-image-support).

> If you overrode the default mechanism for locating a plug-in icon, be aware that the “representative image” methods have been deprecated.

### Game and expansion icons

The `Game.register` method has signatures that accept an image resource URL string or icon that can be used instead of providing a `BufferedImage`. Methods that accept a `BufferedImage` have been deprecated.

If your code used to look like this:

```js
let image = ImageUtils.get("res://myplugin/game.png");
Game.register(code, uiName, gameName, image, template);
```

You can now simply do this instead:

```js
Game.register(code, uiName, gameName, "res://myplugin/game.png", template);
```

This will automatically use multi-resolution versions of the icon that use the `@Nx` naming convention described above. (The example above would automatically detect images such as `"myplugin/game@2x.png"`.)

Likewise, `Expansion.register` can take a resource URL. In place of:

```js
let image = ImageUtils.get("res://myplugin/exp-1.png");
Expansion.register(forGame, code, uiName, gameName, image, symbols);
```

You can simply use:

```js
Expansion.register(forGame, code, uiName, gameName, "res://myplugin/exp-1.png", symbols);
```

### Preference categories 

Preference categories previously accepted an image resource string for the category icon. This continues to work unchanged, but will now pick up multi-resolution images using the `@Nx` naming convention.

> Previously, icons smaller than the standard size for preference categories would be padded to the expected size with a blank margin. Now they are scaled up to the standard size.

### Other icons

If you obtain icons using `ImageUtils.getIcon` or `ResourceKit.getIcon`, your icon will automatically pick up multi-resolution images using the `@Nx` naming convention. You can also create such icons yourself using the various `ThemedIcon` classes.

> Icons created using a standard Java AWT class such as `ImageIcon` may have high DPI support on some platforms and not others. In any case, using thee classes and methods provided by Strange Eons will produce better results, even if you do not include resolution variants of your icons.

## Framework

This section outlines the lower-level classes that high level abstractions like `ResourceKit` use to provide high DPI support. 

### Images

To support high-DPI displays, images must either be resolution independent vector images, or be able to supply different versions of an image depending on the required resolution.

#### Resolution independent images

*Section not yet written*

#### Multi-resolution images

Strange Eons supports multi-resolution bitmap images with a new class, `MultiResolutionImageResource`. A `MultiResolutionImageResource` is a true `Image` subclass: for example, you can use it with `g.drawImage` inside of a game component painting function and the best version will be selected automatically.

As already discussed, this class uses a strategy similar to that of macOS to locate variant images that use an `@Nx` tag appended to the file name. For example, if you have an image like `myplugin/images/dinosaur.png`, then if you also include an image named `myplugin/images/dinosaur@2x.png`, it will be used automatically when a higher-resolution version is required. As the name suggests, an image with a given `@Nx` tag should be `N` times as wide and `N` times as tall as the base image.

Multiple resolution variants can be provided to cover different needs. The following standard tags are recognized: `@1.25x`, `@1.5x`, `@1.75x`, `@2x`, `@2.25x`, `@2.5x`, `@3x`, `@3.5x`, `@4x`, `@8x`, `@16x`. Not all of these sizes need to be provided; including an `@2x` version is sufficient for most UI purposes.

Even if your image does not have any variants, it will *still* tend to look better if you use a `MultiResolutionImageResource` (MRIR) than a “plain” image. The MRIR uses a high-quality scaling algorithm to fill in missing resolutions. And if the base image is very small (think icon-sized), then a special scaling algorithm tailored to high frequency images is used. This is also available as an image filter, `PixelArtUpscalingFilter`.

> If you want to create a multi-resolution image from an arbitrary set of source images not restricted to the sizes suggested by the supported `@Nx` tags listed above, you can use `BaseMultiResolutionImage`. However, this requires *all* of the possible variants to be provided at construction and will therefore be slower to create and tend to use much more memory than a MRIR.

### Image filters

Strange Eons includes a suite of image filters that can be applied to `BufferedImage` objects. Since multi-resolution images are not `BufferedImage`s, they can’t be used with these filters directly. However, the abstract class `FilteredMultiResolutionImage` provides a workaround. This class wraps an existing multi-resolution image and applies the desired filter to the selected variant on demand.

### Icons

As discussed under [Quick fixes](#quick-fixes), using `ResourceKit.getIcon(resUrl)` will return an icon with full high DPI support built in. If the icon name uses a typical bitmap image file extension, a `ThemedImageIcon` is created that uses a multi-resolution image under the hood, meaning that image variants that use the `@Nx` naming scheme will be picked up automatically.

All icons returned from `getIcon` are instances of `ThemedIcon`, meaning that you can create any icon size you might need using the `derive` method. (Note that the icon size is their device-independent size before any desktop scaling factor is applied: using `derive` changes the physical size of the icon to make bigger or smaller versions you can use in the same interface.) Other `ThemedIcon` classes you may find useful:

`ThemedGlyphIcon`  
If you have a custom font containing symbols, you can create icons from those symbols using a `ThemedGlyphIcon`. For example: `new ca.cgjennings.ui.theme.ThemedGlyphIcon(symbolFont, codePointOfSymbol, foregroundColor, backgroundColor)`.

`PaintSampleIcon`  
Creates an icon to represent a `Color`, `Gradient` or other `Paint`.

### Cursors

Custom cursors (mouse pointers) can be created with `ResourceKit.createCustomCursor`, which will leverage multiresolution bitmap images if available.

### Miscellaneous

The desktop scaling factor can be obtained with `ResourceKit.estimateDesktopScalingFactor()`. For example, if a scaling factor of 200% is applied, this returns `2.0`.