# TypeScript

Starting in version 3.2, *experimental* support for TypeScript is available. This page describes the current implementation as of version 3.4, which is still incomplete. The implementation available on GitHub, even in the `main` branch is actively changing and may be broken at any given time.

## What is TypeScript?

[TypeScript](https://www.typescriptlang.org/) is a typed superset of the JavaScript language. That means that you declare what *type* a variable is, and that information will be used to help you work faster and make fewer mistakes. For example, here is a JavaScript function:

```js
function thrice(n) {
	return n * 3;
}
```

You can probably tell from looking at it that this function expects `n` to be a number, and that it returns a number that is three times `n`. But JavaScript doesn’t know that, and it will happily let you call this function with any arguments you like, or no arguments at all. If you call this function with almost anything other than a number, it will return the special number `NaN`, which means “not a number”. If you used this in a plug-in, that `NaN` value would almost certainly cause some weird, hard-to-find bugs down the line.

If this function was written in TypeScript, it might look like this:

```ts
function thrice(n: number): number {
    return n * 3;
}
```

This is exactly the same, except that it adds `: number` twice. These tell TypeScript what type of value `n` is (a number), and what type of value the `thrice` function returns (also a number). Now if you try to call this function with something that is not a number, like this `thrice('a string is not a number')`, TypeScript will give you an error message so you can fix it *before* it causes problems in your plug-in. These error messages will show up in the code editor as red underlines that you can hover the pointer over for more information. But that’s just the start. With TypeScript, you’ll get all sorts of helpful information and code completions based on the available type information.

## How do I use it?

> Currently, the **New/Empty TypeScript** option is hidden unless the user preference `hide-typescript-support` is set to `no` or `false`. You can still create a TypeScript file by either copying one into the project or renaming an existing empty file. The easiest was is probably to create a JavaScript file, then rename it to change the extension.

You can use TypeScript in a project task folder, typically a plug-in task. Right click on a folder in the task (or the task itself) and choose **New/Empty TypeScript**. Give the file a name, then double click to open and edit it. The editor will provide errors and other help as you work. When you save the file, it will be *compiled* (converted) from TypeScript to the regular JavaScript that Strange Eons expects. The result will be written to a file with the same name as your file, but with `.js` appended. So if your file is `blaster.ts`, it will be converted to `blaster.ts.js`. The project system will hide files that end with `.ts.js`, so you don’t normally see it. But you can find it if you go there in your system file explorer.

> Outside of Strange Eons, the TypeScript compiler normally converts a file like `name.ts` to `name.js` and not `name.ts.js`. Why do it this way? In Strange Eons, there is no “build” or “output” directory. Your converted file always lives in the same folder as the source file, possibly alongside “regular” JavaScript files. With this naming scheme, you can easily tell a compiled TypeScript transpiled file from other JavaScript files, and it is highly unlikely that you will accidentally overwrite an existing JavaScript file by mistake.

### Compatibility and using existing code

TypeScript is a superset of JavaScript. Regular, plain old JavaScript code will work unchanged. So if you want to convert existing code to TypeScript, you can start by renaming the `.js` file to `.ts`. However, Strange Eons script code is *not* pure JavaScript in a few cases. Also, there are things you can do to help TypeScript help you better. This section will let you know what to watch for.

#### $-, @-, #- notations 

Strange Eons uses [$-notation](dm-dollar-notation.md) as a shortcut to look up settings, along with @-notation to look up user interface language strings, and #-notation to look up game language strings. This causes some issues in TypeScript files. First, TypeScript doesn’t know that these are valid variable names or what type to expect. Second, the `@` and `#` characters are not valid characters for variable names in plain JavaScript, so it thinks that `@cancel`, for example, is a syntax error. The TypeScript compiler tends to leave these “errors” out when it produces JavaScript code, so they won’t work as-is.

There are several possible workarounds for this problem. For example, you can look them up as properties in the global scope; instead of `@cancel` you could use `global['@cancel']`. But the easiest solution is to use the `$(key)` function for settings, the `string(key)` function for user interface strings, and the `gstring(key)` function for game strings.

#### Using code from other files

Code that uses `useLibrary` will continue to work, but TypeScript does not understand what it does. When you use the objects defined by the library code, you will see errors in the editor because TypeScript does not know `useLibrary` made those objects available.

TypeScript uses the [module syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) introduced in the ECMAScript 2015 (ES6) edition of JavaScript to load code from other source files. A module is loaded and run separately from the script that loads it&mdash;that is, it runs in its own *scope*. In essence, this means that the module author *chooses which objects* to make available to scripts that import it. This is different from `useLibrary` which runs the loaded script in the *same* scope as the caller, meaning any objects defined in the global scope of the library script are also defined in the script that called `useLibrary`.

> Behind the scenes, the TypeScript compiler will translate the `import` statements to CommonJS-style `require()` calls. A minimal level of support for the require function has been added to the Strange Eons script engine in order to make this work. This function will recognize library and class names as a special case and translate them accordingly. Likewise, the `CompilationRoot` class that supports editing TypeScript files 
>

##### Including your own code

You can write your code as a module:

```ts
// code-to-include.ts
export MyFunction1() {...}
export MyFunction2() {...}
export let variable = "";
export const constant = 42;
// ..
```

And then import the exported values you want to use:

```ts
import {MyFunction1, variable, constant} from "./code-to-include";

MyFunction1(constant);
```

Import syntax is a big topic, but to expand on the above consider the following file (also called a module). It defines four symbols: `makeNTimesFunction`, `double`, `triple`, and `quadruple`. But it only *exports* `double`, `triple`, and `quadruple`, so code that imports this module will have no way to access `makeNTimesFunction`:

```ts
function makeNTimesFunction(multiplier: number) {
    return function times(x: number) {
        return x * multiplier;
    }
}

export double = makeNTimesFunction(2);
export triple = makeNTimesFunction(3);
export quadruple = makeNTimesFunction(4);
```

Moreover, the script that uses this module can choose which of the exported objects it is interested in:

```ts
import { double, triple } from "./n-times";

println(double(8));
// error, wasn't named above
// println(quadruple(8));
// also an error, that function was not exported
// println(makeNTimesFunction(4)(8));
```

The importing script can even rename the objects as it imports them:

```ts
import { triple as thrice } from "./n-times";

println(thrice(8));
```

As a final point, you have probably noticed that with `import` you describe the target script file using a relative path from the current file instead of a `res://` URL. For example, the code above expects the `n-times.ts` script to be in the same directory as the script that imports it.

##### useLibrary for standard libraries

You can use a version of `import` designed to support code that is only imported for its side effects (that it, imported to modify the global scope or perform some action other than exporting values). It’s easy. Instead of calling `useLibrary`, just import the library instead. For example, to import the DIY library:

```ts
// use this
import "diy";
// instead of this
useLibrary("diy");
```

##### importClass

The `importClass` function is used to add a Java (or Strange Eons) class to JavaScript. For example, this prints whether the file `/path/to/file.eon` exists on your device:

```ts
importClass(java.io.File);

let f = new File("/path/to/file.eon");
println(f.exists());
```

Again, this works under TypeScript but you won’t have proper type information. Instead, you can again use import syntax:

```ts
import "java.io.File";

let f = new File("/path/to/file.eon");
println(f.exists());
```

##### importPackage

The `importPackage` function makes all of the classes in an entire Java package available, instead of importing each one a class at a time. There is no direct equivalent for this, because determining which classes to generate type information for would be too expensive. Instead, import each class individually using the import syntax above.

# Advanced: Using the TypeScript language services from Java

TypeScript supported is implemented in the package `ca.cgjennings.apps.arkham.plugins.typescript`. The main entry point is the class `TSLanguageServices`. Because the TypeScript compiler library is a big blob of JavaScript code, which runs fairly slowly in Strange Eons, the library runs in another thread and this class is used to mediate your access to it from the current thread. Each instance of `TSLanguageServices` creates its own thread with its own copy of the library, but in most cases you will want to use the common shared instance that you can access by calling the static method `TSLanguageServices.getShared()`.

Each service is offered in two forms: a synchronous version and an asynchronous version. The synchronous version is easiest to use, but blocks the current thread until the call completes. This is a problem when called from the UI thread, as the app will appear to freeze until the call completes. Instead, you should use the asynchronous version where possible. This will supply the functions return value to a `Consumer` function, which will be called on the UI thread when the function completes.

For example, running this in Quickscript will compile (transpile) a short TypeScript script and print the result:

```js
// Run this in the Quickscript window to compile some TypeScript
importClass(arkham.plugins.typescript.TSLanguageServices);

const consumer = {
    // this is called once compilation is done
    accept(t) {
        println("\n// The transpiled code:\n");
        println(t);
        println("\nAnd now, let's run it:\n");
        eval(t);
    }
};

const typeScriptCode = '\
let worldType: string = "Transpiled"; \
println(`Hello, ${worldType} World!`); \
';

TSLanguageServices.shared.transpile("test.ts", typeScriptCode, consumer);
println("transpiling in background, will print result when done...");
println("(it takes time to start up the first time it is used)");
```

## Want to help?

TypeScript support is a work in progress. At the time of this writing, the basics work at an alpha level of quality. Here are some areas where you can help:

- Language service support in the editor is incomplete. The editor does not currently offer all of the functionality that the TS language server is capable of, such as refactoring. To add these, they need to be added to `TSLanguageServices` (and the `java-bridge.ts` script that translates between that class and the TS library) if they are not already supported, and then support has to be added to the code editor. Note that as of Strange Eons 3.4, the code editor has switched from using my own code to one based on [`RSyntaxTextEditor`](https://github.com/bobbylight/RSyntaxTextArea).
- Working on support for type definitions for the standard libraries. Some `.d.ts` files were already written for the script libraries, but these were only intended to be useful for generating the [library doc pages](assets/jsdoc/) and are not completely suitable. For example, they use syntax like `JavaClass<"java.io.File">` to represent Java classes, when the relevant type info should be imported instead.
- Working on support for type definitions for Java classes. The `JavaTypes` class is used to generate TS `.d.ts` type information for Java classes on the fly. Ultimately it is meant to generate this information via reflection, but currently it is only a stub that declares every class as having type `any`.
- Finding and solving bugs generally.

If you'd like to work on any of the above, [contributions are welcome](https://github.com/CGJennings/strange-eons)!