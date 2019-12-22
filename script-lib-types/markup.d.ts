/**
 * # markup library
 * 
 * Classes and functions that can be used to create *markup boxes*. A markup
 * box is used to render component text in a rectangular area of a component
 * face. The text is styled, and can include HTML-like markup to add styles,
 * images, headings, and other features.
 * 
 * Include this library by adding `useLibrary("markup")` to your script.
 * See the plug-in authoring kit for examples that use this library.
 */
declare module markup {
    // type MarkupBox = JavaClass<"ca.cgjennings.layout.MarkupRenderer">;
    // type GenderMarkupBox = JavaClass<"ca.cgjennings.layout.GenderAwareMarkupRenderer">;
    // type TextStyle = JavaClass<"ca.cgjennings.layout.TextStyle">;
    // type PageShape = JavaClass<"ca.cgjennings.layout.PageShape">;
    type TextAttribute = JavaClass<"java.awt.font.TextAttribute">;

    /**
     * Creates a new markup renderer that can lay out text marked up with
     * Strange Eons tags. The renderer will be set up for use with
     * a particular component sheet, typically a DIY card face.
     * 
     * @param sheet the sheet that the box's text will be drawn on, such as that passed to [[createFrontPainter]]
     * @param genderAware if true, a GenderMarkupBox is returned
     */
    function markupBox( sheet: JavaClass<"arkham.sheet.Sheet">, genderAware?: boolean ): MarkupBox|GenderMarkupBox;
    /**
     * Creates a new markup renderer that is optimized to lay out text marked up with
     * Strange Eons tags in a graphics context of the specified target resolution.
     * 
     * @param ppi the target resolution
     * @param genderAware if true, a GenderMarkupBox is returned
     */    
    function markupBox( ppi: number, genderAware?: boolean ): MarkupBox|GenderMarkupBox;

    /**
     * An object capable of laying out styled text by parsing plain text that is
     * marked up with HTML-like tags.
     * To create an object of this class, it is normally recommended that you use
     * the `markupBox(sheet)` function, which will set the correct
     * resolution and define standard tags.
     *
     * **Note:** Because it is based on a Java class, you may use the JavaScript engine's
     * getter/setter syntax with a MarkupBox. For example, instead of
     * `box.setDefaultStyle(style);` you can write
     * `box.defaultStyle = style;`
     */
    class MarkupBox implements JavaClass<"ca.cgjennings.layout.MarkupRenderer"> {
        /**
         * Creates a default markup renderer for the specified resolution.
         * Rather than constructing a MarkupBox directly, they are usually
         * created with the `markupBox(sheet)` helper function.
         * 
         * @param ppi the target resolution, in pixels per inch
         */
        constructor(ppi: number);

        /**
         * Lays out and draws the current markup text within the specified region.
         * 
         * @param g the graphics context to render the box content into
         * @param region the rectangular area of the graphics context to lay out the content within
         * @returns the y-coordinate where the next line would have started
         */
        draw(g: JavaObject<"java.awt.Graphics2D">, region: common.Region|common.Region2D): number;

        /**
         * Lays out and draws the current markup text within the specified region
         * without inserting any line breaks.
         * The markup text must not contain any explicit newline characters, or the result is undefined.
         * 
         * @param g the graphics context to render the box content into
         * @param region the rectangular area of the graphics context to lay out the content within
         * @returns the width of the line in pixels
         */
        drawAsSingleLine(g: JavaObject<"java.awt.Graphics2D">, region: common.Region|common.Region2D): number;

        /**
         * Lays out but does not draw the current markup text, returning the height of the text.
         * 
         * @param g the graphics context to render the box content into
         * @param region the rectangular area of the graphics context to lay out the content within
         * @returns the height of the text in pixels
         */        
        measure(g: JavaObject<"java.awt.Graphics2D">, region: common.Region|common.Region2D): number;    

        /**
         * Sets the style associated with a simple (non-parametric) tag.
         * If a style was set previously for this tag, it will be replaced by the new
         * style. If a replacement was associated with this tag, the replacement will be removed.
         * Do not include the angle brackets in the tag name.
         *
         * For example:
         * ```
         * // define a <light>...</light> tag
         * var style = new TextStyle(WEIGHT, WEIGHT_LIGHT);
         * box.setStyleForTag("light", style);
         * ```
         *
         * @param tagName the name of the tag (without angle brackets)
         * @param style the TextStyle to be applied to text within this tag
         */
        setStyleForTag(tagName: string, style: TextStyle): void;

