# TypeScript

Starting in version 3.2, *experimental* support for TypeScript is available.

The current implementation is rudimentary, and mainly useful for experimentation and as a basis for further development.

## What is TypeScript?

[TypeScript](https://www.typescriptlang.org/) is a typed superset of the JavaScript language. Script code that worked previously should also work as TypeScript code without changes. However, you can also now annotate your variable declarations with *type information*. Adding a type to a variable, property, or argument lets TypeScript check that you are using it correctly. This avoids many common sources of bugs in script code. For example, consider the function:

```ts
function thrice(n) {
	return n * 3;
}
```

Although intended to triple any number passed to it, JavaScript will happily let you call this function with kind of value, number or not. With TypeScript you can declare that `n` is a number and that the `thrice` function returns a number:

```ts
function thrice(n: number): number {
    return n * 3;
}
```

Now if you try to call it with the wrong type of value, TypeScript can complain about it instead of allowing it but returning a meaningless result like JavaScript would.

The TypeScript compiler also supports some newer JavaScript features that are not available in the JavaScript engine used by the app, such as class syntax and template strings.

## Using TypeScript

**As stated above, TypeScript support is currently rudimentary.**

The Java package [`ca.cgjennings.apps.arkham.plugins.typescript`](assets/javadoc/ca/cgjennings/apps/arkham/plugins/typescript/package-summary.html) contains classes that provide a Java interface to TypeScript language support. The `TypeScriptServiceProvider` class provides direct access, but usually the `TypeScript` utility class is used instead. `TypeScript` provides shared access to a `TypeScriptServiceProvider` that runs your tasks in a background thread.

**Example**  

```js
// Run this in the Quickscript window to compile some TypeScript
importClass(arkham.plugins.typescript.TypeScript);

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

TypeScript.transpile(typeScriptCode, consumer);
println("transpiling in background, will print result when done...");
println("(it takes time to start up the first time it is used)");
```

> The Java API is intended to hide most of the details of working with the TypeScript compiler API. However, if you want to use the compiler directly, you can do so as follows:
> 
> ```js
> const ts = new arkham.plugins.typescript.TypeScriptServiceProvider().ts;
> ```
> 
> Be aware that, just as when the `TypeScript` class is used for the first time, there will be a delay of several seconds while the TypeScript compiler is loaded and run.

## Want to help?

In principle, it should be possible to provide more-or-less complete support for TypeScript-based plug-ins. This includes:

- Automated compilation (e.g., saving a `.ts` file in a project could trigger automatic compilation to a matching `.js` file).

- Support for `import` (ES Modules) instead of `useLibrary`. This can be done by implementing a version of the NodeJS `require` function (the TypeScript compiler will convert `import`s to calls to `require`). Some thoughts and observations:

  - Libraries loaded with `useLibrary` are expected to have side effects (they add their definitions to the global scope). Modules loaded with `require` generally don't. This could be handled by checking the file to be required, and if it appears to be a library (i.e., it has no path elements), invoking `useLibrary` under the hood. Otherwise, the `require` implementation would proceed normally. This would lead to code like the following:

    ```js
    // import for side effects, equivalent to useLibrary("markup")
    import "markup";
    // import the exported objects thing1 and thing2, no side effects
    import { thing1, thing2 } from "./a-proper-module";
    ```

  - Modules loaded with `require` are only supposed to be run once even if they are `required` multiple times. This could perhaps be managed using named objects, or an equivalent similar feature. (This would mean that a required script would only be run once app-wide; individual plug-ins, for example, would not be isolated from each other.)

- Editing support: the code editor can provide error feedback, code completion, and more via the TS language services.

- Type definition support: to make full use of code completion, etc., requires proper type definitions. There are TypeScript-compatible `.d.ts` [type definitions for the script libraries](https://github.com/CGJennings/se3docs/tree/main/script-lib-types), but they were only intended to be used to produce the [library doc pages](assets/jsdoc/).

If you'd like to work on any of the above, [contributions are welcome](https://github.com/CGJennings/strange-eons)!