# Script library API

Plug-ins are often written using script code. Script code is used for other purposes as well, such as [automation](um-proj-automation.md) and [factory](um-proj-csv-factory.md) scripts in projects. While scripts have full access to the regular [Java class API](dm-java-api.md), there are also a number of small script-specific libraries available that make scripting significantly easier.

## How to use script libraries in your scripts

To use a library, simply call the `useLibrary` function and pass it the library name as a string. This code would give you access to everything defined in the [imageutils](assets/jsdoc/imageutils.html) library:

```js
useLibrary("imageutils");
```

The function must be called before you use any of the material defined in the library. For this reason, it is customary to place the `useLibrary` calls for all of the libraries a script relies on at the top of the script.

### Defining your own libraries

You can write your own libraries to reuse code in different scripts in your plug-in. Store the script in your plug-in's [resources](dm-resources.md) and include it in other scripts by passing `res://` and the resource path to the library:

```js
useLibrary("res://path/to/my/library/under/resources/my-library.js");
```

## API documentation

Documentation for all of the standard script libraries can be found here:  
[Script API index](assets/jsdoc/index.html). 

Here is a brief overview of some of the most commonly used libraries:

**common**  
The [common](assets/jsdoc/common.html) library does not need to be included explicitly; it is automatically included in every script. It defines a number of basic functions and objects, such as `println` and `useSettings`.

This library will define the variables `Eons`, `Editor`, and `Component` which allow you to access the application, the currently selected editor, and the currently edited game component (if any). It also defines shortcuts to commonly used parts of the Java APIs, such as `arkham` as a shortcut to `ca.cgjennings.apps.arkham`.

**diy**  
The [diy](assets/jsdoc/diy.html) library defines the basic support code needed to [create game components with script code](dm-diy.md). It must be included in every DIY component script.

**extension**  
The [extension](assets/jsdoc/extension.html) library implements the code needed to have your plug-in treated as an extension. It also pre-imports some classes that are commonly used by extensions, such as the [gamedata](assets/javadoc/gamedata/package-summary.html) package.

**fontutils**  
The [fontutils](assets/jsdoc/fontutils.html) library defines some helper functions for working with [font resources](dm-res-font.md).

**imageutils**  
The [imageutils](assets/jsdoc/imageutils.html) library defines some helper functions for loading, saving, and manipulating images.

**markup**  
The [markup](assets/jsdoc/markup.html) library provides the resources needed to create and configure markup boxes. Markup boxes typeset the markup text entered by the users in game component editors. They are commonly created and used on DIY components.

**project**  
The [project](assets/jsdoc/project.html) library supports extending the project system with new commands, file types, and other features.

**tints**  
The [tints](assets/jsdoc/tints.html) library supports creating game components with tintable graphics, which allows users to easily add variations to a basic component design.

**ui**  
This library is a convenience that simply includes three other libraries that are often [used together](dm-diy.html): [uibindings](assets/jsdoc/uibindings.html) (creates *bindings* between interface controls and the state edited by those controls), [uicontrols](assets/jsdoc/uicontrols.html) (supports creating user interface controls), [uilayout](assets/jsdoc/uilayout.html) (lays out groups of user interface controls).