        /**
         * Returns the TextStyle associated with the tag, or null if the tag does not
         * have a non-parametric style set (including if it has a replacement or
         * parametric style set).
         *
         * @param tagName the name of the tag (without angle brackets) to fetch the style of
         * @returns the style for the requested tag, or null if it has no, or a different kind, of definition
         */
        getStyleForTag(tagName: string): TextStyle;

        /**
         * Sets a parameter-based style for the given tag. When this tag occurs in the
         * markup text, the factory will be used to create the actual style based on
         * the tag's parameters. This is an advanced feature.
         *
         * The `factory` is an object that implements the interface
         * `ca.cgjennings.layout.ParametricStyleFactory`, which consists
         * of the single method:
         * `TextStyle createStyle(java.lang.String[] parameters)`.
         *
         * tagName : the name of the tag (without angle brackets) to set the factory for
         * factory : a ParametricStyleFactory to be used to generate styles for this tag
         */
        setParametricStyleForTag(tagName: string, factory: JavaObject<"ca.cgjennings.layout.ParametricStyleFactory">): void;

        /**
         * Returns the style factory associated with the tag,
         * or null if the tag does not have a style factory set (including if it has
         * a replacement or style set).
         *
         * @param tagName the name of the tag (without angle brackets) to get the factory for
         * @returns the previously set factory for the tag, or null
         */
        getParametricStyleForTag(tagName: string): JavaObject<"ca.cgjennings.layout.ParametricStyleFactory">;

        /**
         * Sets a replacement string to be associated with a particular tag.
         * When this exact tag occurs in the markup text,
         * it will be replaced by the replacement string.
         *
         * For example:
         * ```
         * // make the <copyright> tag produce the text © when rendering
         * box.setReplacementForTag( "copyright", "©" );
         * ```
         *
         * @param tagName the name of the replacement tag
         * @param replacement the text to replace the tag with
         */
        setReplacementForTag(tagName: string, replacement: string): void

        /**
         * Returns the replacement string associated with the tag, or null
         * if the tag does not have a replacement set (including if it has a style
         * or parametric style set).
         *
         * @param tagName the name of the tag to return the replacement string for
         * @returns the replacement string for the tag, or null
         */
        getReplacementForTag(tagName: string): string;

        /** Removes all tag definitions from the box. */
        removeAllTags(): void;


        /**
         * Sets the default style that is applied to text when no other tags affect it.
         *
         * @param style the TextStyle applied to all text by default
         */
        setDefaultStyle(style: TextStyle): void;

        /**
         * Returns the default style applied to text when
         * no other tags are in effect. By modifying this style you control what
         * "normal" text looks like.
         *
         * For example:
         * ```
         * box.defaultStyle = new TextStyle(
         *     FAMILY, bodyFamily,
         *     SIZE,   7,
         *     WEIGHT, WEIGHT_BOLD
         * );
         * ```
         *
         * You can modify the default style instead of replacing it with a new one.
         * The following changes just the size without affecting other attributes:
         * ```
         * box.defaultStyle.add(SIZE, 10);
         * ```
         *
         * @returns the TextStyle applied to all text by default
         */
        getDefaultStyle(): TextStyle;

        /**
         * Sets the horizontal and vertical alignment of text within a drawn rectangle.
         * This is the logical *or* of one of `LAYOUT_LEFT`, `LAYOUT_RIGHT`,
         * or `LAYOUT_CENTER` with one of `LAYOUT_TOP`, `LAYOUT_BOTTOM`,
         * or `LAYOUT_MIDDLE`. In addition, if the `LAYOUT_JUSTIFY` bit
         * is set, then paragraphs will be fully justified so that they fill the
         * entire region width.
         *
         * For example:
         * ```
         * box.alignment = LAYOUT_CENTER | LAYOUT_TOP | LAYOUT_JUSTIFY;
         * ```
         *
         * @param layoutBits a bitmask of alignment options
         */
        setAlignment(layoutBits: number): void;

        /**
         * Returns the alignment bitmask that describes how text is laid out within
         * a drawn rectangle.
         *
         * For example:
         * ```
         * if((box.alignment & LAYOUT_LEFT) != 0) println( "left-aligned text" );
         * ```
         *
         * @returns the current alignment layout value
         */
        getAlignment(): number;


