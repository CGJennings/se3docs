# Release notes

## Next

The following changes are planned for inclusion in the next update. This list is *informational only*: nothing here is final until the update is actually published. Some items may be deferred or abandoned, and other items may be added at any time. In particular, changes to the APIs and script engine have the potential to introduce compatibility issues with plug-ins which might lead to those features being delayed, changed, or withdrawn.

This is an **early access beta release**.

### Features and enhancements

* Added arm64 support for Linux.
* LCD text antialiasing is enabled by default on Linux, with a command line option to change the antialiasing mode.
* The command line option `--xDisableJreCheck` skips the normal Java version checking performed at startup, allowing developers and expert users to try running the app with unsupported Java versions.

### For plug-in developers

* The method `StrangeImage.exists(identifier)` can be used to check whether a portrait-style image path points to a real image.
* The method `StrangeImage.getAsBufferedImage` works like `StrangeImage.get` but converts vector images directly into bitmaps. (Prefer `StrangeImage.get` where possible.)
* The `PlatformSupport.PLATFORM_IS_OSX` constant has been deprecated with no intention to remove. Instead, use `PlatformSupport.PLATFORM_IS_MAC`.

### Other changes

* The now meaningless command line option `xDisableFX` has been removed.
* Plug-in catalog now uses https by default.

### Bug fixes

* Double clicking an item in a list in the deck editor could result in an infinite loop trying to fit the item.

### Pack 200 transition

Publishing a plug-in bundle (preparing it for a catalog by creating a file ending in `.pbz`, `.pgz`, or `.plzm`) no longer applies Pack200 compression as part of the publication process. This change is necessary for Strange Eons to run under Java 14+, which drops support for Pack200. Existing plug-ins in the official catalog have been re-published without Pack200. (Older versions of Strange Eons can detect that Pack200 was not applied and will correctly install the repacked versions.) **If you operate a third party plug-in catalog**, you must re-publish your plug-ins as well. You can do this as follows:
1. Make sure you have a plain bundle for each published plug-in. A published bundle can be unpacked to a plain bundle by opening (double clicking) it in a project. *This must be done using build 4163 or earlier.*
2. Now start any build of Strange Eons *after* build 4163.
3. Using your catalog tools task folder, copy all of your plain plug-in bundles to the **Staging Area**.
4. Right click on the **Publish to Local Catalog** script (![robot](images/project/auto.png) icon), and choose **Open**.
5. Find the line `const FORCE_OVERWRITE = false;` and change `false` to `true`.
6. Right click on the script editor and choose **Run file**.
7. Wait for the published bundles to be rebuilt.
8. Change the `true` back to `false`, then save and close the script file.
9. Upload the contents of the **Upload Queue** to your catalog server as you normally would.

## Build 4163

This is a **production** (non-beta) release.

*This description combines **all** changes from interim releases since the last production version, which was build 3784.*

### Features and enhancements

