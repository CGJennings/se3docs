/**
 * # common library
 * 
 * The common library defines basic functionality that may be
 * useful to any script. There is no need to explicitly *use*
 * it; it is automatically included in every script.
 */
declare module common {
    /**
     * The global scope. This can be used to access a global variable that has been *aliased* by a local variable.
     * 
     * ```js
     * let variable = 42;
     * function anotherScope() {
     *   let variable = "aliased";
     *   println(variable); // prints aliased
     *   println(self.variable); // prints 42
     * }
     * anotherScope();
     * ```
     */
    const self: object;

    /** The global scope. This is an alternate name for [[self]]. */
    const global: object;

    /** A reference to the `java` root package. */
    type java = JavaPackage<"java">;
    /** A reference to the `javax` root package. */
    type javax = JavaPackage<"javax">;
    /** A reference to the `org` root package. */
    type org = JavaPackage<"org">;
    /** A reference to the `ca` root package. */
    type ca = JavaPackage<"ca">;
    /** A reference to the `gamedata` root package. */
    type gamedata = JavaPackage<"gamedata">;
    /** A reference to the `resources` root package. */
    type resources = JavaPackage<"resources">;
    /** A shortcut for the `ca.cgjennings.apps.arkham` package. */
    type arkham = JavaPackage<"arkham">;
    /** A shortcut for the `javax.swing` package. */
    type swing = JavaPackage<"swing">;

    /** The [Settings](https://cgjennings.github.io/se3docs/assets/javadoc/resources/Settings.html) Java class. */
    type Settings = JavaObject<"resources.Settings">;

    /** The [Settings.Colour](https://cgjennings.github.io/se3docs/assets/javadoc/resources/Settings.Colour.html) Java class. */
    type Color = JavaObject<"resources.Settings.Colour">;

    /** The [Settings.Color](https://cgjennings.github.io/se3docs/assets/javadoc/resources/Settings.Colour.html) Java class. */
    type Colour = JavaObject<"resources.Settings.Colour">;

    /** The standard `java.awt.Font` class. */
    type Font = JavaObject<"java.awt.Font">;

    /** The [Settings.Region](https://cgjennings.github.io/se3docs/assets/javadoc/resources/Settings.Region.html) Java class. */
    type Region = JavaObject<"resources.Settings.Region">;

    /** The [Settings.Region2D](https://cgjennings.github.io/se3docs/assets/javadoc/resources/Settings.Region2D.html) Java class. */
    type Region2D = JavaObject<"resources.Settings.Region2D">;

    /** The standard `java.net.URL` class, representing a Uniform Resource Locator such as `https://strangeeons.cgjennings.ca`. */
    type URL = JavaObject<"java.net.URL">;

    /** The [ResorceKit](https://cgjennings.github.io/se3docs/assets/javadoc/resources/ResourceKit.html) Java class. */
    type ResourceKit = JavaObject<"resources.ResourceKit">;

    /** The [Language](https://cgjennings.github.io/se3docs/assets/javadoc/resources/Language.html) Java class. */
    type Language = JavaObject<"resources.Language">;

    /** A reference to the main application object, an instance of the [StrangeEons](https://cgjennings.github.io/se3docs/assets/javadoc/ca/cgjennings/apps/arkham/StrangeEons.html) class. */
    const Eons: JavaObject<"arkham.StrangeEons">;

    /** A reference to the active editor tab, or null if none. All editors are a subclass of the [StrangeEonsEditor](https://cgjennings.github.io/se3docs/assets/javadoc/ca/cgjennings/apps/arkham/StrangeEonsEditor.html) class.*/
    const Editor: JavaObject<"arkham.StrangeEonsEditor">;

    /**
     * A reference to the game component edited by the active editor tab,
     * or null if none. If not null, then the [[Editor]] is an instance of
     * [AbstractGameComponentEditor<G>](https://cgjennings.github.io/se3docs/assets/javadoc/ca/cgjennings/apps/arkham/AbstractGameComponentEditor.html),
     * and the game component is an instance of [GameComponent](https://cgjennings.github.io/se3docs/assets/javadoc/ca/cgjennings/apps/arkham/component/GameComponent.html).
     * (If it is a DIY component, it will be an instance of the [DIY](https://cgjennings.github.io/se3docs/assets/javadoc/ca/cgjennings/apps/arkham/diy/DIY.html) subclass.)
     */
    const Component: JavaObject<"arkham.component.GameComponent">;

    /**
     * If this is a plug-in script that is being called into by the 
     * application, this is a reference to the
     * [PluginContext](https://cgjennings.github.io/se3docs/assets/javadoc/ca/cgjennings/apps/arkham/plugins/PluginContext.html)
     * that describes the context in which the call is being made.
     */
    const PluginContext: JavaObject<"arkham.plugins.PluginContext">;