        /**
         * Sets the horizontal alignment used for text in heading tags
         * (`<h1>`, `<h2>`, and so on). This is similar to [[setAlignment]],
         * but only the horizontal alignment component is used.
         *
         * @param alignment a horizontal alignment option
         */
        setHeadlineAlignment(layoutBits: number): void;

        /**
         * Returns the current horizontal alignment setting for heading tags.
         * 
         * @returns the current heading alignment layout value
         */        
        getHeadlineAlignment(): number;

        /**
         * Sets the distance, in inches, between tab stops.
         *
         * @param tabWidthInInches the gap between tab stops
         */
        setTabWidth(tabWidthInInches: number): void;

        /**
         * Sets the distance, in inches, between tab stops.
         * This method accepts multiple tab positions as an array, which sets a
         * series of variable-width tab stops instead of a fixed tab size.
         *
         * @param tabWidthsInInches the gaps between tab stops
         */
        setTabWidth(tabWidthsInInches: number[]): void;

        /**
         * Returns an array of tab widths, in inches. (If only one stop has been set,
         * the length of the array is 1.)
         */
        getTabWidths(): number[];

        /**
         * Sets the fitting methods that will be used to shrink text that is too long
         * to fit in the text region. One of `FIT_NONE`, `FIT_TIGHTEN_LINE_SPACING`, `FIT_SCALE_TEXT`, or `FIT_BOTH`.
         * 
         * @param fittingMethod the fitting method to use
         */
        setTextFitting(fittingMethod: number): void;

        /**
         * Returns the constant representing the text fitting method to be used
         * to fit text within a region.
         * 
         * @returns the text fitting method
         */
        getTextFitting(): number;

        /**
         * Sets the limit for shrinking text when the `FIT_SCALE_TEXT` fitting metod is enabled. Text will be scaled down to no more than `factor` * 100% of the original size.
         * 
         * @param factor the limit, greater than 0 and less than or equal to 1, to apply to scaling
         */
        setScalingLimit(factor: number): void;

        /**
         * Returns the current scaling limit for text shrinking when the `FIT_SCALE_TEXT` fitting metod is enabled.
         * 
         * @returns the scaling limit factor
         */
        getScalingLimit(): number;

        /**
         * Sets how tightly lines are grouped together. For normal line spacing, use
         * 1.0; double-spaced lines would be 2.0. Values less than 1 reduce the standard
         * amount of space between lines; at 0 the bottom of one line will normally touch
         * or overlap the top of the next. (The exact effect of this setting depends    * on the font being used.)
         *
         * @param tightness the tightness of interline spacing (normally 1.0)
         */
        setLineTightness(tightness: number): void;

        /**
         * Returns the current line tightness.
         * @returns the line spacing tightness value
         */
        getLineTightness(): number;

        /**
         * Sets the *minimum* line tightness that can be used when line spacing is reduced to fit long text due to the `FIT_TIGHTEN_LINE_SPACING` text fitting method.
         *
         * @param  minTightness the smallest amount that line tightness can be reduced to when fitting text
         */
        setTightnessLimit(minTightness: number): void;

        /**
         * Returns the current line tightness limit.
         * @returns the minimum line spacing tightness value
         */
        getTightnessLimit(): number;

        /**
         * Sets the shape that lines of text will conform to.
         * A PageShape is used to flow text around other elements of a component.
         * The default shape is `PageShape.RECTANGLE_SHAPE`, which allows text
         * to cover the entire region passed to the `draw` method.
         *
         * @param shape the desired PageShape
         */
        setPageShape(shape: PageShape);

        /**
         * Returns the shape that drawn text will conform to within the draw region.
         */
        getPageShape(): PageShape;

        /**
         * Processes a markup string, retaining only any definitions that it creates
         * with `<define>` tags. This method clears the current markup text, and
         * setting markup text will clear any library definitions (after using them
         * to process the markup). Therefore, libraries must be parsed again before
         * *each* call to `setMarkupText`.
         *
         * @param definitions a string containing markup definitions
         */
        parseLibrary(definitions: string): void;
    }

