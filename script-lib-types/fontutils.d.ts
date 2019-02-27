/**
 * # fontutils library
 * 
 * Defines the `FontUtils` object, which helps you find and register fonts.
 * Include this library by adding `useLibrary("fontutils")` to your script.
 */
declare module fontutils {
    /**
     * An object that defines a number of font-related utility functions.
     */
    const FontUtils: {
        /**
         * Returns a font family name that is available on this system.
         * The specified `families` list is a comma-separated list of
         * font family names. This function will return the name of
         * the first family in the list that is available on the device.
         * If none of the families are available, then the `defaultFamily`
         * is returned. This may be `null`, but if it is not specified then
         * a standard cross-platform serif family is returned.
         * 
         * @param families a comma-separated list of font families to try to match, in order from most to least preferred
         * @param defaultFamily an optional default to return if no family matches; if null then null is returned; if not specified then the default body family is returned
         * @returns the first installed font family, or the default value.
         */        
        findMatchingFamily(familyList: string, defaultFamily?: string|null): string|null;

        /**
         * Returns an array of all of the available font families on this
         * device, including any fonts that have been successfully registered.
         * 
         * @return the family names of the fonts available on this device
         */
        availableFontFamilies(): string[];

        /**
         * Create a typeface family by loading fonts from font resource files and registering their names as installed fonts.
         * 
         * The files are determined by looking up the specified setting key in
         * the current $-settings. The value of the key must be a
         * comma-separated list of font file resources. List entries after the
         * first will use the same resource folder as the first entry if they
         * do not include a `/` character. For example, the following would
         * load and register a family of two font files stored in the
         * `foo/bar/fonts` resource folder:
         * 
         * `foo/bar/fonts/snowball-regular.ttf, snowball-italic.ttf`
         * 
         * Once registered, a font can be created by passing its family name
         * to the Font constructor. It can also be used in markup box style
         * settings.
         *
         * Supported font formats include TrueType (`.ttf`), OpenType (`.otf`),
         * and PostScript Type 1 fonts. The file extension used for the 
         * resource file name must be correct for the format of the font 
         * resource, or font creation will fail. Note that not all fonts
         * of a particular type may be supported; you can test fonts with the
         * [Typeface viewer](https://cgjennings.github.io/se3docs/dm-type-viewer.html).
         *
         * @param key the setting key containing the list of font files
         * @returns the font family name of the registered family
         */
        registerFontFamily(key: string): string;

        /**
         * Creates a typeface family directly a list of resource paths.
         * This function behaves the same as [[registerFontFamily]]
         * except the the list of font resources is passed to the function
         * directly rather than being looked up from a key.
         *
         * @param fontResourcePaths one or more arguments denoting location of the font files that make up the family
         * @returns the font family name of the registered family
         */
        registerFontFamilyFromResources(...fontResourcePaths: string[]): string;
    };
}