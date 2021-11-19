# Release notes

## 3.3 (upcoming version)

The following changes are planned for inclusion in the **next update**. This list is *informational only*: nothing here is final until the update is actually published. Some items may be deferred or abandoned, and other items may be added at any time. In particular, changes to the APIs and script engine have the potential to introduce compatibility issues with plug-ins which might lead to those features being delayed, changed, or withdrawn.

### For plug-in developers

- A new API has been added to support transitioning legacy components to a new component type. [Thanks to Henrik Rostedt]

### Bug fixes

- The **File/Open Recent** menu listed deleted files. A side effect of this is that deleted projects would be listed under the wrong section.
- The plug-in installation notes, plug-in overviews in the plug-in manager and catalogue, and catalogue relaunch warning message are now themeable and have proper dark defaults for dark themes.

## 3.2 (build 4202)

> **Important:** If you have problems with a plug-in (for example, creating a component for a particular game) after updating, ensure that **Compatibilty mode** is checked in the [**Preferences** dialog](http://se3docs.cgjennings.ca/um-ui-preferences.html) (in category **Plug-ins**, under **Plug-in Scripts/Compiler Options**).

### Features, enhancements, and changes

* Added a [non-interactive script runner mode](um-run-script.md), activated with command line option `--run <script-file.js>`.
* Windows installer: a separate executable named `eons` is installed to start Strange Eons in *console mode*. This keeps Strange Eons "attached" to the console it is started from so that console output is visible. This is also useful when running in non-interactive mode: for example, a batch file will wait for Strange Eons to exit before running the next command in the script.
* Added support for "dark" themes; separate light and dark themes can be selected in the [Preferences](um-ui-preferences.md) dialog. The app will attempt to detect the OS settings and choose a theme accordingly. Note that the app won't respond dynamically to theme changes since changing the theme requires an app restart.
* Three new themes have been added:
  * *Yuggoth,* a dark theme based on the default *Hydra* theme;
  * *Ulthar,* a theme with a flat design motif and a light colour scheme;
  * *Dreamlands,* a dark version of *Ulthar*.
* Added support for Linux/arm64.
* LCD text antialiasing (for the user interface) is enabled by default on Linux, with a [command line option to change the antialiasing mode](um-install-troubleshooting.md#text-quality-issues).
* The command line option `--xDisableJreCheck` skips the normal Java version checking performed at startup, allowing developers and expert users to try running the app with unsupported Java versions. Currently, a Java version from 8 to 11 must be used if this flag is not set.
* The command line option `--xDisablePluginLoading` prevents plug-ins from being loaded from bundles (except test bundles) for development and troubleshooting purposes.
* Text editor tabs can **Format** supported file types.
* The find/replace fields in the code editor will remember the most recently used patterns and use them when the panel is first opened (unless a selection is active, in which case the selection is used).
* Added a preference option to ignore missing semicolons in script files even with warnings enabled (some JS programming styles leave these out intentionally).
* The plug-in catalog now uses https by default.
* The now meaningless command line option `xDisableFX` has been removed.
* A simplified, less performance-degrading, version of the script compatibility feature has been reinstated (turn on or off with **Preferences/Plug-ins/Compatibility Mode**).
* Updated supporter list in **About** dialog.
* Updated underlying embedded Java version to 8u302.

### For plug-in developers

* Experimental [TypeScript support](dm-typescript.md).
* Basic support for loading CommonJS-style modules with `require(relativePathToModuleScript)`. See the example [commonjs-modules.js](https://github.com/CGJennings/se3docs/blob/main/Plug-in%20Authoring%20Kit/Code%20Snippets%20and%20Demos/commonjs-modules.js).
* The [Test Plug-in dialog](dm-test-plugin.md) has new options:
  * prevent other plug-ins from being loaded
  * reset the JVM command field to its default value
* The [script debugger client](dm-debugger.md) now has a command line option, `--search` to find instances of Strange Eons with an available debug server and report their host and port for connecting.
* The `SplitJoin` class can now create instances with a specified number of threads (for I/O-bound tasks).
* The `Subprocess` class can now optionally disable redirection of the process's I/O streams to the script console.
* The method `Subprocess.launch` makes it easier to launch app tools from the app with the same VM arguments as the app itself.
* The method `ProjectUtilities.execAsync` has been added to complement `ProjectUtilities.exec`.
* The method `StrangeImage.exists(identifier)` can be used to check whether a portrait-style image path points to a real image.
* The method `StrangeImage.getAsBufferedImage` works like `StrangeImage.get` but converts vector images directly into bitmaps. (Prefer `StrangeImage.get` where possible.)
* The `PlatformSupport.PLATFORM_IS_OSX` constant has been deprecated with no intention to remove. Instead, use `PlatformSupport.PLATFORM_IS_MAC`.
* Overridable Method `Theme.isDark()` simplifies creation of dark mode themes. The `Theme` class defines several new constants that can be used to refine themes via `UIManager`. For example, the link colour of link labels can be customized with code like `UIManager.put(LINK_LABEL_FOREGROUND, Color.RED)` in a theme's `modifyManagerDefaults` method.
* Plug-in code can detect whether a dark theme is installed using `javax.swing.UIManager.getBoolean("useDarkTheme")`, which returns `true` when a dark theme is active. If the plug-in is run in older versions of Strange Eons, it will always (and correctly) return `false`.
* When initializing their painting graphics context for a particular `RenderTarget`, `Sheet`s now use the helper class `ca.cgjennings.apps.arkham.sheet.StandardHints` to initialize rendering hints quickly and consistently. This class can also be used to experiment with different hint values.
* Removed the legacy version of the [script library docs](http://se3docs.cgjennings.ca/assets/jsdoc/).

#### Changes to how subprocesses are launched

Certain preference settings could be used to launch subprocesses such as the script debugging client. These settings are no longer used. Instead the app will launch these tools itself, without reference to these keys. This allows the exact command used to launch these commands to be updated automatically to keep up to date with changes to the Java runtime.

While the old keys are no longer used, it is still possible to override how these tools are launched if for some reason the automatic launch process does not work on a given system. However, there is no UI to edit these user settings so they must be [set "by hand"](dm-setting-explorer.md). The following new keys are used (all with no initial value, meaning that the default automatic method is used):

`test-bundle-launch`  
Controls how the plug-in test command starts a bundle test instance.

`script-debug-client-launch`  
Controls how the script debugger client is started.

These keys can contain the following variables, which will be expanded to the relevant value:

`%j` the path to the Java runtime executable
`%v` the virtual machine arguments used to launch the main app
`%c` the class path used to launch the main app
`%h` the host name of the debug server (debugger client only)
`%p` the port number of the debug server (debugger client only)

#### Pack 200 transition

Publishing a plug-in bundle (preparing it for a catalog by creating a file ending in `.pbz`, `.pgz`, or `.plzm`) no longer applies Pack200 compression as part of the publication process. This change is necessary for Strange Eons to run under Java 14+, which [drops support for Pack200](https://openjdk.java.net/jeps/367). Existing plug-ins in the official catalog have been re-published without Pack200. Older versions of Strange Eons will detect that Pack200 was not applied and will correctly install the repacked versions. **If you operate a third party plug-in catalog**, you must re-publish your plug-ins as well. You can do this as follows:
1. Make sure you have a plain bundle for each published plug-in. A published bundle can be unpacked to a plain bundle by opening (double clicking) it in a project. *This must be done using [build 4163](https://github.com/CGJennings/strange-eons/releases/tag/v3.1.4163) or earlier.*
2. Now start any build of Strange Eons that is *at least [build 4169](https://github.com/CGJennings/strange-eons/releases/tag/v3.2.4169)*.
3. Using your catalog tools task folder, copy all of your plain plug-in bundles to the **Staging Area**.
4. Double click on **Publish to Local Catalog** (![robot](images/project/auto.png) icon) to run the script. You can expect a warning for each bundle, since it will have the same version timestamp as the already published version (it is the same version, we just want to recompress it without Pack200 and update the catalog accordingly).
5. Wait for the published bundles to be rebuilt.
9. Upload the contents of the **Upload Queue** to your catalog server as you normally would.

#### Changes to how text is rendered

You may notice differences in how text is rendered compared to previous versions of Strange Eons. Perhaps most noticeable is that the ascent of fonts is slightly different so that text no longer aligns with elements the same way that it used to. These variations are unavoidable due to a change in the underlying font engine being used to draw text.

##### Why did the font engine change?

The original Sun (later Oracle) Java runtimes that came with previous versions of Strange Eons used a commercial font engine called [T2K (later renamed Font Fusion)](https://en.wikipedia.org/wiki/Font_Fusion) and/or the engine of the host platform. When Sun opened the source code for the Java runtime, a process began to find open source replacements for proprietary components like T2K. In the case of T2K, the [replacement](https://openjdk.java.net/projects/font-scaler/) was [FreeType](https://www.freetype.org/). Between the initial release of Java versions 8 and 9, Oracle changed the licensing rules for their Java runtime. The result was that Strange Eons could no longer include Oracle's runtime and had to switch to runtimes based on OpenJDK. Moreover, [starting with Java 11](https://docs.oracle.com/en/java/javase/11/migrate/index.html#JSMIG-GUID-5657F44A-B2D7-4FB6-AAD7-295AC4533ABC), Oracle replaced the font engine in their own runtime from T2K to FreeType. Thus, this change is likely both long-term and universal and will need to be adapted to rather than avoided.

##### What can be done?

FreeType is a mature, high-quality font engine capable of producing results comparable to T2K. However, rendering type is a complex and subjective problem. This means that the results from any two font engines are inevitably going to vary. In most if not all cases, the issue is not that the result from FreeType is "bad". Rather, the issue is that the text layout was designed against the original font engine, so it needs some additional tweaking for the new font engine. Plug-in developers may want to adjust the region boxes, font sizes, or other details for the new engine. Since the new engine will handle each font a little differently, it seems unlikely that a single simple set of adjustments will cover all cases. That said, if you want to experiment and offer some suggested standard adjustment that covers a majority of cases, feel free to share your settings and/or submit a pull request.

### Bug fixes

* Fixed an issue that prevented the `ImageUtils.stitch` function from stitching images along the vertical edge. [Thanks to Adam Goldsmith]
* Open project folder dialog did not remember most recently used folder.
* Markup boxes (text boxes) would sometimes incorrectly break a line in the middle of a word.
* Double clicking an item in a list in the deck editor could result in an infinite loop trying to fit the item.
* Script functions `string`, `gstring`, etc., do not pass format specifiers correctly.
* Fixed issues that could prevent documents from opening when the Tcho Tcho theme was used on Windows.
* Regression: publishing a Web-safe bundle threw an exception after converting bundle to plain.
* Regression: font dialog and other dialog using an [ArcBorder](http://se3docs.cgjennings.ca/assets/javadoc/ca/cgjennings/ui/ArcBorder.html) with `ARC_BOTTOM_LEFT` throw an exception.
* Fixed issues where UI elements did not adapt well to dark themes or themes not based on Nimbus:
  * the `AbstractVerbalDesignSupport` default design support view;
  * Preferences dialog;
  * portrait panel background;
  * icon background of message dialog;
  * About dialog colour scheme;
  * filter field icon on catalog dialog;
  * Choose expansion symbol dialog instruction text;
  * New expansion symbol dialog instruction text;
  * Plug-in manager dialog elements;
  * language part of locale icons did not match theme;
  * graphic background of New Component/New Project/Add New Task dialogs;
  * component/resource preview panel used in file open dialog etc.;
  * and others.
* Fixed plug-in compatibility issues:
  * The Lord of the Rings LCG `getPortraitImage` error (note that this plug-in also currently requires compatibility mode to be enabled).

## 3.1 (build 4163)

This is a **production** release.

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

* Added `arkham.Subprocess.launch` to simplify starting a child process that uses an executable class in the app JAR.

* A host of script engine updates bring the JS engine closer to ES6 level. This includes arrow functions, object/class methods, destructuring assignment improvements, new native JS object methods, and many bug fixes and performance improvements. More details and examples of these changes can be found under the notes for beta build 3970.

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

## 3.0 (build 3970)

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

## Historic versions

This is an incomplete set of release notes for historic, now long obsolete versions. [Available historic versions can be downloaded here](https://github.com/CGJennings/strange-eons/releases/tag/v0.0).

### 2.1

**Deck Editor**

- Curved movement lines.
- Create Groups
- Selected objects turn and mirror together.
- Constrain angles of lines and movement arrows.
- Pages may be renamed by double-clicking.
- Custom image tiles will automatically find a missing tile image if it is in the folder as the deck (like it already did for cards).
- Move around the page with Alt+Arrow Keys.
- Scroll by dragging (either the page, a selection, or a handle).
- Added PA4 paper type to make it easier to share decks internationally.

**Expansion Board Location Editor**

- Can expand to different sizes to accommodate differing lengths of location text.

**Investigator Editor**

- Updated for Innsmouth Horror.

**Location Card Editor**

- Updated for Innsmouth Horror.

**Monster Editor**

- Updated for Innsmouth Horror.
- Added "none" as a possible Toughness.
- Added summaries of special abilities to the similarity table.

**Mythos Card Editor**

- Updated for Innsmouth Horror.

**Personal Story Card Editor**

- Added.

**Miscellaneous**

- Image mark-up tags can take an [alignment parameter](https://web.archive.org/web/20091008104040/http://www.sfu.ca/~cjenning/eons/tag-table.html#images_tags) to control how the image is positioned vertically within the line.
- Uses tabs to organize documents instead of Multiple Document Interface style.
- Updated Reference Map plug-in for Innsmouth Horror.
- Tint/Colour selection improvements (eye dropper, Web colours).
- Pluralization support for languages with less/more than two plural forms.

**Scripting Engine**

- Source-level debugger added.
- Scripting library improvements.
- Scripts may access settings as if they were variables using $-notation.

**Bug Fixes**

- Partially Fixed: OS X: handles in deck editor can now be dragged (to resize text boxes, move line endpoints, etc.; however, the correct drag cursor only appears on the first page of a new deck (not one opened from a file).
- OS X 10.6 application launch issues.
- Windows installer: option to create a copy of SE resources creates an empty folder instead (attempt to run resource tool fails due to change in thread preconditions in ResourceKit.initialize()).
- When experimental key not set, remove experimental menu items instead of hiding since visibility ignored on OS X.
- File|Print for game components updates list when custom paper sizes are created/deleted.
- Code Editor: obeys platform-specific popup trigger (right button up on OS X).
- closable tab pane: can only drag tabs by dragging the edges of the tab, not the label; the custom tab component now translates and forwards mouse events to the enclosing tabbed pane.
- double-clicking on background colour swatch on text box style dialog throws NPE instead of opening colour dialog
- various issues related to "close all tabs"/"close all tabs but" commands in deck editor.
- Windows: proxy splash window no longer appears in task bar.
- Deck editor: fixed a bug in the print/export system that could cause certain very large PageItems to be clipped incorrectly.
- Preferences: when using the Shoggoth theme, the controls in the Plug-in Scripts section are invisible.
- Mythos editor: Added "Streets" to some street locations from expansion boards (Central Hill Streets, Harborside Streets, Church Green Streets, Factory District Streets).
- Monster counts for Formless Spawn and Nightgaunt missing Kingsport data.
- Investigator Editor: removed validation messages for purchases that used to be unofficial but have since been used on official cards.
- Investigator Editor: minor corrections to the wording of some Kingsport special abilities.
- Skill Check Table plug-in: first row ([d]=1) should be highlighted when dialog opens to indicate what the initial graph illustrates.
- Mythos cards: **Activity At** should come before **Clue Appears At** if both appear on the same card.
- Changed memory estimation algorithm to avoid memory warning when run under 64-bit JVM 1.6.0u16.
- Calling `dispose()` on console window did not call super implementation.
- Preferences: when using the Shoggoth theme, the controls in the Plug-in Scripts section are invisible.
- Rendering: mark-up box could throw a NPE when drawing text under a certain rare combination of factors.
- Personal Story cards: when drawing the investigator name, called draw instead of drawAsSingleLine.
- Personal Story cards: can't complete export because second card is given the same file name ("duplicate entries").
- Personal Story cards: using standard print option, the fourth card face is not printed.
- OS X: various file chooser irregularities (e.g., file choosers that should support multiple selection did not, file choosers would be labelled as "Save" type even though they were "Open" type).
- OS X: case book editor does not fit on standard Mac Book display (1280x800).
- Regression: exception while reading in older "miscellaneous small" cards.
- DIY: possible ConcurrentModificationException in DIY.upgradeOldPropertyNames().
- OS X: default L&F; for JRE 1.6.0_10+ should be Aqua.
- OS X: quaqua not finding native code library.
- Repeater buttons (like the portrait adjustment arrows) send the wrong modifiers once every time the modifiers change.
- Argument order irregularities in the definition of testDIYScript().
- Deck Editor: RotatableTiles (such as movement arrows) are turned in the wrong direction by the rotate clockwise/counter-clockwise commands.
- Deck Editor: Esc key cancels drag selection box (previously it would cancel other dragging actions, such as resizing or moving a selection, but not this).
- Deck Editor: arkham.deck.items.Line objects sometimes reported an incorrect bounding rectangle, which (for example) made drag-selecting over areas containing lines unpredictable.
- Regression: Deck Editor: the search field did not work correctly because some experimental code was accidentally left in the release.
- OS X: Updated the JavaApplicationStub in the app bundle to work with the recently released security patch.
- Investigator Editor: decreasing the number of monster trophies increases it instead.
- uibindings: editable combo boxes are not updated correctly when the settings value is not in the drop-down list.
- DIY Card Type (regression): setting the portrait key to null caused editor creation to fail.

### 2.0

Version 2 represents the biggest change for Strange Eons since its initial release.

**Performance Enhancements**

- improved card drawing performance
- support for [Java 6 Update 10](https://web.archive.org/web/20091008104040/https://jdk6.dev.java.net/6u10ea.html) hardware accelerated drawing
- faster start-up
- faster printing, especially of large/complex documents at high resolution
- background preloading of card graphics to take advantage of multiple CPUs

**Plug-in Framework**

Write custom plug-ins to extend and enhance SE using either compiled Java classes or ECMAScript (JavaScript). Download the [plug-in kit](https://web.archive.org/web/20091008104040/http://www.sfu.ca/~cjenning/eons/se-plugin-kit.zip) for more information. Several plug-ins are included with Strange Eons as standard, including a reference map, skill check probability table, and scripting tools. [Download more plug-ins here.](https://web.archive.org/web/20091008104040/http://www.sfu.ca/~cjenning/eons/plugins/index.html)

**Custom Expansion Boards**

Based on the existing deck editor, SE 2 now supports the creation of custom expansion boards and includes new editors for **map locations**, **other world locations**, **special locations** (like LiTaS) and **gate markers**. Improvements to the deck/expansion editor include:

- tiles (including custom tiles) to quickly create an expansion board backdrop, as well as movement lines, monster movement arrows, etc.
- align page items
- control snapping behaviour
- exact control over the location of page items
- better snapping algorithm, and visual feedback of where cards will be snapped to
- split large virtual pages for printing on normal paper
- editable, styleable text boxes
- automatic generation of fold lines when appropriate
- allows drag box selection by holding shift and dragging on the paper, or using the middle mouse button
- context (right click) menus
- center the entire page's content (right click an empty area of the page and choose "Center Page Content")

**Ancient One Plot/Epic Battle Cards**

- Added

**Ancient One Editor**

- start of battle text may be located under Worshippers, as with Kingsport Ancient Ones

**Arkham Encounter Editor**

- custom locations will may now have 1 or 2 location images instead of the usual 3
- the custom card tint now offers a wider range brightness levels; when old files are opened they will automatically scale their brightness down to compensate
- support for all 3 possible symbol slots as well as symbols on street locations (such as aquatic)
- support for all of the new symbol types added for the location editor

**[Arkham Investigations](https://web.archive.org/web/20091008104040/http://homepage.mac.com/nephilim/arkham_investigations/) Case Book Editor**

- Added

**Arkham Investigations Foldable Tome Editor**

- Added

**Benefit/Detriment Cards**

- Added

**Black Goat Cult Encounter Cards**

- Added

**Blight Cards**

- Added

**Corruption Cards**

- Added

**Difficulty Cards**

- Added

**DIY Card Type ("alpha")**

- Allow you to create new component types not based on an existing component using only script code.

**Gate Cards**

- May now be dual-coloured (as in Curse of the Dark Pharaoh).

**Guardian Effect Card Editor**

- added

**Investigator Editor**

- spell items list their casting modifier and sanity cost as their item class
- title field now includes a dropdown list of over 300 sample titles and occupations to provide inspiration
- when using the "Random Name" button, hold Shift to generate a random title; hold Ctrl (or Command or Meta) to generate a random first name; hold Alt to generate a random last name; these modifiers may be combined
- added specific import support for Injuries, Madnesses, Benefits, and Detriments to the "Import Settings From Card..." option of the "New Item..." dialog on the Possessions tab
- custom items/home locations can be edited
- the investigator name and title fields now recognize gender-specific tags (<m/f>)
- Sanity/Stamina penalties may be purchased; currently it is theoretically possible to use to reduce an investigator to a maximum Stamina or Sanity of 0: this will probably change
- initial toughness tokens may be purchased as an option to flesh out character

**Note:** To create an investigator with variable health (like Lily Chen), install the [Variable Health Investigators extension plug-in](https://web.archive.org/web/20091008104040/http://www.sfu.ca/~cjenning/eons/plugins/index.html).

**Marker Editor**

- added

**Miscellaneous Small Card**

- Card fronts support two new styles: body text (without a title box) and item-style (which has a portrait, and optionally a cost and/or number of hands).
- Text background can optionally be tinted.
- Appearance of cards improved.

**Miscellaneous Large Editor**

- added, with a choice of either portrait (tall) or landscape (wide, as with KiY's Act cards and the DH cards) formats

**Monster Editor**

- improved token graphics (horror damage, toughness, etc.)
- improved text quality (awareness, horror modifier, etc.)
- wider range of parameter options for monsters, including horror/combat damage of 5
- aquatic and Elusive options
- improved monster similarity analysis

**Scenario Editor**

- added

**Design Support**

- "spin off" a component to create a duplicate for developing multiple versions of a design in parallel

**Miscellaneous**

- Drag and drop files (on supported platforms): drop .eon files/plug-ins onto the application window to open/install them, images onto a portrait panel to set them as the portrait, .eon files onto the card list of a deck to add the card to the list.
- Colour correction (available from Preferences dialog).
- Expansion icons may optionally be printed on cards.
- Exported images are selectively oversampled, which produces more accurate results at low resolutions.
- Printer resolution deduction has been improved, and better control is available to prevent high resolution page-imaging devices from running out of memory via the keys `target-print-dpi-min` and `target-print-dpi-max`.
- Live spell checking in text editing fields.
- Combo boxes with many items support autocompletion where appropriate.
- Component printing: using the Print option for a component works like printing a deck (crop and fold marks are added); component gaps may use cm or inches in addition to points.
- The maximum amount that line spacing can be reduced when fitting text is now controllable via a settings key. The default value prevents descenders and ascenders from touching. Some long texts will either be shrunk more or no longer fit as a result.
- Context menu for Tinting Panel allows copying and pasting tints between cards.
- Better control over preview quality (four simple options in the view menu).
- Edited Frequently Asked Questions to bring it up to date with this version.
- Open recent file list.
- Various interface design improvements.
- Detects when it is started without a high enough maximum memory setting and attempts to correct it.
- Editors provide a split pane between the edit and preview sides and editors enforce a minimum size to better cope with varying resolutions.
- Themes allow look and feel customization.

**Bug Fixes**

- OS X: sometimes exports blank image.

- DIY Card Type: editing a text field bound with a Bindings object in a DIY card opened from a file causes the preview image to stop updating correctly.

- Internet Explorer Plug-in Downloads: IE tries to save plug-in files with a ZIP extension. Plug-ins may now be either plain ZIP files or Web-proof bundles. Web-proof bundles are left as-is by IE and converted to regular bundles automatically when installed in SE. See the SE Text Resource Editor Tools|Make Plug-in Bundle... dialog for more information.

- Scripting engine is inconsistent across platforms and may be slow (some implementations do not include a code generator).

- Possible thread deadlock when writing to script console.

- Regression: using Clear command on deck editor locks program.

- During initialization, some code violates event dispatch thread assertions.

- Script console does not obey text anti-aliasing hints.

- Tile Sets: no longer need to be merged into main settings.

- UI: panel transition should use alternative to temporary `pack()` to determine final window size.

- Windows Vista: since `%userprofile%` is now the base directory of the user's home directory, settings files should be explicitly made hidden.

- Regression: Blight card backs use Black Goat Cult back image.

- When starting plug-ins at program start, a missing plug-in class should not stop the application from completing start-up.

- Expansion Boards: new boards have name overwritten.

- Decks: new deck is marked as having unsaved changes.

- Decks: new deck is missing default name.

- Corrected Dunwich Horror monster names in Spanish translation.

- Image conversion script writes blank images.

- About: update link to FFG forums.

- Regression: when using `--restool` command line option, quits with a spurious "required argument missing" error.

- Component Drawing: components do not have a fixed size (e.g., markers/tokens, locations) not trimmed to correct size (missing right and bottom edge).

- Plug-in Manager: when sorting by column, rows in the table are not converted to the correct row in the model (uninstall button tries to uninstall wrong plug-in).

- Installer: uninstaller fails to remove some batch files in the install directory.

- Monsters: Wizard Whatelely listed as "flying".

- Mark-up Parser: Escaped quotation marks were consumed too early during macro expansion. The following now evaluates correctly to `<b>bold this</b>b>`:

  ```
  <define taga "<tagb \"@1;\">" >
  <define tagb "<tagc \"@1;\">" >
  <define tagc "<b>@1;</b>" >
  <taga "bold this">
  ```

- Casebook: "Endgame" should always be the last index entry in the location index.

- Casebook: label refactoring engine changes any label that starts with the target label.

- Nimbus L&F: workaround for buttons "popping" with different font sizes.

- Location Cards: Some Kingsport locations are listed in the wrong order.

- Gate Selection Drop-down: selection background does not cover entire list item.

- Quickscript: Command key on OS X executes command, then inserts letter.

- Quickscript: left margin of editor should support standard drag line selection gesture. (This fix will also appear in the next update to the SE Text Resource Editor.)

- Card rendering: a race condition can occur when exporting files that cause various odd effects when exporting images (typically text will be missing or the wrong size).

- Nimbus L&F: Timeline events in case book editor rendered with wrong background colour.

- Regression: Clear menu only enabled/disabled when File menu selected.

- Commands: Spin Off, Next/Previous Window menu item states not updated.

- Commands: Next/Previous Window should not use W accelerator key since that conflicts with Close under OS X.

- Plug-ins: Toolbox menu entries should be sorted in order to provide a more stable order for menu items.

- Console: stack trace should display a trace of relevant host stack elements when an exception occurs while a script is calling a host method.

- Console: stack trace writer sometimes adds extraneous blank lines.

- Scripting libraries: numerous fixes and additions.

- AbstractEditor: on install events should execute before creating sheets for component.

- Monster database: some monsters have incorrect gate symbol.

- Expansion Symbol Menu: not set to "Use Default" after switching from a component with an expansion symbol set to one with no expansions symbol set.

- Regression: Misc. small cards with a cost/hand requirement do not render in correct colours.

- Black Goat expansion symbol not reversed on dark cards.

- Plug-ins: since all requests for resources obeyed the custom resource folder setting, using a custom resource folder with plug-ins does not work unless the plug-in's resources are also in the folder. After this change, resources are looked for first in a custom resource folder (if any), but if they are not found there then the program will search for the resource as if no custom folder were set.

- Nimbus L&F: spelling-checking combo boxes do not pick up Nimbus border.

- OS X: changing view quality or pressing OK on Preferences dialog throws a `ClassCastException`.

- OS X: export dialog is initially very small.

- OS X: blank rectangle shown before splash image appears during startup.

- OS X: text generator plug-in interprets default model text using wrong character set (accented characters are incorrect).

- Workaround for bug in Nimbus L&F in JRE 6u10-rc2 that causes small style tabs to "pop" with different font sizes.

- Regression: case book editor was changed to treat labels case-insensitively, but some cases were missed.

- Case Book Publisher: reports that `<H*n*>` and `</H*n*>` are unknown tags even though they are known and valid.

- Case Book Publisher: fails to call `endFrontMatter()` if a title is defined but there is no prologue content.

- Script Console: extraneous blank lines printed when printing a script stack trace.

- Window Menu: could get out of sync if two sequential windows in the list are both closed between menu invocations.

- Card Preview: may paint card at wrong position when low-zoom sharpening is enabled.

- Windows Integration: NPE when opening non-SE file from shell.

- Windows Integration: plug-ins should have shell icon/default open behaviour.

- Windows Installer: uninstall does not delete user plug-in folder.

- Deck Editor: call-out box tile has wrong width.

- Deck Editor: commands such as nudge should repeat when key held down.

- Deck Editor: find command examined items in unintuitive order in rare cases.

- Image Preloader: could not detect all relevant image resources.

- Deck Editor: double-clicking in the Cards tab adds a card but does nothing in a tile tab.

- Script Console: The console does not receive repaint events while a script is running (print statements have no effect until the script stops running or a separate event loop is created).

- Script Console: The console methods `insertImage( Image )`, `insertImage( Icon )`, and `insertComponent( Component )` do not make the console window visible if it is hidden.

- Plug-ins: instances created while managing plug-ins might not be unloaded.

- Location Editor: icon selection controls not aligned correctly.

- Spells: missing expansion icons.

- Regression: some dialogs, including the Export dialog, fail because of missing files in 2.00a13.

- Investigator Editor: custom home locations cannot be edited, only re-created.

- Investigator Editor: custom items added on the possessions tab cannot be edited, only re-created.

- Home locations with different location type may be considered equal.

- Game items with different expansion code may be considered equal.

- Investigator Editor: missing space in required expansion list

- New Component Dialog: does not preselect Investigator when running in language other than English.

- Premultiplied translucency option (controlled by setting key `premultiply-image-alpha`) doesn't work correctly.

- Regression: Reference Map plug-in can't find "guaranteed" location icons.

- Nimbus L&F workarounds allow setting default L&F back to "auto" (only makes a difference in Java 6 update 10 or newer).

- Regression: autocompleting combo box does not attempt to complete single letter.

- Scenarios: Clear command doesn't clear AO name.

- Plug-ins: needlessly loaded/unloaded during startup.

- Regression: `print`/`println` generate extra newline in script console.

- Regression: `<gate>` tag produces wrong family.

- Scenarios: left side mark-up area misses standard tag initialization.

- Spelling: incorrect handling of apostrophes.

- Scenarios: version mismatch when loading saved files.

- Regression: after using item wizard, item reverts to prior state.

- Herald/Guardian: missing text fitting setting key.

- Herald/Guardian: left side mark-up area does not recognize some standard tags.

- Case Book: refactoring dialog rejects labels with uppercase letters.

- New Component Dialog: Cancelling New Item Wizard should stop new item editor from opening.

- Window Menu: order of windows in list should be stable.

- Regression: Next/Previous window commands do not traverse windows in the correct order in some Look & Feels.

- Regression: script console does not scroll to correct location after print.

- OS X: instantiating a deck fails with NPE (Apple's JVM returns `null` desktop rendering hints).

- Scripting: console's `print( Image )` changed to `insertImage( Image )` for better Rhino compatibility.

- New Component Dialog: when using multiple class maps, categories are not coalesced when a category name that uses @-syntax is repeated.

- Regression: multiple copies of the same sheet appear in deck card list.

- Regression: deck card paths are not updated properly if it contains cards whose location has moved.

- Deck Editor: find command examined items in unintuitive order in rare cases.

- Image Preloader: could not detect all relevant image resources.

- Regression: deck editor throws AIOOBE when opening a deck if it contains cards whose location has moved.

- Investigator Rules: automatic bonuses disabled by default, as per official characters.

- Regression: ignoring/adding a spelling word to the user dictionary does not correctly update existing editors.

- Deck: Opacity value in line/text box colour selector should be formatted as a percent.

- QuickScript: Deleting more than 1 screen length of lines starting from line 1 causes line numbers and editors to be misaligned.

- Monsters: Statistics for some monsters corrected.

- Selecting "Use Default" expansion symbol has no effect.

- Regression: Script console throws NPE if an extension script writes to a stream.

- Text scaling algorithm chooses wrong scale, generating text that is larger than it should be; in some cases it may incorrectly choose the minimum scale, causing text to be invisible.

- Regression: editing text box does not mark deck as having unsaved changes.

- Deck: can't use mark-up menu/shortcuts when editing text box.

- Deck: text boxes should obey `use-antialiased-text-on-highquality` and `use-fractional-glyph-metrics`.

- Regression: Ancient One doom tracks of 1-10 cause a fatal error.

- Scripting: Rhino JavaScript implementation not compatible with Sun's Rhino fork (missing `println()`, etc.)

- OS X: Apple does not include standard JavaScript engine.

- Injury/Madness: title should be vertically centered.

- Location card: when opening saved file, a gate card editor is created .

- Case Book: should display a caret to give feedback during cursor key navigation.

- Monster: back face renderer used front face for sizing.

- Deck: repeated paste operations should cascade items.

- Deck: location of pasted cards should not depend on grid size.

- Image cache release old images too readily, causing more reloading than needed.

- Mythos card: selecting unnamable location causes missing resource error.

- Mythos card: selecting double doom/double terror may cause fatal error.

- Mythos card: after entering custom gate name, gate burst option may be disabled.

- Mythos card: after selecting "None" as gate and entering custom gate, the gate information is not displayed (as if "None" were selected).

- Cannot read text of error dialogs that occur as a result of errors while a card preview is being painted.

- Arkham Encounter card: after opening a card with custom location images, the portrait paths are not filled in with the correct portrait.

- Deck: possible `ConcurrentModificationException` when deleting selection.

- Deck: 1.80 stopped exporting decks.

- Resizing the Insert Image Dialog resets the image to its default size.

- Item Wizard: items are created in the interface language instead of the game language.

- When running with "limit to single instance" disabled, files on the command line are not opened.

- Mark-up tags are not filtered out of suggested file names.

- Foldable tome: back cover prints incorrect text.

- Localized number entry and display (e.g., scale of 2.00 vs. 2,00) should now be consistent across the application.

- Arkham Encounter: cards open as Other World encounter cards.

- Exhibit items: text now extends to bottom of card if no hand symbol or cost is shown.

- Deck editor: delete page action sometimes disabled at inappropriate times

- Item wizard: option to add +1 bonus when using extra hand with a weapon should be disabled (and label set to a proper value) when a weapon is two-handed.

- Monster editor: edit area could "collapse" at certain window sizes.

- Mark-up renderer: might fail to correctly reset text scale on re-render.

- Deck editor: wrong card faces may be deleted.

- Deck editor: snap edge selection may be less than ideal when snapping to short or narrow cards. Sometimes the Z-order of cards would prevent some cards from being snapped against.

- Resource Tool: Under some circumstances, fails to extract resources (under this condition, it fails to recognize folders in the source jar and therefore does not create them in the destination; if they did not already exist, extraction fails).

- Preview Window: The loupe (magnifier) could paint outside of the preview window, painting over nearby window elements.

- Resource Tool: "Repack" option prints "The source folder does not appear to contain Strange Eons resources." and refuses to run.

- Case Book Editor: creation failed in 1.80b2.

- Other World Encounter: Dual-colour cards "forget" their second colour when opened from a file.

- Suggestion windows can be rolled up but not back down.

### 1.71 (Nov 2007)

**Arkham Encounter Card Editor**

- Added.

**Magical Effect Card Editor**

- Added.

**Spell Card Editor**

- Added option to automatically calculate costs based on 2 + |sanity cost| + |casting modifier| + base-spell-cost-adjustment. This option is on by default for new spell cards.

**Mythos Card Editor**

- Added option for double terror track tokens to gate locations.

**Investigator Editor**

- Added additional suggestion regarding the number of special ability rules.
- Skills may range from 2 to 7 instead of 3 to 6 (with appropriate warnings).

**General Features**

- Portrait adjustment panel allows directly entering pan (translation) values.

**Bug Fixes**

- Objects in deck editor look nicer.
- Using Clear command in Deck Editor did not correctly delete pages from the deck.
- Removing a page in the deck editor deleted it from the editor but left it in the deck.
- Single closing quotes should not be able to break lines when they are acting as apostrophes.
- Image tags using the res:// protocol do not use the user's custom folder setting.
- On gate cards, the monster movement box is centered when no gate opens.
- Custom location names entered in the gate location box are now correctly drawn on the card.
- Tint panel and portrait adjustment panel fields update tint/portrait state when tabbing from the field to the next control.

### 1.70

**King in Yellow Expansion Support**

- Added support for KiY material, except Magical Effect cards.

**Herald/[Guardian](https://web.archive.org/web/20081231142730/http://www.fantasyflightgames.com/cgi-bin/yabb/YaBB.cgi?num=1183497764/0#1) Cards**

- Added.

**Mythos Cards**

- Added.

**Item Editor**

- Added support for skill check and health-related miscellaneous items to New Item Wizard.

**Gate Cards**

- Added. Creates gate cards in either the standard colours or a custom tint.

**Injury and Madness Cards**

- Added.

**Miscellaneous Investigator Card**

- Added. A tintable, general-purpose card for special investigator effects.

**Ally Editor**

- Made <h1> produce a different text size to mimic official cards. Changed example text to provide a more complete example.

**Investigator Editor**

- "Special" fixed possessions with a secondary class (e.g., Benefit, Injury) use the name of the secondary class instead of the generic label "Special."
- Comments and suggestions moved to be continually visible and visualize changes between edits.
- Flamethrower is not considered "powerful" (that is, it does not cost extra when purchased as a fixed possession). This reflects use of the item in The Dunwich Horror.
- Elder signs (and parchments) are not considered appropriate fixed possessions.
- Additional comments and suggestions.

**Ancient One Editor**

- Added an option to create a custom doom track.

**Monster Editor**

- Monster similarity moved to be continually visible and visualize changes between edits.
- King in Yellow Riot "monster" added stats added to monster similarity table.

**Deck Editor**

- Printing or exporting from the deck editor will automatically generate suitable crop marks in the output.
- When opening a deck and the source component files cannot be found, and the user points Strange Eons to the correct location of the files, the deck will be marked as unsaved after opening and saving the deck will save the updated file locations with the deck.
- When opening a deck and a source component files cannot be found, the folder that the deck is opened from will be checked for a file with the same name.

**Image Export**

- When exporting images, the front and back of the card can be combined into a single image. This is now the default for the "post online" option and the "suitable for printing" option. The "consistent" option continues to export separate images for the front and back (part of its purpose is to export images compatible with previous versions).
- It is possible to select a compression level for images exported in JPEG format, and both PNG and JPEG images may be exported with progressive scans ([hierarchical JPEG](https://web.archive.org/web/20081231142730/http://www.sfu.ca/~cjenning/toybox/hjpeg/index.html) or interlaced PNG).
- PNG images include resolution metadata.
- An option for thumbnail-sized export images (48 DPI) has been added.

**General Features**

- Mark-up tags may now be used wherever you are allowed to enter arbitrary text. This includes the first name, last name, and occupation of investigator cards, the name and combat bonus of ancient one cards, the name of monster tokens, and the name of ally cards.
- Generates opening and closing double and single quotes from " and ' automatically unless surrounded by <no punctuation>...</no punctuation>.
- Conversion of -- into en-dash, --- into em-dash, and ... into ellipsis unless surrounded by <no punctuation>...</no punctuation>.
- All symbols with specific tags (<">, <...>, etc.) should now have a working glyph in all of the built-in fonts.
- The portrait file path field and the image tag now share a common URL resolver, so it is now possible to use res:// URLs in portraits as well (previously other URLs worked; res:// URLs are new).
- When the paragraph renderer shrinks text to make it fit in the available space, it now makes much more precise choices (it finds the best scale to the nearest 1/10 of 1%). Text will now shrink much more smoothly and gradually as the length of the text grows.
- The tag parser for paragraph text has been rewritten to allow for tags with parameters. The tags <image>, <tabwidth>, <color>, <bgcolor>, <family>, <size>, <autoclose>, <manualclose>, <tracking>, <define>, <repeat>, <top>, <middle>, and <bottom> have been added (see the [Tag Table](https://web.archive.org/web/20081231142730/http://www.sfu.ca/~cjenning/eons/tag-table.html) for details), and backslash causes whitespace to be ignored, allowing for more readable source text.
- New portrait adjustment interface.
- Interface feedback when exporting and printing.
- Wait cursor feedback when opening/creating new cards/saving/redrawing edit changes.
- Faster startup.
- All out of memory conditions in the event dispatch thread should now be caught and reported.
- Support for displaying localizable help pages.

**Localization**

- First properly working Italian translation.

**Bug Fixes**

- Card exporter could get into an inconsistent state due to an out of memory condition while exporting cards with the front and back joined together. It would then no longer work correctly.
- Suggestions for home locations in other worlds not displayed when appropriate.
- Native resource leak (Graphics context) when re-creating the investigator and ancient one cached background images.
- Investigator and Ancient One portraits rendering at the resolution of the template image instead of the requested resolution.
- Typos in English special abilities (Leadership, Science!).
- Changes to preview quality are immediately reflected in the preview.

**Arkham Encounter Cards**

- This feature has been deferred until a later version.

### 1.62

**Deck Editor**

- Added. Groups a set of Strange Eons files into a single printable "deck" of cards. Quickly lays a set of cards out onto one or more pages.

**Item Editor**

- The New Item Wizard has added support for Tomes, Tasks, and Missions.

**Investigator Editor**

- Improved card template.
- Selecting an area of an Other World for the Investigator's home location integrated into the existing drop-down list of locations.
- Long home locations will be shrunk to fit on the Investigator card.

**Paragraph Renderer**

- Added tags <left>, <center>, and <right> to control the justification of body text.
- Added symbol tags: <...> for ellipsis; <"> and </"> for double quotes; <'>, </'>, <lsq>, and <rsq> for single quotes.
- Added <The home> as equivalent for <capital the home>.
- Added user-definable tags: <define "tag" "text"> will cause following instances of <tag> to produce *text*.
- Added the <largecard> tag to select the typeface used for titles on Ancient One cards.

**General Features**

- Updating the card is now postponed until the user stops making changed to it for a length of time equal to the update rate. This should alleviate editing interruptions on slower computers. (If you want the card to be kept in closer synch with the edit fields, increase the update rate in the Settings dialog.)
- Files open faster.
- Export dialog made more task-centric.
- More helpful error messages for out of memory conditions.
- Updated standard body fonts (Linux Libertine) to most recent versions.

**Bug Fixes**

- The default scale for some portraits is not always the best choice.
- Catches running out of heap space during print operations.
- Clear command failed to effect monster special text.
- Changing the value of a replacement tag (such as a character's name) in a paragraph layout, and changing gender in a gender-aware paragraph layout, now correctly force the markup to be reinterpreted before being rendered with again.

### 1.61

**All Editors**

- Portrait images can be specified using either a path to the image file (as in previous versions), or using an http:// or ftp:// URL.

**Item Editor**

- A "wizard" has been added that can assist in the creation of balanced items. This is a work in progress: currently it can only create new weapons. Future versions will assist in the creation of other item types.

**Monster Editor**

- The base resolution of monster tokens in the editor has been increased to 300 DPI. The images used to create the tokens are still 150 DPI, but the increased base resolution makes the small text on these tokens clearer and easier to read.

**General Features**

- Image export allows selecting a target resolution for exported cards. Although some elements, like the template images used to build the cards, have a fixed resolution that cannot be effectively changed, other elements, like text and user-supplied images, will be rendered at the full export resolution, which can increase quality dramatically.
- Ability to open newly created *.zip* files after exporting cards has been exposed as an option in the Settings dialog.

**Bug Fixes**

- A bug introduced in 1.60 caused character markers to print too large.
- If the language of the host system was not one of the supported game languages and the game language setting was "decide automatically," the message "You have requested cards with a language code of EN. This is not in my list of supported languages. English (EN) will be used instead." would appear. Once the message was dismissed, the program would proceed normally.

### 1.60

**Investigator Editor**

- When choosing an Other World starting location, an area can now be specified.

**Item Editor**

- Added editor for common, unique, and exhibit items. (Unlike official cards, exhibit items can be "handed," that is, require 0-2 hands to use.)

**Skill Editor**

- Added.

**Spell Editor**

- Added.

**Card Quality**

- When printing cards, the text and custom images can print at a resolution higher than the base resolution of the card template, producing greatly improved print results. A minimum resolution for printed cards can be set by changing the value of the `target-print-dpi` key (the default is 450 dots per inch). When printing, cards must be rendered at at least that resolution. Therefore, increasing this value can significantly increase the time required to print files, as well as the memory required by the program.

**General Features**

- The Resource Tool now allows recombining a resource folder and a copy of the Strange Eons *.jar* file to create a customized version of the program. (The new tool also includes an important bug fix.)
- A custom small caps eroded Caslon typeface has replaced the previous eroded small caps typeface for setting investigator card titles. This matches official cards more closely.
- Application is now limited to a single instance. This means that if you are using the Windows installer version and click on .eon files to open them, they will no longer open in their own copy of Strange Eons. *Some Technical details:* The first instance of the program will attempt to install a server that listens on port 21573. If another instance starts, the first instance will be sent any files that the second instance was asked to open on the command line via this port. The first instance will then attempt to open those files, and the second instance will exit. If the attempt to connect to the server fails (for example, if port 21573 is already bound to a different application), then the second instance will start normally.
- Added <loose> tag to complement <tight>.

**Localization**

- Updated language files: Spanish, French, and Italian translations for 1.60 features; French translations for allies and monster similarity. Further updates to the localization files will be made as they become available.

### 1.50 (Feb 2007)

**Monster Editor**

- Added. The editor will list similar monsters on the Comments tab to help you gauge monster difficulty (akin to design suggestions for investigators).

**Ally Editor**

- Added.

**Investigator Editor**

- Skills can be bought as fixed possessions, if you really feel the need.
- Up to two extra Stamina or Sanity points can be purchased at a cost of $8 each. This can be used to break the Sanity + Stamina = 10 rule used for standard characters.
- Up to two extra skill points may be purchased (previous limit was one point) at a cost of $8 each.
- Additional design suggestions.

**Ancient One Editor**

- Zero added as a possible doom track length.
- The example Ancient One has been corrected to indicate a Stamina damage of 2 instead of 1 (otherwise Zhar cannot devour Vincent).

**Resource Tool**

- A new resource tool simplifies the task of customizing Strange Eons resources. It can create a set of resource files for you to modify, and switch between a folder of resource files and the built-in ones. Updated instructions in the Customization section explain how to start and use it.

**Localization**

- Basic support for localization of the user interface has been added. As of 1.50 beta 1, the only locales available are English (Canadian/UK/US), French, and Spanish. Other locales should appear in time.
- A comprehensive system has been added to support game editions in other languages. Complete or nearly-complete translations are currently available for English, French, German and Spanish. Support for Italian is underway. Please report any errors or discrepancies between the official cards and the ones produced by SE. For the current status of the various translation efforts, see the table at the top of the translation guide.
- Items, home locations, and special abilities are presented in sorted order according to the locale-sensitive collation rules, regardless of the order of these objects in the data files.
- A settings dialog allows modifying language settings, some Rules, and some performance options. (These settings have always been available; the dialog just provides a friendly way to modify them.)

**Improved Typography**

- **[Requires Java 6]** The project now includes fonts from the Linux Libertine project so that body text is rendered consistently across platforms. This ensures that all platforms can make use of ligature support and a consistent set of Unicode characters. The same procedure is applied to the other embedded fonts (the title font and card title font), which has other positive side effects. For example, the <b> and <i> tags will effect special ability titles on an Investigator card. Under Java 5, body text will fall back to the system-dependant "Serif" font and other embedded fonts will behave as in previous versions.
- **[Requires Java 6]** Paragraph layout will make use of kerning information in fonts, and supports automatic ligature replacement.
- A freeware antique small caps font is included. This is to provide future support for investigator card (items, skills, allies, etc.). It can be accessed in paragraphs using the <card> tag (under Java 6).

**General Features**

- Zooming (with mouse wheel) and dragging of sheets in the preview window. Right click resets view to default.
- The interface has been re-designed to use a multiple document approach that allows opening multiple files simultaneously. If you have many files open at the same time, you may need to increase the memory available to Java to avoid out of memory errors. (The Windows version does this already.)
- A number of new tags for formatting and laying out paragraphs. In addition, the gender-specific tag system has been rewritten so that any user-supplied tag of the form **<m/f>** can be used.
- The user may choose either .png or .jpg file formats when exporting to .zip files.
- **[Requires Java 6]** After exporting to a .zip file, the program registered to handle .zip files is launched to display the file (if one exists). Note: Java support for this feature is still buggy; it is disabled by default. It can be enabled by setting `open-zip-after-export = yes` in your local settings.
- Characters that are illegal in file names under MacOS, Unix, or Windows are dropped when suggesting save file names and when composing names within exported .zip files.
- Better handling of uncaught exceptions during startup.

**Known Issues**

- On my Java 5 test machine, SE sometimes stops during startup at "Reading language data..." without displaying any error message. Other times it starts normally. I have not been able to reproduce this problem reliably, so I have yet to determine the cause.
- [Windows .exe Version] Double-clicking multiple .eon files opens each in its own copy of SE instead of opening them in a single window.
- [Corrected in beta 1c] Bugs related to File|Close, File|Exit and clicking close button on window. File|Close did not correctly close the window, failing to offer to save unsaved cards. Modified cards that were disposed of but not removed from their container, causing a later null pointer exception that prevented the main window close button from completing the close operation and exiting the program.

### 1.12 (Dec 2006)

**Added**:

- The completed female default character and her finished portrait. When starting the investigator editor, the initial investigator is now randomly either the male or female built-in one.

**Changed:**

- Various small user interface improvements. Most notably, automatic selection of character sheet tabs when editing. Also, an explanation of the various focus bonuses and penalties.
- Various small bug fixes.
- **Egyptology** ability re-worded for clarity.
- Cost for Silver Twilight Lodge Membership changed to $10 since the extra cards in Dunwich Horror make it more worthwhile (and give it that cost officially). If playing without this expansion and you want a character with a STLM, you may want to use the item creator to create a STLM that costs $6.
- Optimized packing reduces download sizes a (very) modest amount but strips source information from exceptions.
- Added a few more symbols to the typewriter typeface: [, ], and %.

**Known Issues:**

- When using the `use-ally-cost-equality` rule (which is on by default), the price correction is incorrectly applied to spells instead of allies.
- When opening a saved character, the gender is always female on some systems. This should be fixed in version 1.50. In the meantime, check the gender after loading the character if you use gender-specific tags or the built-in portraits.
- If the character's name contains characters that are illegal in a file name, it it won't export to a .zip file correctly. (Version 1.50 silently drops characters that are illegal under MacOS, Windows, and Unix when using them in file names while exporting.)
- It is impossible to completely translate the generated cards because some elements are not configurable.

### 1.10 (Nov 2006)

**Added:**

- A few new tags were added to the paragraph renderer: `<h2>`, `<sup>`, `<sub>`, `<u>`, `<del>`, and `<tight>`.
- Start of Battle field added to the Ancient One editor; it will automatically place itself wherever there is the most space, or you can specify a location.
- Some missing characters have been added to the typewriter typeface (My Old Remington), including +, <, =, >, *, #, and ∞ (the infinity symbol).

**Changed:**

- The paragraph renderer has been completely rewritten. It now supports automatic line spacing reduction and font scaling to make long paragraphs of text fit. By default, the paragraphs on the Ancient One editor will allow both spacing and scale to be adjusted, while the Investigator editor will only reduce line spacing.
- The free clue for unstable home locations is now automatically footnoted in the special ability area.
- Name and title fields on the Investigator sheet will shrink long text to fit.
- Fixed and random possessions now render as a single paragraph, so the Random Possessions label floats and long item lists can be resized to fit (up to five lines of items are now possible).
- Ancient One editor fields reorganized to match the layout on the cards.

### 0.92

**Added:**

- Alpha release of an Ancient one editor.
- "New" button to clear all character fields.
- Configuration of the character creation system via *rules* in the *settings.txt* file.

**Changed:**

- A free clue is provided when starting at an unstable location.

### 0.91

Minor bug fixes.

### 0.90 (Autumn 2006)

First public release.