    /**
     * A markup box that includes a "gender" attribute represented by
     * an integer number. Tags that consist of two or more segments
     * separated by slashes will be replaced with the text from the
     * segment corresponding to the current gender value. For example,
     * if the markup contains the tag `<this/that>`, then if "gender" is
     * set to 0, the tag will produce `this`, while if the "gender" is
     * 1, the tag will produce `that`. This is commonly used to allow
     * users to write markup that adapts automatically to a character's
     * gender. For example, they might write a sentence like
     * `<He/She/It/They> ate <his/her/its/their> apple.`
     * Note that since closing tags start with a slash,
     * to avoid confusion a dash must be used to indicate an empty string,
     * as in `words of the prophet<-/ess>`.
     * 
     * For backwards compatibility, tags can also be written in the form
     * `<capital option1/option2>` which has the same effect as `<option1/option2>`
     * except that the first letter will be capitalized.
     */
    class GenderMarkupBox implements JavaClass<"ca.cgjennings.layout.GenderAwareMarkupRenderer"> {
        /**
         * Creates a default markup renderer for the specified resolution.
         * Rather than constructing a MarkupBox directly, they are usually
         * created with the `markupBox(sheet)` helper function.
         * 
         * @param ppi the target resolution, in pixels per inch
         */
        constructor(ppi: number);
        
        /**
         * Sets the "gender" value by specifying which text segment to use:
         * 0 (before first slash), 1 (after first slash), 2 (after second slash),
         * and so on.
         * @param gender the gender value to assign
         */
        setGender(gender: number): void;

        /**
         * Returns the "gender" value, that is, the index of which text segment
         * will be selected.
         */
        getGender(): number;

        /**
         * An alternative way of setting the "gender" value if only two values are used.
         * Passing `false` is equivalent to `0`, while passing `true` is
         * equivalent to `1`.
         * @param useRightSideText if true, the text after the slash is used
         */
        setGender(useRightSideText: boolean): void;
    }

    /**
     * Updates a box's `<name>`, `<lastname>`, and `<fullname>` tags using
     * a component's current name. Call this at the start of your painting function
     * before drawing a box's text if you want name tags to work properly.
     * This function sets the name automatically using the text of the component's
     * name property. For more complete control, use the Sheet class's
     * `setNamesForRenderer(markupBox, firstName, lastName, fullName)` method.
     *
     * @param markupbox the box to update
     * @param gameComponent the component (such as a DIY component) to extract names from
     */
    function updateNameTags(markupbox: MarkupBox, gameComponent: JavaClass<"arkham.component.GameComponent"> ): void;

    /**
     * A text style combines one or more style attributes that can be applied to
     * text. A style attribute consists of a *style key* and an appropriate value,
     * such as `SIZE` and `12`. If an attribute is added to an existing style that
     * already contains that attribute, the new value replaces the old one.
     */
    class TextStyle implements JavaClass<"ca.cgjennings.layout.TextStyle"> {
        /**
         * Creates a new text style, adding the specified style attributes, if any.
         * 
         * @param key1 the first style key
         * @param value1 the value of the first style key
         * @param moreKeyValuePairs additional pairs of styles and their values
         */
        constructor(key1?: StyleKey, value1?, ...moreKeyValuePairs);

        /**
         * Merges one or more styles attributes into this style.
         * 
         * @param key1 the first style key
         * @param value1 the value of the first style key
         * @param moreKeyValuePairs additional pairs of styles and their values
         */
        add(key1, StyleKey, value1, ...moreKeyValuePairs): void;

        /**
         * Merges all of the style attributes of the specified style into this style.
         * 
         * @param styleToMerge the style to merge into this one
         */
        add(styleToMerge: TextStyle): void;

        /**
         * Returns the value of the style attribute with the specified key, or null
         * if this style does not modify that key.
         * 
         * @param key the key to find the value for
         * @returns the value that the specified key is set to, or null
         */
        get(key: StyleKey): any;

        /**
         * Removes the style attribute with the specified key from the style.
         * Has no effect if the style does not contain an attribute with that key.
         * 
         * @param key the key to remove
         */
        remove(key: StyleKey): void;        
    }

    /** The possible style keys. */
    type StyleKey = FAMILY|WEIGHT|WIDTH|POSTURE|SIZE|SUPERSCRIPT|FONT_OBJECT|PAINT|BGPAINT|UNDERLINE|STRIKETHROUGH|SWAP_COLORS|LIGATURES|TRACKING;

