/**
 * # imageutils library
 * 
 * Defines the `ImageUtils` object, which helps you work with images.
 * Include this library by adding `useLibrary("imageutils")` to your script.
 * 
 * **Example of use:**
 * 
 * ```js
 * useLibrary( "imageutils" );
 * let src = ImageUtils.get("icons/application/256.png");
 * let tinted = ImageUtils.tint(src, 0.25, 1.8, 1.4);
 * ImageUtils.view(tinted);
 * ```
 */
declare module imageutils {
    /** The [BufferedImage](https://docs.oracle.com/javase/8/docs/api/java/awt/image/BufferedImage.html) Java class. */
    type BufferedImage = JavaClass<"java.awt.image.BufferedImage">;

    /**
     * An object that defines a number of image-related utility functions.
     */
    const ImageUtils: {
        /**
         * Returns a new image with the specified dimensions. If `transparent` is true,
         * the image will have an alpha channel and pixels can be transparent or
         * translucent. Otherwise, all pixels in the image are opaque.
         *
         * @param width the image width, in pixels; must be greater than zero
         * @param height the image height, in pixels; must be greater than zero
         * @param transparent if true, the image includes an alpha channel (default is false)
         * @returns an image with the requested parameters
         */
        create(width: number, height: number, transparent?: boolean): BufferedImage;

        /**
         * Returns a new image with pixel dimensions calculated from a measurement in
         * points and a specified resolution in pixels per inch. One point is defined
         * to be 1/72 of an inch. Thus, at a resolution of 300 ppi, a width of 36 points
         * would translate to a pixel width of 150 pixels. If `transparent` is true,
         * the image will have an alpha channel and pixels can be transparent or
         * translucent. Otherwise, all pixels in the image are opaque. The calculated
         * image size must be at least one pixel wide and high.
         * 
         * @param pixelsPerInch the image resolution, in pixels per inch
         * @param widthInPoints the image width, in points
         * @param heightInPoints the image height, in points
         * @param transparent if true, the image includes an alpha channel (default is false)
         * @returns an image with the requested parameters
         */
        createForResolution(pixelsPerInch: number, widthInPoints: number, heightInPoints: number, transparent: boolean): BufferedImage;

        /**
         * Returns an image loaded from an image file stored in the plug-in `resources` folder.
         * If the image cannot be loaded (for example, if no image file exists at the given resource path), returns `null`.
         * 
         * @param resourcePath a path string relative to the `resources` folder
         * @param cacheResult if true, the image may be cached to speed future requests for the same resource (default is true)
         * @param quietly if true, no error is displayed if loading the image fails (default is false, display an error message)
         * @returns the image, or null
         * @see [Image resources](https://cgjennings.github.io/se3docs/dm-res-image.html)
         */
        get(resourcePath: string, cacheResult?: boolean, quietly?: boolean): BufferedImage | null;

        /**
         * Returns an icon loaded from an image file stored in the plug-in `resources` folder.
         * If the image cannot be loaded (for example, if no image file exists at the given resource path), returns `null`.
         * 
         * @param resourcePath a path string relative to the `resources` folder
         * @param unthemed if true, then the current theme will not be allowed 
         *     to modify the icon image to fit the theme (default is false, icon can be themed)
         * @returns the icon, or null
         */
        getIcon(resourcePath: string, unthemed?: boolean): JavaObject<"javax.swing.ImageIcon"> | null;

        /**
         * Returns a new icon that displays an existing image.
         * The icon will be resized to fit within `size`×`size` pixels.
         * 
         * @param image the image used to create the icon, which is not changed
         * @param size the target size for the icon (default is 16)
         * @returns an icon that displays the image at the requested size
         */
        createIcon(image: BufferedImage, size?: number): JavaObject<"javax.swing.ImageIcon">;

        /**
         * Returns a new copy of the specified image. If you are going to draw on an image
         * that you obtained from resources, it is important to work with a copy
         * so that you don't alter the shared version stored in the image cache.
         * 
         * @param image the image to copy
         * @returns a new copy of the source image
         */
        copy(image: BufferedImage): BufferedImage;

        /**
         * Returns a new image that combines two source images by "stitching" them
         * together along an edge. If `stitchEdge` is `ImageUtils.STITCH_HORIZONTAL`,
         * then the left edge of `image2` will be stitched to the right edge of `image1`.
         * If `stitchEdge` is `ImageUtils.STITCH_VERTICAL`, then the top edge of
         * `image2`  will be stitched to the bottom edge of `image1`. If either source
         * image has transparency, then the returned image will also; otherwise it is opaque.
         *
         * @param image1 the first image to be stitched, which is not changed
         * @param image2 the second image to be stitched, which is not changed
         * @param stitchEdge the edge to joint the images along, `STITCH_HORIZONTAL` or `STITCH_VERTICAL`
         * @returns a new image combining the source images at their edges
         */
        stitch(image1: BufferedImage, image2: BufferedImage, stitchEdge: 1 | 2): BufferedImage;
        /** Indicates that images should be stitched from left to right. */
        STITCH_HORIZONTAL: 1;
        /** Indicates that images should be stitched from top to bottom. */
        STITCH_VERTICAL: 2;

        /**
         * Creates a copy of an image that is resampled to a new size.
         * 
         * @param image the image to create a resized copy of
         * @param newWidth the width of the new image, in pixels (must be positive)
         * @param newHeight the height of the new image, in pixels (must be positive)
         * @param fast an optional hint; if true, lower quality but faster resampling is performed (default is false, use higher quality)
         * @returns the resized copy of the source image
         */
        resize(image: BufferedImage, newWidth: number, newHeight: number, fast?: boolean): BufferedImage;

        /**
         * Ensures that an image is as large as it can be and still fit within the given dimensions without changing the aspect ratio.
         * If the image already just fits it is returned unchanged. Otherwise a new, resized image is returned.
         * 
         * @param image the image to fit within the space, which is not changed
         * @param newMaxWidth the maximum width of the image
         * @param newMaxHeight the maximum height of the image
         * @param fast an optional hint used when the image needs to be resized; if true, lower quality but faster resampling is performed (default is false, use higher quality)
         * @returns the original image, or a resized copy sized to just fit within the specified dimensions
         */
        fit(image: BufferedImage, newMaxWidth: number, newMaxHeight: number, fast?: boolean): BufferedImage;

        /**
         * Creates an image by cropping a source image. The resulting image
         * will consist of the subimage of the source image that starts at pixel
         * (`x`, `y`) in the source image and is `width` by `height` pixels in size.
         * Either `width` or `height` (or both) may undefined or less than 1, in which case the crop
         * will extend to the right (or bottom) edge of the image, respectively.
         * 
         * @param image the source image, which is not changed
         * @param x the x-coordinate of the upper-left corner of the region to retain in the destination
         * @param y the y-coordinate of the upper-left corner of the region to retain in the destination
         * @param width the width of the region to retain in the destination, or -1 to use the image edge
         * @param height the height of the region to retain in the destination, or -1 to use the image edge
         * @returns a new image containing the cropped region of the source image
         */
        crop(image: BufferedImage, x: number, y: number, width?: number, height?: number): BufferedImage;

        /**
         * Returns a padded copy of the image that adds margins of the given sizes to
         * the outside of the image. A margin may be negative, in which case rows
         * or columns will be *removed* from that edge.
         * 
         * @param image the source image, which is not changed
         * @param top the number of pixels to add to the top edge
         * @param left the number of pixels to add to the left edge
         * @param bottom the number of pixels to add to the bottom edge
         * @param right the number of pixels to add to the right edge
         * @returns a padded copy of the image
         */
        pad(image: BufferedImage, top: number, left: number, bottom: number, right: number): BufferedImage;

        /**
         * Returns a padded copy of the image that adds a margin on each side of the image.
         * The margin may be negative, in which case rows or columns will be *removed*.
         * 
         * @param image the source image, which is not changed
         * @param margin the number of pixels to add to each edge
         * @returns a padded copy of the image
         */
        pad(image: BufferedImage, top: number, left: number, bottom: number, right: number): BufferedImage;

        /**
         * Returns a trimmed copy of the source image that excludes fully
         * transparent (alpha=0) rows and columns around the image's edges. If there
         * are no such rows or columns, returns the original image. If the entire
         * image is fully transparent, returns a 1x1 transparent image.
         *
         * @param image the source image, which is not changed
         * @returns a trimmed copy of the image
         */
        trim(image: BufferedImage): BufferedImage;

        /**
         * Returns a tinted copy of an image. The value of `h` is a relative
         * number of degrees. The hue of each pixel in the source image will be
         * shifted by `h` × 360 degrees around the HSB colour wheel: a value of
         * 0 (or 1) leaves the hue unchanged, while a value of 0.5 shifts the hue
         * by 180 degrees to its complementary colour. The value of `s` is a saturation factor;
         * each pixel's saturation will be multiplied by this value. A value of 0 will
         * convert the image to greyscale. A value of 1 will leave the saturation
         * unchanged. The value of `b` is a brightness factor. Each pixel's
         * brightness will be multiplied by this value. A value of 0 will set each
         * pixel's brightness to 0, resulting in a black image. A value of 1 will leave
         * the brightness unchanged.
         * 
         * @param image the source image, which is not changed
         * @param h the hue shift to apply expressed as a number of rotations around the colour wheel
         * @param s the saturation factor to apply
         * @param b the brightness factor to apply
         * @returns a tinted copy of the image
         */
        tint(image: BufferedImage, h: number, s: number, b: number): BufferedImage;

        /**
         * Returns a tinted copy of an image. The elements of the `hsb` array specify
         * `h`, a hue shift (in rotations), `s`, a saturation adjustment factor, and `b`, a brightness
         * adjustment factor, respectively.
         * The hue of each pixel in the source image will be
         * shifted by `h` × 360 degrees around the HSB colour wheel: a value of
         * 0 (or 1) leaves the hue unchanged, while a value of 0.5 shifts the hue
         * by 180 degrees to its complementary colour. The saturation level of each pixel
         * will be multiplied by `s`. A value of 0 will convert the image to greyscale.
         * A value of 1 will leave the saturation The brightness of each pixel will be multiplied
         * by `b`. A value of 0 will set each pixel's brightness to 0, resulting in a black image.
         * A value of 1 will leave the brightness unchanged.
         * 
         * @param image the source image, which is not changed
         * @param h the hue shift to apply expressed as a number of rotations around the colour wheel
         * @param s the saturation factor to apply
         * @param b the brightness factor to apply
         * @returns a tinted copy of the image
         */
        tint(image: BufferedImage, hsb: [number, number, number]);

        /**
         * Returns a new image that mirrors and/or flips the the source image.
         * 
         * @param image the source image, which is not changed
         * @param flipHoriz if true, mirrors the image horizontally (default is true)
         * @param flipVert if true, mirrors the image vertically (default is false)
         * @returns the rotated image
         */
        mirror(image: BufferedImage, flipHoriz?: boolean, flipVert?: boolean): BufferedImage;

        /**
         * Returns a copy of the image with all of the pixels inverted.
         * The result is similar to a photographic negative.
         * 
         * @param image the source image, which is not changed
         * @returns the inverted image
         */
        invert(image: BufferedImage): BufferedImage;

        /**
         * Returns a copy of the image converted to greyscale.
         * 
         * @param image the source image, which is not changed
         * @returns the desaturated image
         */
        desaturate(image: BufferedImage): BufferedImage;

        /**
         * Returns an image decoded from an image file stored on the user's device.
         * 
         * @param filePath the file to read from
         * @returns the decoded image
         * @throws if reading the image fails
         */
        read(filePath: string | JavaObject<"java.io.File">): BufferedImage;

        /**
         * Writes an image to a file.
         * 
         * @param image the image to write, which is not changed
         * @param filePath the file to write to
         * @param format the image format (default is `"png"`)
         * @param quality a value between 0 and 1 inclusive that describes the desired tradeoff between smaller size and better image quality (use -1 for default quality; 1 for maximum quality)
         * @param progressive if true and supported by the format, requests that the file be organized so that it can be displayed progressively as it downloads (default is false)
         * @param ppi if defined and supported by the encoder, the image's metadata will indicate that this value is the the resolution of the image in pixels per inch
         */
        write(image: BufferedImage, filePath: string | JavaObject<"java.io.File">, format?: "png" | "jpg" | "jp2" | "bmp" | "gif", quality?: number, progressive?: boolean, ppi?: number): void;

        /** A format constant indicating the PNG (png) image format. */
        FORMAT_PNG: "png";
        /** A format constant indicating the JPEG (jpg) image format. */
        FORMAT_JPEG: "jpg";
        /** A format constant indicating the JPEG2000 (jp2) image format. */
        FORMAT_JPEG2000: "jp2";
        /** A format constant indicating the BMP (bmp) image format. */
        FORMAT_BMP: "bmp";
        /** A format constant indicating the GIF89a (gif) image format. */
        FORMAT_GIF: "gif";

        /**
         * Prompts the user to choose a file, then saves the specified image to the selected
         * file. A default file may be suggested as the starting point for file selecton;
         * if none is selected then a default location is selected based on the last-saved file.
         * 
         * @param image the image to save, which is not changed
         * @param defaultFile an optional default file to suggest to the user
         * @param parent an optional component to act as the parent of the dialog
         * @returns the file that the user selected, or null if the save was cancelled
         */
        save(image: BufferedImage, defaultFile?: string | JavaObject<"java.io.File">, parent?: JavaObject<"java.awt.Component">): JavaObject<"java.io.File"> | null;

        /**
         * Displays an image in an image viewer window.
         * 
         * @param image the image to view, which is not changed
         * @param title an optional title for the viewer
         * @param modal if true, the viewer blocks the application until closed (default is false)
         * @param parentWindow an optional parent window (default is the application window)
         */
        view(image: BufferedImage, title?: string, modal?: boolean, parentWindow?: JavaObject<"java.awt.Window">): void;
    }
}