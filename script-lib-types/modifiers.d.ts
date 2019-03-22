/**
 * # modifiers library
 * 
 * Support functions and constants that assist in interpreting the result of
 * `PluginContext.getModifiers()`. Useful mainly for `ACTIVATED` plug-ins.
 * Can also be used when interpreting various input events in event listeners.
 * 
 * Include this library by adding `useLibrary("modifiers")` to your script.
 */
declare module modifiers {
    /** Constant representing the Shift key. */
    const SHIFT: number;
    /** Constant representing the Control key; alias for `CTRL`. */
    const CONTROL: number;
    /** Constant representing the Control key; alias for `CONTROL`. */
    const CTRL: number;
    /** Constant representing the Alt (somtimes called Option) key. */
    const ALT: number;
    /** Constant representing the Meta key; alias for `COMMAND`. */
    const META: number;
    /** Constant representing the Command key; alias for `META`. */
    const COMMAND: number;
    /**
     * Constant representing whichever key is typicaly used for menu accelerators and
     * commands such as Copy and Paste. For example, this is equivalent to `CONTROL`
     * on Windows and Linux, and `COMMAND` on macOS.
     */
    const MENU: number;

    /**
     * Returns whether the modifier state indicates that *all* of the specified
     * modifier keys (and no other modifier keys) are held down.
     * 
     * @param modifierState the modifier key state to test; if missing the state from the PluginContext is used
     * @param modifiers the bitwise logical or of constants for the modifier keys to test
     * @returns true if all of the specified keys are held down, according to the modifier state
     */
    function allPressed(modifierState: number, modifiers: number);

    /**
     * Returns whether `PluginContext.getModifiers()` indicates that *all* of the specified
     * modifier keys (and no other modifier keys) are held down. For example,
     * `allPressed(CONTROL|SHIFT)` returns true only if Control and Shift are both held down.
     * 
     * @param modifiers the bitwise logical or of constants for the modifier keys to test
     * @returns true if any of the specified keys are held down, according to the plug-in context
     */
    function anyPressed(modifiers: number);

    /**
     * Returns whether the modifier state indicates that *any* of the specified
     * modifier keys are held down.
     * 
     * @param modifierState the modifier key state to test; if missing the state from the PluginContext is used
     * @param modifiers the bitwise logical or of constants for the modifier keys to test
     * @returns true if any of the specified keys are held down, according to the modifier state
     */
    function anyPressed(modifierState: number, modifiers: number);

    /**
     * Returns whether `PluginContext.getModifiers()` indicates that *any* of the specified
     * modifier keys are held down. For example,
     * `anyPressed(CONTROL|SHIFT)` returns true only if either Control or Shift
     * are held down.
     * 
     * @param modifiers the bitwise logical or of constants for the modifier keys to test
     * @returns true if any of the specified keys are held down, according to the plug-in context
     */
    function anyPressed(modifiers: number);
}