/**
 * # extension library
 * 
 * When included in a plug-in script by calling `useLibrary("extension")`,
 * this library converts that plug-in into an
 * [extension plug-in](https://cgjennings.github.io/se3docs/dm-plugin-types.html).
 * It must still be packaged as a `.seext` bundle to be discovered and
 * loaded at the correct time.
 * 
 * The library will define a suitable `getPluginType()` function on the
 * script's behalf. It will also import a number of classes that are
 * commonly used when writing extension plug-ins.
 * 
 * Extensions are loaded and executed before the program is
 * fully initialized. The variables `Editor` and
 * `Component` will be null. However, a valid `PluginContext` object is 
 * provided. Extensions are never "activated" by the user, so they do
 * not require or use a `run()` function.
 */
declare module extension {
    /** The `gamedata.Game` class. */
    type Game = JavaObject<"gamedata.Game">;
    /** The `gamedata.Expansion` class. */
    type Expansion = JavaObject<"gamedata.Expansion">;
    /** The `gamedata.ClassMap` class. */
    type ClassMap = JavaObject<"gamedata.ClassMap">;
    /** The `gamedata.ExpansionSymbolTemplate` class. */
    type ExpansionSymbolTemplate = JavaObject<"gamedata.ExpansionSymbolTemplate">;
    /** The `gamedata.AbstractExpansionSymbolTemplate` class. */
    type AbstractExpansionSymbolTemplate = JavaObject<"gamedata.AbstractExpansionSymbolTemplate">;
    /** The `gamedata.SymbolVariantUtilities` class. */
    type SymbolVariantUtilities = JavaObject<"gamedata.SymbolVariantUtilities">;
    /** The `gamedata.TileSet` class. */
    type TileSet = JavaObject<"gamedata.TileSet">;
    /** The `gamedata.Silhouette` class. */
    type Silhouette = JavaObject<"gamedata.Silhouette">;

    /**
     * Declares this plug-in script to be an `EXTENSION` plug-in.
     * 
     * @returns the code for an `EXTENSION` plugin
     */
    function getPluginType(): number;
}