    /** The path or URL that identifies the location of the source file of the running script. If the script is being run directly from a code editor, this will be the string `"Quickscript"`. */
    const sourcefile: string | "Quickscript";

    /**
     * Imports the specified library into the current script. The result is 
     * the same as if the code in the library was pasted at that point in your
     * script. The library can either be the name of one of the standard 
     * scripting libraries or else a `res://` URL pointing to a script 
     * resource.
     * 
     * If the same library is imported with `useLibrary` multiple times in the 
     * same script, only the first call has any effect.
     * 
     * **Examples:**
     * ```
     * // import standard library "markup"
     * useLibrary("markup");
     * // import user library from a plug-in, located at
     * // resources/myname/myplugin/mylib.js
     * useLibrary("res://myname/myplugin/mylib.js");
     * ```
     * 
     * @param libraryName name of standard library, or resource path
     */
    function useLibrary(libraryName: string): void;

    /**
     * Stops executing the script. If the script attached event listeners to objects or started other threads, they will continue to operate.
     */
    function exit(): void;

    /**
     * This object contains helper functions related to throwing and catching errors (exceptions).
     */
    class Error {
        /**
         * Throws an error. If the argument is already an Error, it is thrown.
         * If it is a Java exception (Throwable), a JS Error that wraps the exception
         * is thrown. For any other object, an Error is thrown using the string value
         * of the object as its error message.
         * 
         * @param messageOrErrorOrThrowable an object to be converted into an Error and thrown
         */
        static error(messageOrErrorOrThrowable?: any): void;

        /**
         * If script warnings are enabled in the user preferences, 
         * prints a warning with the specified message text. If `stackFrame` is
         * specified, it indicates the relative call site from which the warning
         * will appear to have come. For example, if -1 (the default), the warning
         * would appear to come from whatever function called `warn`.
         * 
         * If script warnings are not enabled, this has no effect.
         * 
         * @param message the text of the warning
         * @param stackFrame the relative position on the stack frame to report as the source of the warning 
         */
        static warn(message?: string, stackFrame?: number): void;

        /**
         * If script warnings are enabled in the user preferences, 
         * prints a warning that a feature has been deprecated
         * and may be removed in the future. The message often suggests what to
         * use instead of the deprecated feature.  If `stackFrame` is
         * specified, it indicates the relative call site from which the warning
         * will appear to have come. For example, if -2 (the default), the warning
         * would appear to come from whatever function called the function
         * that marked itself as deprecated (by calling this).
         * 
         * If script warnings are not enabled, this has no effect.
         * 
         * @param message details about the deprecation and possible workarounds
         * @param stackFrame the relative position on the stack frame to report as the source of the warning 
         */
        static deprecated(message?: string, stackFrame?: number): void;

        /**
         * Prints a standard error message to the console to describe an exception.
         * This function can be called to handle uncaught script errors in script code
         * that outlives the execution of the script that defined it, such as an
         * event listener or other Java interface implementation. For example:
         * ```
         * function irritableFunction() {
         *     if (--callsRemaining <= 0) {
         *         throw new Error("Arrrggh!");
         *     }
         *     println("Please stop!");
         * }
         * let button = new swing.JButton("Press Me!");
         * button.addActionListener(function(event) {
         *     try {
         *         irritableFunction();
         *     } catch(ex) {
         *         Error.handleUncaught(ex);
         *     }
         * });
         * Eons.window.addCustomComponent(button);
         * let callsRemaining = 3;
         * ```
         */
        static handleUncaught(error): void;
    }

    /**
     * Displays a prompt to the user and waits for them to enter a value, returning the value.
     * 
     * @param promptMessage a message to display
     * @param initialValue a default value for the prompt field
     * @returns the entered value, or null if the prompt was cancelled
     */
    function prompt(promptMessage?: string, initialValue?: string): string | null;