    /**
     * The value of this attribute is a string that names the font family to be used.
     * The following "standard family names" are defined for convenience:
     *
     * `FAMILY_BODY` the standard Strange Eons body text font, if the core fonts
     *     library is installed (and otherwise a stand-in font)  
     * `FAMILY_SERIF` a default serif family  
     * `FAMILY_SANS_SERIF` a default sans-serif family  
     * `FAMILY_MONOSPACED` a default monospace family
     */    
    type FAMILY = any;
    /** A predefined value for the `FAMILY` style that results in the standard Strange Eons body text font. */
    const FAMILY_BODY;
    /** A predefined value for the `FAMILY` style that results in a serif font family. */
    const FAMILY_SERIF;
    /** A predefined value for the `FAMILY` style that results in a sans serif font family. */
    const FAMILY_SANS_SERIF;
    /** A predefined value for the `FAMILY` style that results in a monospace/typewriter type font family */
    const FAMILY_MONOSPACED;

    /**
     * The value of this attribute controls the text weight.
     * 
     * **Note:** The effectiveness of this attribute relies
     * on underlying support from the platform and JRE. Some weights
     * may have no effect. (The regular and bold weights should
     * always be available.)
     */
    type WEIGHT = any;
    /** A predefined value for the `WEIGHT` style. */
    const WEIGHT_EXTRALIGHT;
    /** A predefined value for the `WEIGHT` style. */
    const WEIGHT_LIGHT;
    /** A predefined value for the `WEIGHT` style. */
    const WEIGHT_DEMILIGHT;
    /** A predefined value for the `WEIGHT` style. This is the default weight. */
    const WEIGHT_REGULAR;
    /** A predefined value for the `WEIGHT` style. */
    const WEIGHT_SEMIBOLD;
    /** A predefined value for the `WEIGHT` style. */
    const WEIGHT_MEDIUM;
    /** A predefined value for the `WEIGHT` style. */
    const WEIGHT_DEMIBOLD;
    /** A predefined value for the `WEIGHT` style. */
    const WEIGHT_BOLD;
    /** A predefined value for the `WEIGHT` style. */
    const WEIGHT_HEAVY;
    /** A predefined value for the `WEIGHT` style. */
    const WEIGHT_EXTRABOLD;
    /** A predefined value for the `WEIGHT` style. */
    const WEIGHT_ULTRABOLD;

    /**
     * The value of this attribute controls the text width.
     */
    type WIDTH = any;
    /** A predefined value for the `WIDTH` style. */
    const WIDTH_CONDENSED;
    /** A predefined value for the `WIDTH` style. */
    const WIDTH_SEMICONDENSED;
    /** A predefined value for the `WIDTH` style. This is the default width. */
    const WIDTH_REGULAR;
    /** A predefined value for the `WIDTH` style. */
    const WIDTH_SEMIEXTENDED;
    /** A predefined value for the `WIDTH` style. */
    const WIDTH_EXTENDED;

    /**
     * The value of this attribute controls the text posture (such as italic).
     */
    type POSTURE = any;
    /** A predefined value for the `POSTURE` style. This is standard upright text. */
    const POSTURE_REGULAR;
    /** A predefined value for the `POSTURE` style. This is italic or slanted text. */
    const POSTURE_OBLIQUE;

    /**
     * The value of this attribute is a number controlling the point size of text.
     */
    type SIZE = any;

    /**
     * The value of this attribute is an integer number indicating the number super-
     * or subscript levels should be in effect. It is normally 0; positive numbers
     * indicate superscript levels while negative numbers indicate subscript levels.
     */
    type SUPERSCRIPT = any;
    /** A predefined value for the `SUPERSCRIPT` style indicating one level of superscript. */
    const SUPERSCRIPT_SUPER;
    /** A predefined value for the `SUPERSCRIPT` style indicating one level of subscript. */
    const SUPERSCRIPT_SUB;

    /**
     * The value of this attribute is a `java.awt.Font` instance that specifies an exact font to use.
     */
    type FONT_OBJECT = any;


    /** A `Paint` instance (which includes colours) that specifies the foreground colour of text. */
    type PAINT = any;
    /** Synonym for [[PAINT]]. */
    type COLOR = BGPAINT;
    /** Synonym for [[PAINT]]. */
    type COLOUR = BGPAINT;

    /** A `Paint` instance (which includes colours) that specifies the background colour of text. */
    type BGPAINT = any;
    /** Synonym for [[BGPAINT]]. */
    type BGCOLOR = BGPAINT;
    /** Synonym for [[BGPAINT]]. */
    type BGCOLOUR = BGPAINT;

