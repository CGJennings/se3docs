# Change components without breaking old save files

Sooner or later you'll want to add new features to your DIY component, or alter an existing feature. Ideally, the updated version of your plug-in should be *backwards compatible*. That is, users should still be able to read files saved using the older version of the component in the new version of the plug-in. That way, users don't have to recreate their work.

There are two kinds of component upgrade you might want to perform:

1. Altering the design of an existing component. For example, adding a new feature or changing the rules for how an existing feature works. For changes like this, you normally want to use the built-in *versioning* feature. This lets you detect when the component being loaded was saved from an old version of your plug-in, and make any changes needed to make it compatible with the current version.
2. Transitioning a component from its original class (as determined by its [class map entry](dm-res-classmap.html)) to a new class. For example, you might want to switch from using a DIY script for the component to using compiled code. Or you might want to offer an optional upgrade path to allow components created for an older edition of a game to be recreated in the newest edition.

This article covers both techniques, starting with using the versioning feature.

## Versioning and `onRead`

To make it easier to upgrade old components smoothly, DIY components include a special property, `version`. A new component design will be assigned a `version` of 1. Each time you change the component in an incompatible way, you will increment this to the next number (2, 3, 4, and so on). Assign the new version number during `onCreate`.

> Be aware that `version` is an **integer** property. Do not try to use fractional version numbers like 1.0, 1.1, 1.2 and so on. The fraction will be dropped, so these will all appear to be version 1!

By switching to a new number each time you change the component in an incompatible way, you can tell which version of a component you are dealing with. You can then write an `onRead` function that checks this version number and makes any changes that are needed to bring the component up to date.

Here is an example of what that code can look like:

```js
function create( diy ) {
    // the current version, as implemented by this version
    // of the script; older versions will be 1 or 2 and
    // the next version will be 4
    diy.version = 3;
    // ...
}
     
function onRead( diy, objectInputStream ) {
    // if we are reading in an old version of the card, it will
    // have a diy.version less than the current version of 3
    //
    // a good approach is to add code to upgrade each version
    // in turn (1 to 2, 2 to 3, and so on), like this:
    
    // we are opening a version 1 card
    if( diy.version < 2 ) {
        $newFeatureAddedInVersion2 = 'default value for this feature';
    }
    // we are opening a version 1 or 2 card
    if( diy.version < 3 ) {
        $firstNewFeatureAddedInVersion3 = 'the default for this feature';
        $secondNewFeatureAddedInVersion3 = 'and the default for this one';

        // since we added defaults for all the new stuff, this card is now
        // version 3 (the current version); if we don't update this, then
        // the card will still appear to be version 1 the next time it is
        // opened the default values will be set again, wiping out any edits
        diy.version = 3;
    }
}
```

### Dealing with common kinds of changes

#### New features with missing defaults

The main source of compatibility issues is that when you open an old component, it won’t have the default private settings value for any *new* features you have added. These defaults are set when the component is first created (when `onCreate` is called).

This problem manifests when Strange Eons tries to create the editor or paint a component face: it looks for the setting to see how to configure the control or what to paint, and when it isn’t there the result is probably a reference error, null pointer exception, or missing content.

To fix the problem, you need to able to detect the missing settings and set them to sensible defaults. Generally, when adding a new feature you will want to set the default value when upgrading old components so that the new feature is turned off, even if the default for new components is to turn it on. The old card should be updated in a way that it will appear and play as close as possible to how it would in the previous version of the plug-in.

#### Reusing an existing setting with different meanings

A related problem arises when you change how you use an existing setting. You might change how you interpret the value, or you might implement some features in a different way, so that some settings become obsolete. In this case, your goal will be to convert the way the feature is expressed in the previous version to the closest equivalent in the new version. As with new features, remember that you want the component to be as faithful as possible to how it would have appeared in the previous version.

#### Configuration changes

