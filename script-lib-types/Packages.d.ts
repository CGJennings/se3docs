/**
 * The notation `JavaClass<"name">` refers to the type of a class or interface
 * from the Java API with with the specified name. For example,
 * if a function takes an argument of type
 * `JavaClass<"java.awt.Graphics2D">`, that means that the function
 * is called with a `java.awt.Graphics2D` object.
 * 
 * **Important:** Writing something like
 * `JavaClass<"java.lang.String">` in your
 * code will lead to an error!
 * This is a bit technical, but the notation
 * `JavaClass<"java.lang.String">` denotes the *type of object*
 * that the `java.lang.String` class is, not the `java.lang.String`
 * class itself. In your code, you refer to the actual class, which you
 * do simply by writing out the name. For example:
 * 
 * ```
 * let s = new java.lang.String("s will be a Java string");
 * ```
 * 
 * These names can be shortened for convenience; refer to
 * [[importClass]] and [[importPackage]], as well as
 * [[Packages]], for details.
 */
declare interface JavaClass<T extends string> extends JavaObject<T> {
}

/**
 * The notation `JavaPackage<"name">` refers to a
 * package from the Java API with the specified name.
 * This is used in the documentation to indicate which package
 * a short package name represents. For example, the shorthand
 * `arkham` represents the package `ca.cgjennings.apps.arkham`.
 * In the documentation, the type of this value is listed as
 * `JavaPackage<"ca.cgjennings.apps.arkham">`.
 * 
 * As discussed under [[JavaClass]], you do not use
 * `JavaPackage<"...">` in your code. This notation simply
 * adds extra information that makes the documentation more useful.
 * To refer to a package (or class), you can use its "long name"
 * using [[Packages]]:
 * 
 * `importPackage(Packages.ca.cgjennings.apps.arkham.project)`
 * 
 * Or, you can use one of the predefined shorthands like `ca`
 * or `arkham`:
 * 
 * `importPackage(arkham.project)`
 * 
 * For more information, refer to [[Packages]], [[importPackage]],
 * [[importClass]], and [[JavaClass]].
 */
declare interface JavaPackage<T extends string> {
    [packageOrClassName: string]: JavaPackage<string> | JavaClass<string>;
}

/**
 * This is a placeholder in the documentation for any instance
 * of a Java object. For information about a specific class,
 * refer to the
 * [class documentation](https://cgjennings.github.io/se3docs/assets/javadoc/).
 */
declare interface JavaObject<T extends string> {
    /** Returns a copy of this object, if it implements Cloneable.*/
    clone(): JavaObject<T>;
    /** Returns a string representation of the object. */
    toString(): string;
    /**
     * Returns true if another object "equals" this one.
     * @param Object the object to compare this object to
     */
    equals(Object: object): boolean;
    /** Returns the class of the object. */
    getClass(): JavaClass<T>;
    /** Returns a hash code value for the object. */
    hashCode(): number;
    /** Wakes up a thread that is waiting on this object's monitor. */
    notify(): void;
    /** Wakes up all threads that are waiting on this object's monitor. */
    notifyAll(): void;
    /**
     * Pauses the current thread until another thread calls this object's 
     * [[notify]] or [[notifyAll]] method.
     */
    wait(): void;
    /**
     * Pauses the current thread until another thread calls this object's
     * [[notify]] or [[notifyAll]] method or the specified timeout elapses.
     * 
     * @param msTimeout time to pause, in milliseconds
     */
    wait(msTimeout: number): void;
    /**
     * Pauses the current thread until another thread calls this object's
     * [[notify]] or [[notifyAll]] method or the specified timeout elapses.
     * 
     * @param msTimeout time to pause, in milliseconds
     * @param msTimeout additional time to pause, in nanoseconds
     */
    wait(msTimeout: number , nsTimeout: number): void;
}

/**
 * The `Packages` constant provides access to the entire
 * Strange Eons [Java API](https://cgjennings.github.io/se3docs/dm-java-api.html). It reflects the root of the Java class path
 * as a [[JavaPackage]] object. 
 * 
 * For example:
 * 
 * `Packages.java.lang.String`
 * 
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