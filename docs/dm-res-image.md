## Image resources

Most plug-ins have some need for image resources, even if only to provide an icon for the plug-in itself. The most common kind of image used in Strange Eons is called *bitmapped image* (*bitmap* for short). These consist of a grid of coloured dots (pixels). Another way of representing images is as a *vector image*. These represent an image using geometrically, using shapes and curves. This gives them the advantage of not losing detail when scaled up.

## Bitmap images

**File extensions:** `.png`, `.jpg`, `.jp2`

Bitmap images can be stored using a number of file formats, which vary in how they represent colour information and how they compress the data to the reduce file size. PNG, JPEG, and JPEG2000 images are supported. Other common formats can be [converted](dm-convert-image.md) to one of these if needed.

[`ResourceKit.getImage(path)`](assets/javadoc/resources/ResourceKit.html#getImage)  
Loads and returns a bitmap image resource as a `BufferedImage` instance.

[`ResourceKit.getImageQuietly(path)`](assets/javadoc/resources/ResourceKit.html#getImageQuietly)  
Loads a bitmap image resource, but without setting a wait cursor. If the image fails to load, no error dialog is displayed.

[`ResourceKit.getImagesQuietly(path[])`](assets/javadoc/resources/ResourceKit.html#getImagesQuietly)  
Loads multiple images, in parallel if the device has multiple CPUs or cores. Returns an array of image results once all of the images have loaded (or failed to load).

[`ResourceKit.getThemedImage(path)`](assets/javadoc/resources/ResourceKit.html#getThemedImage)  
Loads an image for use by the interface; the current theme will be given a chance to modify the image before it is returned.

[`ResourceKit.getIcon(path)`](assets/javadoc/resources/ResourceKit.html#getIcon)  
Similar to `getThemedImage`, but the image is returned as an `Icon` instance (the form required by most user interface components).

### Alternatives using the `imageutils` script library

`ImageUtils.get(path, cacheResult, quietly)`  
Loads a bitmap image resource similarly to `ResourceKit.getImage` or `ResourceKit.getImageQuietly`, though with additional options.

`ImageUtils.getIcon(path, unthemed)`  
Loads a bitmap image as an icon similarly to `ResourceKit.getIcon`, though with additional options.

`ImageUtils.read(filePath)`  
Loads a bitmap image resource from a local file.

## Vector images

**File extensions:** `.svg`, `.svgz`

Strange Eons is primarily bitmap-oriented, but it also has limited support for vector images. You can define a vector image yourself, using whatever drawing code you like, by implementing the [VectorImage](assets/javadoc/ca/cgjennings/graphics/shapes/VectorImage.html) interface. You can also load and use SVG images through a VectorImage subclass, [SVGVectorImage](assets/javadoc/ca/cgjennings/graphics/shapes/SVGVectorImage.html). Support for SVG images requires the **SVG Image Support** [core component](um-plugins-intro.md) to be installed.

[`ResourceKit.getVectorImage(path)`](assets/javadoc/resources/ResourceKit.html#getVectorImage)  
Returns an SVG image as a VectorImage instance. Note that some filter effects are not supported, and any script code in the SVG image will not be run.

[`ResourceKit.getVectorIcon(path, width, height)`](assets/javadoc/resources/ResourceKit.html#getVectorIcon)  
Returns an Icon that displays an SVG image resource at the specified size.

## The StrangeImage class

The [`resources.StrangeImage`](assets/javadoc/resources/StrangeImage.html) class is an abstraction that can be used to deal with either bitmap or vector images transparently.

[`StrangeImage.get(location)`](assets/javadoc/resources/StrangeImage.html#get)  
Returns a StrangeImage instance created from the data at the specified location. This can be a URL string, including a `res://` URL, or a local file path. Any string that would work in a portrait panel will also work as a location, except the empty string (which loads a default portrait).

The class provides methods that can be used to get the underlying image’s nominal dimensions, paint the image in a graphics context, get a version of the image as either a BufferedImage or VectorImage, and more.

## Resource creation scripts

When using `ResourceKit.getImage` or `ImageUtils.get`, if the image path ends in `.js`, it will be loaded as a script file, run, and its `createResource()` function invoked. This function should return the desired image resource. This can be used to save space when the image can be generated dynamically. For example, if the image is a mirror image of another image resource, a resource script could load the other resource, flip it using the `imageutils` library, and return the flipped image. Or, an image that is mostly transparent could be created on the fly by loading an image of the non-transparent area and combining it with a blank image.