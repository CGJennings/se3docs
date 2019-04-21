/**
 * # tints library
 * 
 * Support for creating tintable game components.
 * Tintable components are an easy way to introduce new
 * variants of basic designs. They typically involve one or more
 * *tint panels*, controls that allow the user to select a colour.
 * These colours are then used to recolour selected parts of
 * the component design. For example, it might be applied to a decorative
 * border running around the outside.
 * 
 * Tinting modifies the original image by adusting its *hue*,
 * *saturation*, and *brightness*.  Hue refers to the colour
 * of the image pixels. The change in hue is expressed as an anglular 
 * distance around a colour wheel. (So, shifting the hue by 180 degrees
 * would change the colour to its complementary colour, on the opposite
 * side of the colour wheel.) Saturation describes the purity of the
 * image pixels. The lower the saturation, the more grayish and washed
 * out the colour appears. A saturation of 0 results in a shade of grey;
 * a saturation of 1 results in the purest possible
 * expression of the hue. The saturation adjustment for tinting
 * is expressed as a scaling factor, a multiplier that is applied to
 * the original value. Brightness describes how light or dark the
 * image appears. A brightness of 0 results in a completely black image.
 * A brightness of 1 results in the brightest possible colour within the 
 * limitations of the hue and saturation.
 * Like saturation, the brightness adjustment for tinting is expressed as a
 * scaling factor.
 * 
 * This library defines the image
 * processing tools needed to apply tinting options to graphics while
 * painting a game component; the [[uicontrols]] and [[uibindings]]
 * libraries provide the controls and logic needed to support tinting
 * on the user interface side.
 * 
 * Include this library by adding `useLibrary("tints")` to your script.
 */
declare module tints {
    /**
     * This is an interface implemented by all image filters that can be
     * used with a [[TintCache]]. It is shorthand for the
     * [Java interface](https://cgjennings.github.io/se3docs/assets/javadoc/ca/cgjennings/graphics/filters/TintingFilter.html)
     * of the same name.
     */
    type TintingFilter = JavaClass<"ca.cgjennings.graphics.filters.TintingFilter">;

    /**
     * A tint filter that shifts the hue angle and scales the saturation
     * and brightness of every pixel in an image. The image's alpha (opacity)
     * channel is not affected, so translucent areas remain translucent.
     *
     * The hue angle is measured using a scale in which 1 is equal to 360 degrees
     * (a full circle). Values will normally range from -0.5 to +0.5 (-180 to
     * +180 degrees), but values outside of this range are acceptable.
     * A value of 0 leaves the original hue unchanged.
     * 
     * The saturation and brightness values are factors multiplied against the
     * saturation and brightness of the source pixel. Factors less than 0 are treated
     * as 0. Factors may be more than 1 (100%). If the scaled value for a given
     * pixel is more than 1, it is clamped at 1 in the result.
     * 
     * If using an `HSBPanel`, it will always provide a hue between -0.5 and +0.5,
     * and saturation and brightness values between 0 and 1. Depending on the
     * saturation and brightness of the source image, you may wish to scale those
     * values up or down before passing them to the `TintCache`.
     * Otherwise, using the panel it will only be possible to *decrease*
     * the brightness and saturation (or keep it the same).
     * For example, if you wanted the maximum brightness scale to be 1.2 (120%),
     * multiply the value returned from the `HSBPanel` by 1.2. When choosing
     * the default brightness, use 1/1.2 if you want the default settings to
     * work out to the original image (1/1.2 * 1.2 = 1).
     *
     * For convenience, the class `TintFilter.ScaledTintFilter` can perform
     * scaling for you:
     * 
     * ```
     * // scale saturation to 120%, brightness to 200%
     * var f = new TintFilter.ScaledTintFilter(h, s, b, 1.2, 2.0);
     * ```
     * 
     * A `ScaledTintFilter` gets and sets factors between 0 and 1 as usual,
     * but internally applies the requested scaling factors.
     */
    type TintFilter = JavaClass<"ca.cgjennings.graphics.filters.TintFilter">;

    /**
     * A tint filter that replaces every pixel in the source image with a pixel
     * of the selected HSB colour. The alpha (translucency) of each pixel is not
     * affected.
     */
    type TintOverlayFilter = JavaClass<"ca.cgjennings.graphics.filters.TintOverlayFilter">

    /**
     * A tint filter that *replaces* the hue and saturation values, and *scales*
     * the brightness, of the pixels in the source image.
     * This filter can be used to tint a greyscale (black and white) source
     * image. Depending on the brightness of the source image, you may wish to
     * scale the brightness value passed to the filter up in order to cover a
     * wider range of possible tints. (For example, if the average brightness
     * of the source image is 50%, you might scale the brightness value by 2.)
     */
    type ReplaceFilter = JavaClass<"ca.cgjennings.graphics.filters.ReplaceHueSaturationFilter">;

    /**
     * `Tintable` is a Java interface that is implemented by classes
     * that can act as models for an `HSBPanel`. Panels read their
     * initial settings by calling the `Tintable`'s `getTint`
     * method, and they call its `setTint` method when the tint controls
     * are adjusted. By implementing the `Tintable` interface you
     * can process messages from the control panel yourself.
     * However, you do not normally need to implement this interface
     * as a standard implementation is provided through the
     * [[uibindings]] library that can read and write tints to a
     * private setting on a component.
     */
    type Tintable = JavaClass<"arkham.Tintable">;

    /**
     * A `TintCache` improves drawing performance when working with
     * tints. It takes advantage of the fact that the base image to be tinted
     * doesn't usually change between draws, and that the user only rarely
     * adjusts the tint compared to other editing operations. Instead of applying
     * a tint filter to draw the tinted graphic each time the card is redrawn,
     * you can create a cache, set the filter and base image to use, and then
     * request the tinted version of the image as needed. The cache
     * will keep a tinted copy of the image available, and update it as needed
     * when the selected tint changes.
     *
     * To create a new tint cache, you must pass in the tinting filter you wish
     * to use. For example:
     * 
     * ```
     * // during setup:
     * let tintCache = new TintCache(new TintFilter());
     * frontTinter.setImage(frontTintableImage);
     *
     * // ...
     *
     * // during drawing:
     * tintCache.setFactors(hueShift, saturationScale, brightnessScale);
     * let tintedImage = tintCache.getTintedImage();
     * ```
     * 
     * Note that although the above code sets the new tint through the tint cache,
     * doing so is not required. The cache can detect changes to the filter directly.
     * However, the cache cannot detect changes to the source image. If the pixels
     * of the source image are modified, you must force any cached result to be
     * cleared using code similar to the following:
     * 
     * ```
     * let tc = new TintCache(new TintFilter());
     * tc.setFactors(-0.25, 1, 0.8);
     * tc.setImage(source);
     *
     * // ...
     *
     * let tinted = TintCache.getTintedImage();
     *
     * let g = source.createGraphics();
     * try {
     *     // modify the pixels in "source"
     * } finally {
     *     g.dispose();
     * }
     *
     * // force clearing cached results before getting tinted version
     * // of the modified source image:
     * tc.setImage(null);
     * tc.setImage(source);
     * 
     * // this will now return a tinted version of the modified image
     * tinted = TintCache.getTintedImage();
     * ```
     */
    type TintCache = JavaClass<"ca.cgjennings.graphics.filters.TintCache">;
}