/**
 * This is a placeholder in the documentation for any instance
 * of a Java object. For example, if a function expects an argument
 * with the Java type `package.Class`, this is listed
 * in the documentation as `JavaObject<"package.Class">`.
 * Clicking on the class name (the part in quotes) will jump to the
 * documentation for that class in the
 * [Java API documentation](https://cgjennings.github.io/se3docs/assets/javadoc/).
 * 
 * **Please note:** This special notation is a trick to make the system that
 * builds the JavaScript documentation happy (since it doesn't know anything
 * about the Java API). You would never write `JavaObject<"...">` in your script code.
 * To refer to the class of the object in your code, the part in quotes will suffice.
 * For example, suppose you have a function `writeFile` that the documentation states
 * takes a `JavaObject<"java.io.File">` (a Java File object). Then the script
 * code that calls `writeFile` might look like this:
 * 
 * ```
 * let myFile = new java.io.File("~/chris/output.txt");
 * writeFile(myFile);
 * ```
 */
declare interface JavaObject<T extends string> {
    // /** Returns a copy of this object, if it implements Cloneable.*/
    // clone(): JavaObject<T>;
    // /** Returns a string representation of the object. */
    // toString(): string;
    // /**
    //  * Returns true if another object "equals" this one.
    //  * @param Object the object to compare this object to
    //  */
    // equals(Object: object): boolean;
    // /** Returns the class of the object. */
    // getClass(): JavaClass<T>;
    // /** Returns a hash code value for the object. */
    // hashCode(): number;
    // /** Wakes up a thread that is waiting on this object's monitor. */
    // notify(): void;
    // /** Wakes up all threads that are waiting on this object's monitor. */
    // notifyAll(): void;
    // /**
    //  * Pauses the current thread until another thread calls this object's 
    //  * [[notify]] or [[notifyAll]] method.
    //  */
    // wait(): void;
    // /**
    //  * Pauses the current thread until another thread calls this object's
    //  * [[notify]] or [[notifyAll]] method or the specified timeout elapses.
    //  * 
    //  * @param msTimeout time to pause, in milliseconds
    //  */
    // wait(msTimeout: number): void;
    // /**
    //  * Pauses the current thread until another thread calls this object's
    //  * [[notify]] or [[notifyAll]] method or the specified timeout elapses.
    //  * 
    //  * @param msTimeout time to pause, in milliseconds
    //  * @param msTimeout additional time to pause, in nanoseconds
    //  */
    // wait(msTimeout: number , nsTimeout: number): void;
}

/**
 * The notation `JavaPackage<"name">` refers to a
 * package from the Java API with the specified name.
 * It is similar to [[JavaObject]], except for referring to
 * a package instead of a class. In Java, a package is a
 * name for a group of closely related classes. It is used
 * like a folder name: the class `java.lang.String` is found
 * in the package `java.lang`. The JavaPackage type is used
 * when a package is given a shorter alias to describe
 * the full package name. For example, the [[common]] library
 * defines `arkham` as an alias for the longer package name
 * `ca.cgjennings.apps.arkham`.
 * In the documentation, the full package name is listed as
 * `JavaPackage<"ca.cgjennings.apps.arkham">`.
 * 
 * As discussed under [[JavaObject]], you do not use
 * `JavaPackage<"...">` in your code. This notation is required
 * to make the system that builds the scripting documentation
 * happy because it doesn't know anything about the Java API.
 * It is rare for regular script code to refer to a package,
 * but you would do so by just using the part in quotes. For example:
 * 
 * ```
 * importPackage(ca.cgjennings.apps.arkham);
 * ```
 * 
 * For more information, refer to [[Packages]], [[importPackage]],
 * [[importClass]], and [[JavaObject]].
 */
declare interface JavaPackage<T extends string> extends JavaObject<T> {
}

/**
 * The notation `JavaClass<"name">` is a placeholder in the documentation for
 * a script object that *represents* a Java type (not an instance of a Java type).
 * It can be used instead of [[JavaObject]] to specify that the object in question
 * must be the fully qualified name of a Java class.
 */
declare interface JavaClass<T extends string> extends JavaObject<T> {
}

/**
 * The `Packages` constant provides access to the entire
 * Strange Eons [Java API](https://cgjennings.github.io/se3docs/dm-java-api.html).
 * It reflects the root of the Java class path
 * as a [[JavaPackage]] object. 
 * 
 * For example:  
 * `Packages.java.lang.String`  
 * `Packages.ca.cgjennings.apps.arkham.StrangeEons`
 * 
 * As a convenience, the [[common]] library predefines a number of
 * shortcuts to commonly used packages, including
 * `java`, `javax`, `swing` (short for `javax.swing`),
 * `ca` (root of most Strange Eons classes), `arkham`
 * (short for `ca.cgjennings.apps.arkham`, the most commonly used
 * part of the API), `resources` (where `ResourceKit` and `Language` live), 
 * and `gamedata` (where the classes for parsing and registering new content
 * live).
 * 
 * Classes and packages can be added to the global namespace using the
 * [[importClass]] and [[importPackage]] functions.
 * 
 * [More about accessing the Java API from script code](https://cgjennings.github.io/se3docs/dm-java-api.html#accessing-the-java-api-from-script-code)
 * 
 * [API documentation ("Javadocs")](https://cgjennings.github.io/se3docs/assets/javadoc/index.html)
 */
declare const Packages: JavaPackage<"">;

/**
 * Imports a class into the global scope so that it can be used by its
 * short class name. The effect is similar to using a Java `import`
 * statement. For example, the following code would import the class 
 * `java.io.File` so that it can be referred to simply as `File`:
 * 
 * ```
 * importClass(java.io.File);
 * 
 * let currentDir = new File(".");
 * println(currentDir.isDirectory());
 * println(currentDir.lastModified());
 * ```
 * 
 * The name is always added to the global scope of the script, even if called
 * from another scope (such as inside of a function).
 * Importing a class will fail if the class's short name is already in use.
 * In that case, you can instead assign the class to a name of your choice:
 * 
 * ```
 * const javaString = java.lang.String;
 * ```
 * 
 * @param javaClass the Java class whose class name should be added to the global scope
 * @see [[Packages]]
 */
declare function importClass(javaClass: JavaClass<any>): void;

/**
 * Imports all of the classes in a Java package into the script.
 * The effect is similar to using a Java `import` statement with `.*` after the package name.
 * When the script engine looks for a variable name, if it isn't defined in the current scope then before issuing an error it will check all of the imported packages to see if they contain a class of the same name, and if so that class will be imported. For example, in the following code `File` will match the class `java.io.File` from the `java.io` package, and this be implicitly imported:
 * 
 * ```
 * importPackage(java.io);
 * println(File.listRoots());
 * ```
 * 
 * @param javaPackage the package to add to the list of packages to search for class names that match unknown variables
 * @see [[Packages]]
 */
declare function importPackage(javaPackage: JavaPackage<any>): void;