* Added support for Mac computers with Apple silicon.
* [Ink Saver](um-gc-preview.md#ink-saver), a new rendering mode which draws the bare minimum to speed up design and reduce ink/toner use when testing. The standard behaviour (which can be customized for particular components) is to draw a solid white background, text, and shapes (no images).
* The ["Readme" Web page](um-gc-export.md#the-readme-file) that is included with exported images has been rewritten to modern Web standards, including support for printing (at correct size) and mobile devices.
* Help buttons link to the new open source [documentation](index.md).

* The recent file menu now lists projects before other files; within each section the items are still listed from most to least recently used.
* [Typeface viewer](dm-type-viewer.md)/insert character dialog:
  * press <kbd>Enter</kbd> (<kbd>Shift</kbd>+<kbd>Enter</kbd>) to move to the next (previous) character *actually supported* by the font;
  * highlights the following cell types using different colours: control characters, code points not supported by selected font, unassigned code points;
  * whole rows with no assigned Unicode code points are hidden;
  * enter a hexadecimal code point (e.g., `u+2c7e`) in the search field to go to that code point (or the nearest valid row).
* The `--plugintest` command line option can now be passed multiple test bundles separated by the path separator character (`;` on Windows, `:` elsewhere).

### For plug-in developers

* A host of script engine updates bring the JS engine close to ES6 level. This includes arrow functions, object/class methods, destructuring assignment improvements, new native JS object methods, and many bug fixes and performance improvements. More details and examples of these changes can be found under the notes for beta build 3970.
* [Improved scripting (JS) API documentation](assets/jsdoc/) is now in beta. This corrects and expands existing documentation, links to the Java API when relevant, and includes basic documentation for built-in JS objects (`Array`, `Function`, and so on). The [Typescript definition files](https://github.com/CGJennings/se3docs/tree/master/script-lib-types) used to generate these docs are included in the se3docs repository. Suggestions, corrections, and improvements welcome. The [original JS API documentation](assets/jsdoc-legacy/) is still available during the transition.
* The `DefaultPortrait.setSyntheticEdgeLimit` method lets developers extend the edges of the portrait, similar to adding synthetic bleed margins to a `Sheet`.
* Added `HSBPanel.setTitle`/`getTitle` to change `tintPanel` title label.
* Added `StrangeEons.getUrlForDocPage` to get a URL for a page in the se3docs site given its base file name (e.g., `"dm-preferences"`).
* Method `FillInPreferenceCategory.addHelp` no longer takes a third argument (old code will still work).
* Deprecated `JHelpButton.setWikiPage`; this now forwards to `setHelpPage`.
* Removed `arkham.project.PluginWizard` (superseded by `PluginWizardDialog`).
* Removed deprecated `arkham.dialog.prefs.SBOrderedList`.
* Removed `PlatformSupport.isOSXMinorVersionAtLeast`, `isUsingAquaDerivedLookAndFeel`, `isUsingOSXSystemLookAndFeel`, `isUsingQuaquaLookAndFeel`.
* The `OPT_*` bit flags in DIY are now package private; the methods `getAdvancedFlags()`, `setAdvancedFlags` and `isAdvancedFlagAvailable` have been removed. Use the relevant public methods instead: `setTransparentFaces`, `setVariableSizedFaces`, `setPortraitBackgroundFilled`, `setMarkerBackgroundFilled`, `setPortraitScaleUsesMinimum`, `setMarkerScaleUsesMinimum`,  `setPortraitClipping`, `setMarkerClipping`, `setCustomPortraitHandling` and the complementary getters.
* The following classes have been removed: `GestureToolkit`, `GestureEvent`, `GestureListener`, `GestureEventAdapter`, `GestureCommand`.
* In class `PluginBundlePublisher`, methods that used to take a `ProgressListener` parameter no longer do, as underlying infrastructure needed to support this has been removed in newer versions of Java.
* `StrangeEons.fileBugReport` updated to link to a partially completed contact form; this also affects the **Help/Report a Bug** menu item.
* The constant `self` is set to the script's global scope for consistency with other JS environments.
* The `debug` script library has been removed. Use the built-in [source-level debugger](dm-debugger.md) instead. The `uiutils` library has been removed, though some useful functions from that library are now included in `utils.js` in the [Plug-in Authoring Kit](dm-pak.md).
* The `libutils` script library is deprecated, with no plans for removal. It can still be used, but won't be featured in documentation and is no longer "registered" as a built-in library.
* `ImageUtils.crop`: the `width` and `height` are now optional; if left off they default to include the remainder of the image.
* `ImageUtils.tint`: corrected the (new version of the) documentation to state that the hue shift is measured in rotations, not degrees.
* Added `ImageUtils.trim` (trims transparent pixels from image edges).
* Support for **SE2 Compatibility Mode** has been removed: the class `PluginContext2xImpl` has been removed and is no longer returned from `PluginContextFactory`; the `*.ljs` ("legacy" JS) versions of script libraries have been removed; the **Preferences** dialog no longer lists the relevant settings; the setting key `script-SE2-compatibility` no longer has a default value, is not migrated, and has no effect if set.
* Removed support for reading API documentation via the `javadoc://` and `scriptdoc://` protocols. The related classes `ca.cgjennings.io.protocols.CapturedStream`, `ca.cgjennings.io.protocols.SurrogateConnection`, `ca.cgjennings.io.protocols.APIDocumentCache` have also been removed.

* The `sprintf`-style script library functions will now coerce numeric values when possible. This means that, for example, you can now pass a regular JS number to a `"%d"` conversion and it will not throw an exception. It is also now possible to pass a `Locale` or `Language` as the first argument to localize formatting (previously the interface locale was always used). Passing a locale of `null` as the first argument will prevent localization.

* Calling `@(keyStr, formatArgs...)` or `#(keyStr, formatArgs...)` will format interface and game language strings (respectively). Previously, this was done by calling `string` and `gstring` (which still works). In other words, the following are now all equivalent:

  ```js
  @("key-name", arg1, arg2, arg3);
  string("key-name", arg1, arg2, arg3);
  sprintf(@key-name, arg1, arg2, arg3);
  ```

### Bug fixes

* [Projects](um-proj-intro..md) stored in a version control system will no longer register changes to project and task folder settings (`seproject` files) every time the project closes.
* The layout of the [root file editor](dm-eons-plugin.md) has been reorganized to better fit small display resolutions.
* The `register` tool for adding desktop icons under Linux now includes the [agent parameter](um-install-other.md) required for Java 9+ (this causes no harm under Java 8).
* The synthetic bleed option setting is not remembered between image exports.
* Regression: when printing a component from the editor, no matter which faces you select (e.g., **Print Front Face Only**), all faces would be printed.
* `confirm.yesno` was accidentally renamed `yesNo` in a beta release.
* `Console.printHTML` was accidentally renamed `printHTMLprintHTML` in a beta release.
* Syntax checking in the script editor was checking against an older version of JavaScript. (For example, `for` ... `of` loops were marked as errors.)
* The startup version check has been updated to check for Java 8 exclusively.
* In the [Test Plug-in](dm-test-plugin) dialog, only explicitly selected locales are passed to the test instance (entering a locale code directly in the text field had no effect).
* Script function `Console.printComponent` failed due to an argument name mismatch.
* [Quickscript](dm-quickscript.md): Printing of the return value could evaluate a Scriptable outside of a JS context.
* [Root file editor](dm-eons-plugin.md): Changing the list of interface languages does not update the description language combo.
* Fixed an issue with immediate repainting of the script console when running code from the UI thread.
* Command line help for [`register`](um-install-other.md), used to register the app via `xdg-utils` (for Linux-based systems) did not list the `--uninstall` option.
* The [Image Export](um-gc-export.md) dialog allowed the mutually exclusive "combining faces" and "excluding simple faces" options to be selected at the same time.
* Opening a `project:` URL when no project is open now throws a suitable `FileNotFound` exception.

### Other changes

* Strange Eons no longer depends on JavaFX. This will make it easier to develop for newer versions of Java and also significantly decreases the download size of installation packages. As part of this, the **Document Browser** has been removed; plug-ins that require it will no longer work.
* Work has begun on rewriting the script libraries to use more modern JS.
* The command line option `--xDisableGestures` was removed.
* Updated supporter list in **About** dialog.
* Moved files in `resources/alt/` and gave them transparent names.
* Removed themed splash variants that were specific to a particular game.
* 32-bit builds for Windows are no longer being produced. Strange Eons now generally uses too much memory to run reliably as a 32-bit app. If you have been using the 32-bit Windows build successfully for a particular purpose, you can [contact me](https://cgjennings.ca/contact/) for a 32-bit installer.

### Java 9+ compatibility

Officially, Strange Eons currently requires Java 8, but work is underway to support Java 9 and later. Here is a summary of the current status:

- The major obstacles have been solved and SE can be started under Java 9 starting with build 3970. (However, build 4163 will refuse to start in newer versions; running under Java 9+ is currently for development purposes only.)
- SE can be built under Java 9 and Java 11.
- When starting SE from the command line, the option <code>-javaagent:<em>path/to/strange-eons.selibrary</em></code> must be added. Starting with build 3970 the launcher executables for Windows and macOS have been modified to include this option.
- The removal of the Pack200 format and related tools will require reworking how plug-in bundles are stored on the server (and unpacked).

## Build 3970

This is an **early access beta release**. Features may continue to evolve; the release notes for the next production (non-beta) edition will include the definitive description of the feature.

### Updates and changes

* [Ink Saver](um-gc-preview.md#ink-saver), a new rendering mode which ensures that only the bare minimum is drawn. The standard behaviour (which some components may customize) is to draw a solid white background, text, and shapes (no images).
* The ["Readme" Web page](um-gc-export.md#the-readme-file) that is included with exported images has been rewritten to modern Web standards, including support for printing (at correct size) and mobile devices.
* Help buttons now link to the new [documentation pages](index.md).
* The recent file menu now lists projects before other files; within each section the items are still listed from most to least recently used.
* [Typeface viewer](dm-type-viewer.md)/insert character dialog:
  * press <kbd>Enter</kbd> (<kbd>Shift</kbd>+<kbd>Enter</kbd>) to move to the next (previous) character supported by the selected font;
  * highlight the following cell types using different colours: control characters, unassigned code points, code points not present in the selected font;
  * rows with no assigned Unicode code points are hidden;
  * enter a hexadecimal code point (e.g., `u+2c7e`) in the search field to go to that code point (or the nearest valid row).
* [Projects](um-proj-intro..md) stored in a version control system will no longer want to commit their project and task folder settings (`seproject` files) every time the project closes.
* The layout of the [root file editor](dm-eons-plugin.md) has been reorganized to better fit small display resolutions.
* The `--plugintest` command line option can now be passed multiple test bundles separated by the path separator character (`;` on Windows, `:` elsewhere).
* The **Document Browser** is *deprecated*. In a future version, searchable API documentation will be accessible from the (system) Web browser. Plug-ins that rely on the document browser and associated text indexing classes will no longer work after this change.

### Script library updates

* The **SE2 Compatibility Mode** option is *deprecated*. It is now disabled by default. In a future version, this option, and the additional script code that it loads (`*.ljs` files), will be removed. It is not believed that any current plug-ins rely on this mode.

* The `sprintf`-style script library functions will now coerce numeric conversions when possible. This means that, for example, you can now pass a regular JS number to a `"%d"` conversion and it will not throw an exception. It is also now possible to pass a Locale or Language as the first argument to localize formatting (previously the interface locale was always used). Passing a locale of `null` as the first argument will prevent localization.

* Calling `@(keyStr, formatArgs...)` or `#(keyStr, formatArgs...)` will format interface and game language strings (respectively).


### Script engine updates

This update brings partial ES6 support for script code, including:

#### Arrow functions

```js
// instead of
function f(x) {
    return x*x - 1;
}
// you can write
f = x => x*x - 1;
// notice: the right side of the => is an expression
// that will implicitly be "return"ed

// if the function takes multiple arguments (or no arguments)
f = (x,y) => x*x + y - 1;

// if the function requires multiple statements or
// doesn't return anything
f = (x) => {
  // function body ...
};

// functional programming is much more convenient
evenNumbers = [0,1,2,3,4,5].map(v => 2*v);
```

Note that arrow functions cannot be used to [implement Java interfaces](dm-java-api.md#implementing-interfaces) as they capture the `this` value from the enclosing scope.

#### Method definitions

```js
// instead of
let object = {
  name: "Abigail",
  greet: function(arg) {
    println(this.name + " says hi to " + arg);
  }  
};
// you can write
let object = {
  name: "Abigail",
  greet(arg) {
    println(this.name + " says hi to " + arg);
  }
}
```

#### Destructuring assignment improvements

```js
// array matching
let array = [1, 2, 3, 4, 5];
let [a, , b, c] = array;
println(a); // 1
println(b); // 3
println(c); // 4

// object matching
let obj = {
  height: 60,
  age: 10,
  name: "Cathy"	
};

let {age, height} = obj;

println(age); // 10
println(height); // 60

// parameter matching
function f([name, age]) {
  return name + " is " + age;
}

let array = ["Bev", 52];
println(f(array)); // Bev is 52
```

#### Updated native JS objects

* Array: [`find()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) and [`findIndex()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex).
* String: [`codePointAt()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt), [`endsWith()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith), [`includes()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes), [`normalize()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize), [`repeat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat), [`startsWith()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith),  [`trimLeft()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimStart) and [`trimRight()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimEnd).
* Number: [`isFinite()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite), [`isInteger()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger), [`isNaN()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN), [`isSafeInteger()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger), [`parseInt()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt), [`parseFloat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseFloat). Numeric literals can now use binary (`0b11010101`) and octal (`0o325`) in addition to decimal (`213`) and hexadecimal (`0xd5`).
* [Static Math methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math): `cbrt()`, `cosh()`, `expm1()`, `hypot()`, `imul()`, `log1p()`, `log10()`, `sinh()`, `tanh()`, `trunc()`.
* Object: [`is()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) and [`assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).
* Error: V8-style `captureStackTrace()`, `Error.prepareStackTrace`, `Error.stackTraceLimit`.
* [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)s.
* [Typed arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) ([`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer), and views [`Int8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int8Array), [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array), [`Uint8ClampedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray), [`Int16Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int16Array), [`Uint16Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint16Array), [`Int32Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int32Array), [`Uint32Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint32Array), [`Float32Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array), [`Float64Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float64Array)).

In addition to the above you can expect many more bug fixes and performance improvements under the hood.

### Java API changes

- Added `HSBPanel.setTitle`/`getTitle` to change `tintPanel` title label.
- Added `StrangeEons.getUrlForDocPage` to get a URL for a page in the se3docs site given its base file name (e.g., `"dm-preferences"`).
- Method `FillInPreferenceCategory.addHelp` no longer takes a third argument (old code will still work).
- Deprecated `JHelpButton.setWikiPage`; this now forwards to `setHelpPage`.
- Removed `arkham.project.PluginWizard` (superseded by `PluginWizardDialog`).
- Removed deprecated `arkham.dialog.prefs.SBOrderedList`.
- Removed `PlatformSupport.isOSXMinorVersionAtLeast`, `isUsingAquaDerivedLookAndFeel`, `isUsingOSXSystemLookAndFeel`, `isUsingQuaquaLookAndFeel`.
- The `OPT_*` bit flags in DIY are now package private; the methods `getAdvancedFlags()`, `setAdvancedFlags` and `isAdvancedFlagAvailable` have been removed. Use the relevant public methods instead: `setTransparentFaces`, `setVariableSizedFaces`, `setPortraitBackgroundFilled`, `setMarkerBackgroundFilled`, `setPortraitScaleUsesMinimum`, `setMarkerScaleUsesMinimum`,  `setPortraitClipping`, `setMarkerClipping`, `setCustomPortraitHandling` and the complementary getters.
- The following classes have been removed: GestureToolkit, GestureEvent, GestureListener, GestureEventAdapter, GestureCommand.
- In class PluginBundlePublisher, methods that used to take a ProgressListener parameter no longer do, as underlying infrastructure needed to support this has been removed in newer versions of Java.

### Bug fixes

* In the [**Test Plug-in**](dm-test-plugin) dialog, only explicitly selected locales are passed to the test instance (entering a locale code directly in the text field had no effect).
* Script function `Console.printComponent` failed due to an argument name mismatch.
* [**Quickscript**](dm-quickscript.md): Printing of the return value could evaluate a Scriptable outside of a JS context.
* [Root file editor](dm-eons-plugin.md): Changing the list of interface languages does not update the description language combo.
* Fixed an issue with immediate repainting of the script console when running code from the UI thread.
* Command line help for [`register`](um-install-other.md), used to register the app via `xdg-utils` (for Linux-based systems) did not list the `--uninstall` option.
* The [**Image Export**](um-gc-export.md) dialog must not allow "combining faces" and "excluding simple faces" to be selected at the same time.
* Opening a `project:` URL when no project is open should throw a suitable FileNotFound exception.