A third kind of incompatible change is a change in the basic DIY configuration, for example, switching to a more complex `FaceStyle`. For this reason, properties that can normally only be set during the `onCreate` function can also be modified in `onRead`. Although changing the properties themselves is simple, properly updating the component will typically also involve adding or converting other features as described above.

#### Changing the base key name of a `DefaultPortrait`

This is actually not all that common, but it does require special handling. `DefaultPortrait` objects are used to perform custom handling of [portraits in a DIY component](dm-diy-portraits.md). If the base key name of a portrait changes between versions, you need to replace the old `DefaultPortrait` that is read from the file to a new one that is created by calling code similar to the following:

```js
function onRead(diy, ois) {
    // ...
    portrait = ois.readObject();
    if(diy.version < VERSION_THAT_THE_KEY_NAME_CHANGED) {
        // replace the old portrait we just read in with an instance using the new key
        portrait = new DefaultPortrait(portrait, "new-base-key");
    }
}
```

## Transitioning to a new component class

When versioning is insufficient, you can instead convert a component to an entirely new component type, either automatically when the component is loaded or when requested by the user. Anyone can write a script to convert a component on request, but to automatically convert a component you must be the current maintainer of the extension plug-in for that component type.

### Automatically converting a component

To automatically convert a component when it is read in, modify the `onRead` function of the *old* component type to start the process. This is done by calling the [`convertToComponentType`](assets/javadoc/ca/cgjennings/apps/arkham/diy/DIY.html#convertToComponentType(java.lang.String)) method of the `DIY` object passed to `onRead`. This must be called with the class map name of the new component type. If the new component type is defined in a different extension plug-in, you can also pass a string that describes that extension and either a [UUID or CatalogueID](dm-eons-plugin.html#catalogue-information) string for the extension. You can use a UUID if any version of the extension will work, or a Catalogue ID to require at least the version described the ID. For example:

```js
function onRead(diy, ois) {
    // ... existing loading code
    diy.convertToComponentType(
        "diy:fancy/new-diy.js",
        "Fancy Game (fancy.seext)",
        "CATALOGID{a1dcdc16-313b-4b4c-b566-e24833ed2b21:2021-10-5-18-10-21-14}"
    );
}
```

This would begin conversion to the component defined by the `new-diy.js` script in the `resources/fancy` folder of the "Fancy Game" extension, which has the specified Catalogue ID (or a newer version).

Calling this function signals that the game component should be converted. Conversion proceeds as follows:

1. Strange Eons finishes loading the old game component.
2. If you specified the ID of a required plug-in, and that plug-in is not installed, the conversion will be cancelled. Depending on why the component was being loaded, the user may be prompted to install the required extension automatically.
3. A new game component of the type being converted *to* is created. If this fails (for example, if its plug-in is not installed), the conversion will be cancelled.
4. A [`ConversionSession`](assets/javadoc/ca/cgjennings/apps/arkham/component/conversion/ConversionSession.html) is created to support the conversion process. This object has methods to help you transfer features from the old component to the new one.
5. If the old component defines a function named `onConvertFrom`, it is called with the old component and the session object.
6. If the new component defines a function named `onConvertTo`, it is called with the new component and the session object.
7. Once both versions of the component have had a chance to influence the conversion process, some automatic conversion steps are performed. This consists of copying the component's name, design rationale comments, any expansion symbols set on the component (using the built-in [expansion symbol system](dm-register-game.html)), and the component's portrait images. The automatic conversion steps can be disabled, if required, from `onConvertFrom` or `onConvertTo`.
8. Finally, the new game component is substituted for the old one. For example, if you were opening the old component using **File&nbsp;> Open**, a new editor tab is added to the app window that contains the new component.

Here is an example of an `onConvertFrom` function that you might add to the old component's script file:

```js
function onConvertFrom(diy, session) {
    // prevent the usual automatic conversion steps
    session.disableAutomaticConversion();
    // copy the component name and design comments
    session.copyName().copyComment();
    // copy the exisitng portrait, but to a different portrait slot
    // (the new component has a different kind of portrait in slot 0)
    session.copyPortrait(0, 1, true);
    // copy some of the existing private settings
    // (in the new component, these properties are used the same way)
    session.copySettings("gold", "inventory", "leftHand", "rightHand");
    // copy an old setting to a different setting name:
    // (in the new component, a character can wear two rings and there
    // is more than one type of armour)
    session.moveSettings("wornRing", "leftHandRing", "armour", "chestArmour");
    // write a specific setting on the new component
    // (the new component has a property "type" that wasn't used by the old
    // component, and we want the initial value to be different than that
    // set by the new component's onCreate function)
    session.setSettings("type", "simple");
}
```

> The `ConversionSession` object uses a *fluent* API where possible, so transfer methods like those above can be chained together. This lets you write simple conversions in an easy to read style:
>
> ```js
> function onConvertFrom(diy, session) {
> 	session
>         .copyPortrait(0, 1, false)
>         .copyAllSettingsExcept("game", "money")
>         .moveSettings("money", "treasure");
> }
> ```

### Converting a component on demand

It may be the case that converting to the new component type should be optional. For example, suppose there are plug-ins for two different editions of a game. It might be nice to offer the ability to import content from cards made for the old edition to the closest equivalent in the new edition. This could save a lot of manual copying and pasting for users. However, this conversion should never be forced upon the user since they may not have access to the new edition, or may prefer to use the old edition. For cases like this, the conversion process can also be triggered on demand rather than when the component is being loaded.

> The process for an on-demand conversion is almost the same as that for an automatic one. If you have not already read the previous section, you should do so before continuing.

The primary difference between an automatic conversion and an on-demand conversion is in how it is initiated. For an on demand conversion, you have to do a little more of the work yourself. You'll need:

1. An instance of the old component that you want to convert.
2. A [`ConversionTrigger`](assets/javadoc/ca/cgjennings/apps/arkham/component/conversion/ConversionTrigger.html), which requires:
   1. The same class name, optional plug-in description and optional ID passed to `convertToComponentType` as described in the previous section.
   2. A `cause`, which is a string that describes the nature of the upgrade.

> When a component calls `convertToComponentType` during its `onRead` function, the conversion that is performed will have a trigger of type `UpgradeConversionTrigger`, which returns `"upgrade"` as the cause. By using a different cause string for your on demand conversion, the conversion logic you use in `onConvertFrom` or `onConvertTo` can be customized for different kinds of upgrades.

In the vast majority of cases, a simple trigger is all that is required. There is a factory method provided for these cases to make it trivial to create a trigger from script code:

```js
const trigger = arkham.component.conversion.ConversionTrigger.create(
    // the cause
    "1st-ed-to-2nd-ed",
    // the class map name of the new component
    "diy:fancy/new-diy.js",
    // the (optional) extension description and UUID/CatalogID
    "Fancy Game (fancy.seext)",
    "CATALOGID{a1dcdc16-313b-4b4c-b566-e24833ed2b21:2021-10-5-18-10-21-14}"
);
```

> For complex conversion cases, you might want to pass arbitrary objects between the old and new components. For those cases you can implement your own `ConversionTrigger` subclass to contain those objects.

Once you have the old component and a valid trigger, you are ready to perform the conversion:

```js
let newGameComponent;
try {
    newGameComponent = arkham.component.conversion.ConversionSession.convertGameComponent(
        // the prepared ConversionTrigger
        trigger,
        // the game component to convert
        oldGameComponent,
        // if true, prompt to install the required extension if possible
        true
    );
} catch (ex) {
    // if conversion fails (for example, due to not having the required extension),
    // convertGameComponent will throw a ConversionException
    println("conversion failed: " + ex);
}
```

The conversion process follows the same steps as in automatic conversion, except that in the first step the component is already "loaded" and in the last step the new component is returned from `convertGameComponent` but no other action is performed. So, for example, if you wanted to open a new document tab for the converted component you would need to do that yourself with `Eons.addEditor(newGameComponent.createDefaultEditor());`.