    const confirm: {
        /**
         * Prompts the user to confirm an action by choosing **OK** or **Cancel**.
         * Returns true if the user chooses **OK**, otherwise false. For example:
         * 
         * ```
         * confirm("Proceed?");
         * ```
         * 
         * @param promptMessage a message to display
         * @param title an optional title for the prompt window
         * @returns true if the user confirms the action
         */
        (promptMessage: string, title?: string): boolean;

        /**
         * An alternative name for `confirm`.
         * Prompts the user to confirm an action by choosing **OK** or **Cancel**
         * (localized if possible).
         * Returns true if the user chooses **OK**, otherwise false. For example:
         * 
         * ```
         * confirm.confirm("Proceed?");
         * ```
         * 
         * @param promptMessage a message to display
         * @param title an optional title for the prompt window
         * @returns true if the user confirms the action
         */
        confirm(promptMessage: string, title?: string): boolean;

        /**
         * Prompts the user to confirm an action by choosing **Yes** or **No**
         * (localized if possible).
         * Returns true if the user chooses **Yes**, otherwise false.
         * For example:
         * 
         * ```
         * confirm.yesno("Do you agree?");
         * ```
         * 
         * @param promptMessage a message to display
         * @param title an optional title for the prompt window
         * @returns true if the user confirms the action
         */
        yesno(promptMessage: string, title?: string): boolean;

        /**
         * Prompts the user to choose between one or more buttons.
         * The first button is highlighted as a default option.
         * Returns -1 if the user cancels the dialog.
         * Otherwise returns 0 if the user selected the first option,
         * 1 if the user selected the second option, and so on.
         * For example:
         * 
         * ```
         * confirm.choose("Favourite colour?", null, "Green", "Red", "Blue");
         * ```
         * 
         * @param promptMessage a message to display
         * @param title an optional title for the prompt window
         * @param option one or more button labels
         * @returns the number of the selected option, counting from 0, or -1 if cancelled
         */
        choose(promptMessage: string, title: string, ...option: string[]): number;
    }

    /**
     * Displays a message to the user. If clicked, the message will disappear
     * instantly. Otherwise, if it is a plain message and not a warning or error
     * message, it fades away over time. For example:
     * 
     * ```
     * alert("Caution:\nFloor is slippery when wet", false);
     * ```
     * 
     * @param message the message to display
     * @param isErrorMessage if true, the message is presented as an error; if false, as a warning; if not specified, as a plain message
     */
    function alert(message: string, isErrorMessage: boolean): void;

    /**
     * Pauses script execution for the specified period of time. Returns true if
     * you interrupt the sleep period from another thread; otherwise false.
     * Calling this from the main thread will cause the application
     * to be unresponsive while sleeping; use caution when choosing a sleep
     * duration.
     * 
     * @param msDelay the time to sleep, in milliseconds (default is 1000)
     * @returns true if the sleep was interrupted, otherwise false
     */
    function sleep(msDelay?: number): boolean;

    /**
     * Prints an object to the script console. You may pass multiple arguments
     * to this function; the arguments will be printed in sequence. For example:
     * 
     * ```
     * print("Hello");
     * ```
     * 
     * @param obj the object to be printed
     */
    function print(...obj: any[]): void;

    /**
     * Prints an object to the script console, then starts a new line.
     * You may pass multiple arguments to this function; the arguments
     * will be printed in sequence, then a new line will be started.
     * 
     * ```
     * for(let i=1; i<=10; ++i) println(i);
     * ```
     * 
     * @param obj the object to be printed
     */
    function println(...obj: any[]): void;

    /**
     * Prints a formatted message string. The effect is the same as
     * formatting the string with [[sprintf]] and then [[print]]ing
     * the result. Formatting will be localized using the interface language.
     * For example:
     * 
     * ```
     * printf("Your lucky number is %d\n", 1 + Math.random()*100);
     * ```
     * 
     * @param format the format string
     * @param args arguments referenced by the string's format specifiers
     */
    function printf(format, ...args: any[]): void;

    /**
     * Prints a formatted message string. The effect is the same as
     * formatting the string with [[sprintf]] and then [[print]]ing
     * the result. For example:
     * 
     * ```
     * let languages = [new Language("en"), new Language("fr")];
     * for(let lang of languages) {
     *     printf(lang, "In %s, the decimal of 1/2 is %.1f\n", lang.locale.displayName, 1/2);
     * }
     * ```
     * 
     * @param language the language or locale used to localize the formatting, or null for no localization
     * @param format the format string
     * @param args arguments referenced by the string's format specifiers
     */
    function printf(language: Language, format, ...args: any[]): void;

    /**
     * Returns a formatted string using the %-format string and arguments.
     * Formatting will be localized using the interface language.
     * 
     * Formatting behaviour is similar to Java's `String.format` method,
     * but `%i` is allowed as a synonym of `%d` and numeric arguments will
     * be coerced, if necessary, to fit the conversion type. For example,
     * passing a number as the argument for a `%d` conversion will coerce
     * the number to an integer type rather than cause an error.
     * the result.
     * 
     * @param format the format string
     * @param args arguments referenced by the string's format specifiers
     */
    function sprintf(format, ...args: any[]): void;

