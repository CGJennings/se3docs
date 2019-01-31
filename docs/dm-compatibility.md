# Changing components without breaking old save files

Sooner or later you'll want to add new features to your DIY component, or alter an existing feature. Ideally, the updated version of your plug-in should be *backwards compatible*. That is, users should still be able to read files saved using the older version of the component in the new version of the plug-in. That way, users don't have to recreate their work.

## Versioning and `onRead`

To make it easier to upgrade old components smoothly, DIY components include a special property, `version`. A new component design will be assigned a `version` of 1. Each time you change the component in an incompatible way, you will increment this to the next number (2, 3, 4, and so on). Assign the new version number during `onCreate`.

> Be aware that `version` is an **integer** property. Do not try to use fractional version numbers like 1.0, 1.1, 1.2 and so on. The fraction will be dropped, so these will all appear to be version 1!

By assigning a new number each time you change the component in an incompatible way, you can tell which version of a component you are dealing with. You can then write an `onRead` function that checks this version number and makes any changes that are needed to bring the component up to date.

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

## Dealing with common kinds of changes

### New features with missing defaults

The main source of compatibility issues is that when you open an old component, it won’t have the default private settings value for any *new* features you have added. These defaults are set when the component is first created (when `onCreate` is called).

This problem manifests when Strange Eons tries to create the editor or paint a component face: it looks for the setting to see how to configure the control or what to paint, and when it isn’t there the result is probably a reference error, null pointer exception, or missing content.

To fix the problem, you need to able to detect the missing settings and set them to sensible defaults. Generally, when adding a new feature you will want to set the default value when upgrading old components so that the new feature is turned off, even if the default for new components is to turn it on. The old card should be updated in a way that it will appear and play as close as possible to how it would in the previous version of the plug-in.

### Reusing an existing setting with different meanings

A related problem arises when you change how you use an existing setting. You might change how you interpret the value, or you might implement some features in a different way, so that some settings become obsolete. In this case, your goal will be to convert the way the feature is expressed in the previous version to the closest equivalent in the new version. As with new features, remember that you want the component to be as faithful as possible to how it would have appeared in the previous version.

### Configuration changes

A third kind of incompatible change is a change in the basic DIY configuration, for example, switching to a more complex `FaceStyle`. For this reason, properties that can normally only be set during the `onCreate` function can also be modified in `onRead`. Although changing the properties themselves is simple, properly updating the component will typically also involve adding or converting other features as described above.