    /**
     * The value of this attribute controls whether foreground and background paint are swapped.
     */
    type SWAP_COLORS = any;
    /** Synonym for [[SWAP_COLORS]]. */
    type SWAP_COLOURS = SWAP_COLORS;
    /** A predefined value for the `SWAP_COLORS` style that enables swapping. */
    const SWAP_COLORS_ON;
    /** Synonym for [[SWAP_COLORS_ON]]. */
    const SWAP_COLOURS_ON;    

    /**
     * The value of this attribute controls text underlining.
     */
    type UNDERLINE = any;
    /** A predefined value for the `UNDERLINE` style that enables an underline effect. */
    const UNDERLINE_ON;   

    /**
     * The value of this attribute controls the text strikethrough effect.
     */
    type STRIKETHROUGH = any;
    /** A predefined value for the `STRIKETHROUGH` style that enables strikethrough. */
    const STRIKETHROUGH_ON;

    /**
     * The value of this attribute controls whether ligature replacement is performed.
     */
    type LIGATURES = any;
    /** A predefined value for the `LIGATURES` style that enables ligature replacement. */
    const LIGATURES_ON;
    
    /**
     * The value of this attribute is a number that controls tracking (spacing between letters). A value of 0 provides standard spacing; positive values increase
     * inter-letter spacing, while negative values move letters closer together.
     */
    type TRACKING = any;
    /** A predefined value for the `TRACKING` style that results in tighter than normal tracking. */
    const TRACKING_TIGHT;
    /** A predefined value for the `TRACKING` style that results in looser than normal tracking. */
    const TRACKING_LOOSE;

    /**
     * Shapes the left and right margins of drawn text to flow text around shaped edges.
     * A shape is defined in terms of insets relative to the original margins
     * specified by the region passed to [[draw]].
     * A MarkupBox will query the PageShape with a range of Y-positions
     * covered by a line of text, and the shape must return the narrowest (largest)
     * inset within that range.
     * Positive inset values reduce the margins by moving a side inward;
     * negative values increase them. A zero inset leaves the margin unchanged.
     *
     * To create a new shape, subclass PageShape and override
     * `getLeftInset` and `getRightInset`. Optionally, you can
     * also override `debugDraw` to draw lines indicating how the margins
     * have changed. If you do not override this method, then no margin lines
     * (dashed blue lines) will be drawn when **Show Regions** is active.
     *
     * In addition to creating your own shapes, a number of predefined shapes
     * are available to handle common cases.
     */
    class PageShape implements JavaClass<"ca.cgjennings.layout.PageShape"> {
        constructor();

        /**
         * Returns the narrowest left edge inset between `y1`
         * and `y2`. It is guaranteed that `y1 <= y2`.
         * 
         * @param y1 the top of the Y-range
         * @param y2 the bottom of the Y-range
         * @returns the maximum inset within the specified range
         */
        getLeftInset(y1:number, y2:number): number;

        /**
         * Returns the narrowest right edge inset between `y1`
         * and `y2`. It is guaranteed that `y1 <= y2`.
         * 
         * @param y1 the top of the Y-range
         * @param y2 the bottom of the Y-range
         * @returns the maximum inset within the specified range
         */
        getRightInset(y1:number, y2:number): number;

        /**
         * Called when a markup box is drawn and **Show Regions** is active.
         * This method should draw lines or curves to indicate the shape visually.
         * The passed-in graphics context will already have been initialized with
         * an appropriate stroke, paint, and transform.
         *
         * @param g the graphics context to draw the shape into
         * @param rect the text drawing region to draw the margins for
         */
        debugDraw(g: JavaObject<"java.awt.Graphics2D">, rect: common.Region|JavaObject<"java.awt.Rectangle">): void;

        /** A shared instance of the default shape, which has no effect on the text margins. */
        static RECTANGLE_SHAPE: PageShape;

    }
    namespace PageShape {
        /** A PageShape subclass that modifies all Y-positions by a constant amount; useful with CompoundShape. */
        class InsetShape {
            constructor(leftInset:number , rightInset:number );
        }