    /**
     * Returns a formatted string using the %-format string and arguments.
     * 
     * Formatting behaviour is similar to Java's `String.format` method,
     * but `%i` is allowed as a synonym of `%d` and numeric arguments will
     * be coerced, if necessary, to fit the conversion type. For example,
     * passing a number as the argument for a `%d` conversion will coerce
     * the number to an integer type rather than cause an error.
     * 
     * @param language the language or local used to localize the formatting, or null for no localization
     * @param format the format string
     * @param args arguments referenced by the string's format specifiers
     */
    function sprintf(language: Language, format, ...args: any[]): void;

    /**
     * The Console object is used to interact with the script output window.
     */
    class Console {
        /**
         * Prints an object to the script console.
         * This is identical to the global `print` function.
         * @param obj the object to print
         */
        static print(...obj: any[]): void;

        /**
         * Prints an object to the script console, then starts a new line.
         * This is identical to the global `println` function.
         * @param obj the object to print
         */
        static println(...obj: any[]): void;

        /**
         * Prints a formatted string to the script console.
         * This is identical to the global `printf` function.
         * @param formatString the format string
         * @param value0 list of 0 or more arguments used to replace %-arguments in the format string
         */
        static printf(formatString: string, ...value: any[]): void;

        /**
         * Prints an image or icon to the script console.
         * @param image the BufferedImage or Icon to be inserted into the console stream
         */
        static printImage(image: JavaObject<"java.awt.image.BufferedImage">|JavaObject<"swing.Icon">): void;

        /**
         * Prints a user interface component to the script console.
         * @param uiComponent an interface control to be inserted into the console stream
         */
        static printComponent(uiComponent: JavaObject<"swing.JComponent">): void;

        /**
         * Prints a string formatted with basic HTML markup to the console.
         * For example, the string `"something <i>special</i>"` is printed with the
         * word *special* displayed in an italic style.
         * 
         * @param html a string of simple HTML markup to be parsed, formatted, and inserted
         */
        static printHTML(html: string): void;

        /** Clears the script console. */
        static clear(): void;

        /** Returns the current text of the console as a string. */
        static history(): string;

        /**
         * Gets or sets whether the script console window is visible.
         * The window automatically becomes visible when printed to.
         */
        static visible: boolean;

        /**
         * Buffers output sent to the console until `flush()` is called.
         */
        static queue(): void;

        /**
         * Flushes pending writes to the script console. If output is being buffered
         * due to a previous call to `queue()`, buffering ends and any pending
         * output is sent to the console.
         */
        static flush(): void;

        /** A PrintWriter that can be used to write to the console's output stream. */
        static out: JavaObject<"java.io.PrintWriter">;

        /** A PrintWriter that can be used to write to the console's error stream. */
        static err: JavaObject<"java.io.PrintWriter">;
    }

    /**
     * Sets the Language used to look up interface strings using
     * `@key-name` identifiers. By default this is the global interface language.
     *
     * @param language the localized string database to use for `@` variables
     */
    function useInterfaceLanguage(language: Language): void;

    /**
     * Sets the Language used to look up game strings using
     * `#key-name` identifiers. By default this is the global game language.
     *
     * @param language the localized string database to use for `#` variables
     */
    function useGameLanguage(language: Language): void;

    /**
     * Sets the `Settings` source that will be used to get and set
     * settings using the `$setting-key` syntax.
     *
     * By default, a script that uses this syntax will read and write the
     * global (shared) settings, except for DIY scripts
     * which use the private settings of their DIY game component object.
     * This function allows you to choose a different `Settings`
     * object to use. The specified `source` can be any of the following:
     * - a `Settings` instance;
     * - a `GameComponent` (to use the component's private settings);
     * - or `null` (to use the global shared settings).
     *
     * @param source the settings source to use for `$` variables
     */
    function useSettings(source: Settings|JavaObject<"arkham.component.GameComponent">|null): void;

