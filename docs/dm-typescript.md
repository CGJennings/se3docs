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

### Module support

TypeScript uses the [module syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) introduced in the ECMAScript 2015 (ES6) edition of JavaScript to load code from other source files. A module is loaded and run separately from the script that loads it&mdash;that is, it runs in its own scope. The module author *chooses which objects* to export to the the caller's scope. This is different from `useLibrary` which runs the loaded script in the same scope as the caller, meaning any objects defined in the global scope of the library script are also defined in the script that called `useLibrary`. 

For example, this module defines four symbols: `helper`, `double`, `triple`, and `quadruple`. But it only *exports* `double`, `triple`, and `quadruple`, so code that imports this module will have no way to access `makeNTimesFunction`:

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

You may have noticed that the import function can describe the target script using a relative path. For example, the code above expects the `n-times.ts` script to be in the same directory as the script that imports it. (You can also use full `res://` or `project://` paths as you would with `useLibrary`.)

Import paths that do not contain a `/` are treated specially. They bypass the usual rules for modules and run the target script in the global scope, exactly like `useLibrary`. This means that you can use `import` syntax for libraries, too. Since libraries do not export anything (or rather, export everything whether you want them to or not), there is no need to list the symbols you wish to import:

```ts
import "diy";
```

The TypeScript `import` statements will be translated to CommonJS-style (or "Node-style") `require()` calls, for which support was added to Strange Eons&nbsp;3.2.

## Want to help?

In principle, it should be possible to provide more-or-less complete support for TypeScript-based plug-ins. This includes:

- Automated compilation (e.g., saving a `.ts` file in a project could trigger automatic compilation to a matching `.js` file).
- ~~Support for `import` (ES Modules) instead of `useLibrary`.~~ See above.
- Editing support via TS language services. The code editor should be able to provide:
  - error feedback
  - code completion
- Type definition support: to make full use of code completion, etc., requires proper type definitions. There are TypeScript-compatible `.d.ts` [type definitions for the script libraries](https://github.com/CGJennings/se3docs/tree/main/script-lib-types), but they were only intended to be used to produce the [library doc pages](assets/jsdoc/).

If you'd like to work on any of the above, [contributions are welcome](https://github.com/CGJennings/strange-eons)!