        /**
         * A PageShape subclass that is optimized for the most common case: a rectangle that becomes wider or narrower after a certain Y-position is reached.
         * For example:
         * ```
         * i1        i2              i1      i2
         *  +--------+                +------+
         *  |        |                |      |
         *  |        |       or       |      |
         *  +--+  +--+  y          +--+      |  y
         *     |  |                |         |
         *     +--+                +---------+
         *    i3  i4              i3         i4 (same as i2)
         * ```
         */
        class CupShape {
            /**
             * Creates a new CupShape that switches from insets
             * `i1`, `i2` to `i3`, `i4` at Y-position `y`.
             * @param i1 the left inset to use in the top part of the shape
             * @param i2 the right inset to use in the top part of the shape
             * @param y the Y-coordinate at which the insets switch from top to bottom
             * @param i3 the left inset to use in the bottom part of the shape
             * @param i4 the right inset to use in the bottom part of the shape
             */
            constructor(i1:number, i2:number, y:number, i3:number, i4:number );
        }

        /**
         * A PageShape that switches between two shapes
         * at a specified Y-position. This may be used to build more complex shapes
         * from simpler ones. Either or both of the shapes may themselves
         * be CompoundShapes.
         *
         * The following example uses a compound shape to create a "plus" or
         * "double cup" shape, that is, a cup shape that flows around decorations
         * in up to four corners (as opposed to CupShape, which
         * handles no more than two):
         * ```
         * // Create a "double cup" shape with this form:
         * //
         * //                 i1    i2
         * //                 +------+
         * //                 |      |
         * //             0 +-+      +-+ 0  y1
         * //               |          |
         * //             0 +---+  +---+ 0  y2
         * //                   |  |
         * //                   +--+
         * //                  i3  i4
         *
         * new PageShape.CompoundShape(
         *     new PageShape.CupShape( i1, i2, y1, 0, 0 ),
         *     y2,
         *     new PageShape.InsetShape( i3, i4 )
         * );
         * ```
         */
        class CompoundShape {
            /**
             * Creates a new CompoundShape that uses `topShape`
             * until the Y-position `y` is reached, then switches to `bottomShape`.
             *
             * @param topShape the shape to use above `y`
             * @param y the Y-position at which to switch shapes
             * @param bottomShape the shape to use below `y`
             */
            constructor(topShape: PageShape, y: number, bottomShape: PageShape);
        }

        /**
         * A PageShape that merges two shapes by always returning the narrowest margin
         * at a given point. For example, merging a shape with `RECTANGLE_SHAPE` would
         * eliminate any negative margin (which lets the text escape from the specified region).
         */
        class MergedShape {
            /**
             * Creates a new shape that merges both of the specified shapes.
             * @param shape1 the first shape
             * @param shape2 the second shape; order does not matter
             */
            constructor(shape1: PageShape, page2: PageShape);
        }

        /**
         * A PageShape that adjusts the margins to follow the outline of
         * an arbitrary shape such as a polygon, circle, ellipse, etc.
         * The left and right margins will be adjusted to touch the leftmost and rightmost
         * edges of the shape (respectively).
         * The supplied shape must be transformed so that it intersects with the
         * drawn region prior to creating the shape. As creating a GeometricShape
         * is fairly expensive, it is recommended that you create them ahead of time
         * and reuse them where possible, as opposed to creating them each time a
         * painting function is called.
         */
        class GeometricShape {
            /**
             * A shape whose outline will contrain the drawn text.
             * @param outline the arbitrary shape to conform to
             */
            constructor(outline: JavaObject<"java.awt.Shape">);
        }
    }

    /** Do not try to fit text that is too long to fit in the given region. */
    const FIT_NONE: number;
    /** Fit long text by shrinking it down. */
    const FIT_SCALE_TEXT: number;
    /** Fit long text by reducing line spacing. */
    const FIT_TIGHTEN_LINE_SPACING: number;
    /** Fit text by shrinking it and reducing the space between lines. */
    const FIT_BOTH: number;

    /** Left-align lines of text. */
    const LAYOUT_LEFT: number;
    /** Center lines of text. */
    const LAYOUT_CENTER: number;
    /** Right-align lines of text. */
    const LAYOUT_RIGHT: number;
    /** Vertically align text to the top of the region. */
    const LAYOUT_TOP: number;
    /** Vertically center text within the region. */
    const LAYOUT_MIDDLE: number;
    /** Vertically align text to the bottom of the region. */
    const LAYOUT_BOTTOM: number;
    /** Lines will be justified to fit the width of the region. */
    const LAYOUT_JUSTIFY: number;
}