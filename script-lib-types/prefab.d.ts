/**
 * # prefab library
 * 
 * Creates a DIY component based on a common layout with a minimum of coding.
  * For an explanation of how to use prefab components,
 * refer to the relevant [Developer Manual section](https://cgjennings.github.io/se3docs/dm-diy-prefab.html).
 * 
 * Include this library by adding `useLibrary("prefab")` to your script,
 * then define the relevant values (at a minimum `pfBaseKey`).
 * See the plug-in authoring kit for examples that use this library.
 */
declare module prefab {
    /** This must be set to the base setting key for the component. */
    var pfBaseKey: string;

    /** This variable holds the DIY component instance. */
    var pfDIY: JavaObject<"arkhma.diy.DIY">;

    /** This variable will hold the component's private settings. */
    var pfSettings: common.Settings;

    /**
     * This variable holds the markup box used to lay out the
     * card title, or null if there is no title.
     * It is set during `createFrontPainter`.
     */
    var pfTitleBox: markup.MarkupBox;

    /**
     * This variable holds the markup box used to lay out the
     * content text, or null if there is no content text.
     * It is set during `createFrontPainter`.
     */
    var pfContentBox: markup.MarkupBox;

    /**
     * Called to set up global variables once the DIY instance is known.
     * @param diy the DIY instance for the compnent
     */
    function pfInit(diy: JavaObject<"arkhma.diy.DIY">): void;

    /**
     * Composes a full key name from the base name
     * (`pfBaseKey`) and a suffix.
     * @param suffix the suffix to append to the key base
     * @returns the complete key name
     */
    function pfKey(suffix:string): string;

    /**
     * Returns a string looked up from the DIY's settings
     * based on the base key (`pfFrontKey`). If the value
     * starts with `#`, `@`, or `$`, the true value is
     * looked up as if the value were a global variable
     * (i.e., as a game string, interface string, or setting).
     */
    function pfString(key: string, defaultValue: string): string;

    /**
     * Called from the standard prefab painting function to paint
     * an overlay overtop of the background and portrait. Replace
     * to customize behaviour.
     * @param g the graphics context
     * @param sheet the sheet being painted
     */
    function pfPaintOverlay(g: JavaObject<"java.awt.Graphics2D">, sheet: JavaObject<"arkham.diy.DIYSheet">): void;
}