    /**
     * This object defines some helper functions that can be used
     * to modify or restore settings. This can be used to change
     * otherwise inaccessible user preferences, or to "hack"
     * new game components from existing components by changing
     * their private settings.
     */
    const Patch: {
        /**
         * Writes zero or more pairs of settings into user settings
         * and then writes the user settings to disk. The new values
         * will override the application defaults.
         * 
         * The arguments declare the keys to replace and the values
         * to replace them with as follows:
         * 
         * `Patch.apply("key1", "value1", "key2", "value2", ...)`
         * 
         * @param keyValuePairs an even number of arguments forming
         *   a sequence of key, value pairs; each value is written to
         *   the settings under the matching key
         */
        apply(...keyValuePairs: string[]): void;

        /**
         * Deletes zero or more user settings, then writes the user
         * settings to disk. This causes the specified settings to
         * revert to the application default.
         * 
         * @param keys the names of zero or more keys to be restored
         */
        restore(...keys: string[]): void;

        /**
         * Changes zero or more pairs of settings until the end of
         * the current session. The settings will return to their
         * previous value the next time the application runs.
         * 
         * The arguments declare the keys to replace and the values
         * to replace them with as follows:
         * 
         * `Patch.temporary("key1", "value1", "key2", "value2", ...)`
         * 
         * @param keyValuePairs an even number of arguments forming
         *   a sequence of key, value pairs; each value is written to
         *   the settings under the matching key
         */
        temporary(...keyValuePairs: string[]): void;

        /**
         * Changes zero or more pairs of the specified component's
         * private settings.
         * 
         * The arguments declare the keys to replace and the values
         * to replace them with as follows:
         * 
         * `Patch.apply(component, "key1", "value1", "key2", "value2", ...)`
         * 
         * Note that the built-in `Component` always refers to the
         * currently edited game component, if any. (Otherwise it is null.)
         * 
         * @param component the component to modify
         * @param keyValuePairs an even number of arguments forming
         *   a sequence of key, value pairs; each value is written to
         *   the settings under the matching key
         */
        card(component: JavaObject<"arkham.component.GameComponent">, ...keyValuePairs: string[]): void;

        /**
         * Modifies the private settings of a game component by merging
         * in all of the settings stored in a resource file.
         * 
         * @param component the component to modify
         * @param resourcePath the resource path of the settings to apply
         */
        cardFrom(component: JavaObject<"arkham.component.GameComponent">, resourcePath: string): void;

        /**
         * Removes one or more private settings from a component,
         * resetting them to whatever value they inherit from the component's
         * parent settings. This is not necessarily the same as resetting
         * them to the component's initial state, as some settings may
         * only have been defined on the component.
         * 
         * @param component the component to modify
         * @param resourcePath the resource path of the settings to apply
         */
        cardRestore(component: JavaObject<"arkham.component.GameComponent">, ...keys: string[]): void;
    }

    /**
     * If debugging is enabled in user preferences, prints an optionally
     * formatted string to the application log. The log can be viewed
     * from the console by right clicking, or by using the
     * [Log Viewer](https://cgjennings.github.io/se3docs/dm-quickscript.html#viewing-the-application-log).
     *
     * @param format the text to log
     * @param args optional arguments referenced by format specifiers in `format`
     * @see [[sprintf]]
     */
    function debug(format: string, ...args: string[]): void;

    /**
     * If debugging is enabled in user preferences, this will check
     * is the specified condition is true, and if not it will throw
     * an error including the specified message. If debugging
     * is not enabled, the condition is evaluated but the function
     * otherwise has no effect.
     *
     * @param condition the condition which must be true for the script to continue
     * @param message an error message to print when the assertion fails
     */
    function assert(condition: boolean, message: string): void;
}



// lets us put property-keyed entries under "common", like #().
interface common {
    /**
     * The `@` function looks up a user interface string. This can be
     * used analogously to an `@key-name` identifier to look up a
     * key name that is composed on the fly, as in
     * `@("key-" + n)`. If passed more than one argument, it will look
     * up the string for the first argument, then use the remaining
     * arguments to format it as if by using `sprintf`.
     * 
     * The Language that is searched for the specified key can
     * be changed by calling [[useInterfaceLanguage]].
     * 
     * @param key the key to look up in the interface language database
     * @param args optional arguments that will be used to format the string
     */
    ["@"](key: string, ...args: any[]): void;

    /**
     * The `#` function looks up a game language string. This can be
     * used analogously to a `#key-name` identifier to look up a
     * key name that is composed on the fly, as in
     * `#("key-" + n)`. If passed more than one argument, it will look
     * up the string for the first argument, then use the remaining
     * arguments to format it as if by using [[sprintf]].
     * 
     * The Language that is searched for the specified key can
     * be changed by calling [[useGameLanguage]].
     * 
     * @param key the key to look up in the game language database
     * @param args optional arguments that will be used to format the string
     */
    ["#"](key: string, ...args: any[]): void;

    /**
     * The `$` function looks up a setting key. This can be
     * used analogously to a `$key-name` identifier to look up a
     * key name that is composed on the fly, as in
     * `$("key-" + n)`.
     * 
     * The Settings that are searched for the specified key can
     * be changed by calling [[useSettings]].
     * 
     * @param key the key to look up in the game language database
     * @param args optional arguments that will be used to format the string
     */
    $(key: string, ...args: any[]): void;
}