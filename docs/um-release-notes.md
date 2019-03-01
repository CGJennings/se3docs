# Release notes

## Next

The following changes are planned for inclusion in the next update. This list is *informational only*: nothing here is final until the update is actually published. Some items may be deferred or abandoned, and other items may be added at any time. In particular, changes to the APIs and script engine have the potential to introduce compatibility issues with plug-ins which might lead to those features being delayed or withdrawn.

### Updates and changes

* Ink Saver, a new rendering mode that ensures that only the bare minimum is drawn. The standard behaviour (which some components may customize) is to draw a solid white background, text, and shapes (no images).
* The ["Readme" Web page](um-gc-export.md#the-readme-file) that is included with exported images has been rewritten to modern Web standards, including support for printing and mobile devices.
* Help buttons now link to the new [documentation pages](index.md).
* The recent file menu now lists projects before other files; within each section the items are still listed from most to least recently used.
* [Typeface viewer](dm-type-viewer.md)/insert character dialog:
  * highlight the following cell types using different colours: control characters, unassigned code points, code points not present in the selected font;
  * rows with no assigned Unicode code points are hidden;
  * enter a hexadecimal code point (e.g., `u+2c7e`) in the search field to go to that code point (or the nearest valid row).
* [Projects](um-proj-intro..md) stored in a version control system will no longer want to commit their project and task folder settings (`seproject` files) every time the project closes.
* The layout of the [root file editor](dm-eons-plugin.md) has been reorganized to better fit small screens.

### Script library updates

* The `sprintf`-style script library functions will now coerce numeric conversions when possible. This means that, for example, you can now pass a regular JS number to a `"%d"` conversion and it will not throw an exception. It is also now possible to pass a Locale or Language as the first argument to localize formatting (previously the interface locale was always used). Passing a locale of `null` as the first argument will prevent all localization.

* Calling `@(keyStr, formatArgs...)` or `#(keyStr, formatArgs...)` will format interface and language strings (respectively). Previously, this was done by calling `string` and `gstring` (which still works). In other words, the following are now all equivalent:

  ```js
  @("key-name", arg1, arg2, arg3);
  string("key-name", arg1, arg2, arg3);
  sprintf(@key-name, arg1, arg2, arg3);
  ```

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

// if the function takes multiple arguments
f = (x,y) => x*x + y - 1;

// if the function requires multiple statements or
// doesn't return anything
f = (x) => {
  // function body ...
};

// functional programming is much more convenient
evenNumbers = [0,1,2,3,4,5].map(v => 2*v);
```

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
- Added `StrangeEons.getUrlForDocPage` to get a URL for a page in the se3docs site give its base file name (e.g., `"dm-preferences"`).
- Method `FillInPreferenceCategory.addHelp` no longer takes third argument (old code will still work).
- Deprecated `JHelpButton.setWikiPage`; this now forwards to `setHelpPage`.
- Removed `arkham.project.PluginWizard` (superseded by `PluginWizardDialog`).
- Removed deprecated `arkham.dialog.prefs.SBOrderedList`.
- Removed `PlatformSupport.isOSXMinorVersionAtLeast`, `isUsingAquaDerivedLookAndFeel`, `isUsingOSXSystemLookAndFeel`, `isUsingQuaquaLookAndFeel`.

### Bug fixes

* In the [**Test Plug-in**](dm-test-plugin) dialog, only explicitly selected locales are passed to the test instance (entering a locale code directly in the text field had no effect).
* Script function `Console.printComponent` failed due to argument name mismatch.
* [**Quickscript**](dm-quickscript.md): Printing of the return value could evaluate a Scriptable outside of a JS context.
* [Root file editor](dm-eons-plugin.md): Changing the list of interface languages does not update the description language combo.
* Fixed an issue with immediate repainting of the script console when running code from the UI thread.
* Command line help for [`register`](um-install-other.md), used to register the app via `xdg-utils` (for Linux-based systems) did not list the `--uninstall` option.
* The [**Image Export**](um-gc-export.md) dialog must not allow "combining faces" and "excluding simple faces" to be selected at the same time.
* Opening a `project:` URL when no project is open should throw a suitable FileNotFound exception.

### Java 9+ compatibility

Officially, Strange Eons currently requires Java 8, but work is underway to support Java 9 and later. Here is a summary of the current status:

* The major known obstacles have been solved; SE can be started under Java 9.
* When starting SE from the command line, the option <code>-javaagent:<i>&lt;path to strange-eons.selibrary&gt;</i></code> must be added.
* Further work is required for Java 11 due to the removal of some APIs.