/**
 * # uicontrols library
 * 
 * Functions that create user interface controls that can be organized into
 * layouts with the [[uilayout]] library and bound to game components
 * with [[uibindings]].
 * 
 * Include this library by adding `useLibrary("uicontrols")` (or [[ui]]) to your script.
 * See the plug-in authoring kit for examples that use this library.
 */
declare module uicontrols {
    /**
     * Returns a new text field control.
     * 
     * @param text optional initial text for the field (default is an empty string)
     * @param columns an optional number of columns for the width of the field
     * @param listener an optional function that will be called when enter is pressed in ...
     *     the field (default is no listener)
     * @param spellingChecked if true the contents will be checked for spelling if supported (default is true)
     */
    function textField(text?: string, columns?: number, listener?: CallableFunction, spellingChecked?: boolean): JavaObject<"swing.JTextField">;

    /**
     * Returns a new multiline text area.
     * 
     * @param text optional initial text for the text area (default is an empty string)
     * @param rows an optional number of rows for the width of the text area
     * @param columns an optional number of columns for the width of the field
     * @param wrapInScrollPane if true, the text area will be wrapped in a scroll pane
     * @param spellingChecked if true the contents will be checked for spelling if supported (default is true)
     */
    function textArea(text?: string, rows?: number, columns?: number, wrapInScrollPane?: boolean, spellingChecked?: boolean): JavaObject<"swing.JTextArea"> | JavaObject<"swing.JScrollPane">;

    interface CodeEditor {
        /** Sets the editor text. */
        setText(text: string): void;
        /** Returns the editor text. */
        getText(): string;
        /** Runs the code in the editor and returns the result.  */
        execute(): any;
    }

    /**
     * Returns a new script editor control.
     * 
     * @param text optional initial text for the code area
     * @param preferredWidth an optional preferred pixel width for the control (default is 400)
     * @param preferredHeight an optional preferred pixel height for the control (default is 300)
     */
    function codeArea(text?: string, preferredWidth?: number, preferredHeight?: number): CodeEditor;

    /**
     * Returns a new button.
     * 
     * @param label an optional text label for the button
     * @param icon an optional icon for the button
     * @param listener an optional function that will be called when the button is pressed
     * @returns the new button
     */
    function button(label?: string, icon?: JavaObject<"swing.Icon">, listener?: CallableFunction): JavaObject<"swing.JButton">;

    /**
     * Returns a new button that continues to notify listeners at intervals
     * as long as it is pressed down. The rate of listener notifications
     * increases the longer the button is held down.
     *
     * @param label an optional text label for the button
     * @param icon an optional icon for the button
     * @param listener an optional function that will be called when the button is pressed
     * @returns the new button
     */
    function repeaterButton(label?: string, icon?: JavaObject<"swing.Icon">, listener?: CallableFunction): JavaObject<"swing.JButton">;

    /**
     * Returns a new toggle button.
     * 
     * @param label an optional text label for the button
     * @param icon an optional icon for the button
     * @param selected if true, the button will initially be selected (default is false)
     * @param listener an optional function that will be called when the button is pressed
     * @returns the new button
     */
    function toggleButton(label?: string, icon?: JavaObject<"swing.Icon">, selected?: boolean, listener?: CallableFunction): JavaObject<"swing.JToggleButton">;

    /**
     * Returns a new radio button. Radio buttons are use to represent
     * a group of options of which only one can be selected at a time.
     * To define the members of such a group, first create the buttons and then
     * call `buttonGroup(arrayOfRadioButtonsToGroup)` to create the group.
     *
     * @param label an optional text label for the button
     * @param selected if true, the button will initially be selected (default is false)
     * @param listener an optional function that will be called when the button is pressed
     * @returns the new button
     */
    function radioButton(label?: string, selected?: boolean, listener?: CallableFunction): JavaObject<"swing.JRadioButton">;

    /**
     * Returns a new button group for a group of buttons. Button groups are used
     * to link together a set of related toggle buttons or radio buttons so that
     * only one button in the group can be selected at a time. The optional
     * `settingValues` argument is a list of setting values to associate with
     * the buttons in the group. If it is supplied, then the returned button group
     * can be bound using a [[Bindings]] instance, and selecting a button
     * in the group will change the bound setting to the corresponding element
     * in `settingValues`. If the `settingValues` argument is not
     * supplied, then a plain button group that does not support binding is returned.
     * 
     * @param buttons an array of buttons to be grouped together for mutually exclusive selection
     * @param settingValues an optional array of setting values (strings) to map the buttons to
     * @returns the button group
     */
    function buttonGroup(buttons: JavaObject<"swing.JToggleButton">[] | JavaObject<"swing.JRadioButton">[], settingValues?: string[]): JavaObject<"swing.ButtonGroup">;

    /**
     * Returns a new cycle button that will rotate through the specified labels
     * when pressed. Cycle buttons are suitable for use with a very small number
     * of options, preferably 2, when the user can easily guess what the
     * other options in the set are. An example of this is a button to select
     * a gender. If the optional setting values are provided, they will be used
     * to map the selected label to and from a setting value when the control
     * is bound using a [[Bindings]] instance.
     *
     * @param labels an array of labels for the button to rotate through when pressed
     * @param settingValues an optional array of setting values (strings) to map the labels to
     * @returns the cycle button
     */
    function cycleButton(labels: string[], settingValues?: string[]): JavaObject<"ca.cgjennings.ui.JCycleButton">;

    /**
     * Returns a new check box.
     *
     * @param label an optional text label for the button
     * @param selected if true, the box is initially checked
     * @param listener an optional function that will be called when the box is checked or unchecked
     * @returns the new check box
     */
    function checkBox(label?: string, selected?: boolean, listener?: CallableFunction): JavaObject<"swing.JCheckBox">;

    /**
     * Returns a new combo box containing the given list of items.
     * 
     * @param items an array of items for the user to choose from (default is an empty list)
     * @param listener an optional listener that is called when the selected item changes
     * @returns the new combo box
     */
    function comboBox(items?: any[], listener?: CallableFunction): JavaObject<"swing.JComboBox">;

    /**
     * Create a text field with a drop-down autocompletion list.
     *
     * @param items an array of items that the field will use to offer autocompletion choices
     * @param sorted an optional flag indicating that the item list should be sorted,
     *     which allows faster autocompletion
     * @returns an editable combo box with autocompletion support
     */
    function autocompletionField(items: string[], sorted?: boolean): JavaObject<"swing.JComboBox">;

    /**
     * Returns a new list box containing the given list of items.
     * 
     * @param items an array of items for the user to choose from (default is an empty list)
     * @param listener an optional listener that is called when the selected item changes
     * @param scroll if true, a scroll pane will be wrapped around the list control and returned
     * @returns the list, or the scroll pane that wraps it
     */
    function listControl(items?: string[], listener?: CallableFunction, scroll?: boolean): JavaObject<"swing.JList"> | JavaObject<"swing.JScrollPane">;

    /**
     * Returns a new label.
     * 
     * @param text initial label text (default is an empty string)
     * @param labelFor the control that this label is a label for; determines which control to activate if the
     *     label has a mnemonic key set
     * @returns the new label
     */
    function label(text?: string, labelFor?: JavaObject<"java.awt.Component">): JavaObject<"swing.JLabel">;

    /**
     * Returns a new note label, a label with a smaller than usual
     * font size that can be used to add remarks, tips, or other
     * secondary information.
     *
     * @param text initial label text (default is an empty string)
     * @returns the new label
     */
    function noteLabel(text?: string): JavaObject<"swing.JLabel">;


    /**
     * Returns a new separator, a dividing line that can be used to
     * visually separate groups of controls.
     *
     * @param vertical if true, the separator has a vertical orientation (the default is horizontal)
     * @returns the new separator
     */
    function separator(vertical?: boolean): JavaObject<"swing.JSeparator">;

    /**
     * Returns a new hyperlink label, a label with underlined blue text that opens
     * a URL in the user's default browser when clicked.
     * 
     * @param text an optional text label (default is to use `url`)
     * @param url the URL to visit when the label is clicked
     * @returns the new hyperlink label
     */
    function hyperlink(text: string | null, url: string): JavaObject<"ca.cgjennings.ui.JLinkLabel">;

    /**
     * Returns a new help button. A help button displays as a small purple
     * help icon. When clicked on, it opens a help page in the user's default
     * browser. If the URL appears to be a Web page, that Web page is opened.
     * Otherwise, it opens the documentation page with the same file name.
     * 
     * @param url the URL or page file name to open when the button is clicked
     * @returns the new help button
     */
    function helpButton(url: string): JavaObject<"ca.cgjennings.ui.JHelpButton">;

    /**
     * Returns a new tip button. A tip button displays as a small information icon.
     * When the pointer is moved over the icon or the icon is clicked,
     * a small pop-up window displays the tip text.
     * 
     * @param text the text to display when the pointer is moved over the tip icon
     * @returns the new tip control
     */
    function tipButton(text: string): JavaObject<"ca.cgjennings.ui.JTip">;

    /**
     * Creates a new spinner control that can be set to one of
     * a range of integer values between `min` and `max`, inclusive.
     * Each click of a spinner arrow will add or subtract `stepSize`
     * from the current value.
     *
     * @param min the minimum value that the spinner will allow (default is 1)
     * @param max the maximum value that the spinner will allow (default is 10)
     * @param stepSize the amount added to the current value by clicking an arrow button (default is 1)
     * @param initialValue the initial value stored in the spinner (default is `min`)
     * @param listener an optional change listener that will be called when the value changes
     * @returns the new spinner control
     */
    function spinner(min?: number, max?: number, stepSize?: number, initialValue?: number, listener?: JavaObject<"swing.event.ChangeListener">): JavaObject<"swing.JSpinner">;

    /**
     * Creates a new slider control that can be set to one of
     * a range of integer values between `min` and `max`, inclusive.
     * If `valueLabelPairs` is supplied, it must be an array where the
     * even indices are slider positions and the odd indices are labels.
     * The control will display the requested labels at the indicated positions.
     * For example: `[1, "Low", 6, "Medium", 10, "High"]` would display the
     * labels *Low*, *Medium*, and *High* at positions 1, 6, and 10 on the slider,
     * respectively.
     * 
     * @param min the minimum value that the slider will allow (default is 1)
     * @param max the maximum value that the slider will allow (default is 10)
     * @param initial the initial value of the slider (default is `min`)
     * @param valueLabelPairs an array of alternating numbers and strings;
     *     each number is a value to be labelled, while the corresponding string is the label text to display
     * @param listener an optional change listener that will be called when the value changes
     * @returns the new slider
     */
    function slider(min?: number, max?: number, initial?: number, valueLabelPairs?: [], listener?: JavaObject<"swing.event.ChangeListener">): JavaObject<"swing.JSlider">;

    /**
     * Creates a new control panel for adjusting tints.
     * @returns the new tint adjustment panel
     */
    function tintPanel(): JavaObject<"arkham.HSBPanel">;

    /**
     * Creates a new portrait panel that allows the user to choose and adjust a portrait
     * image. For DIY components, note that if you use the standard simple method
     * of adding a portrait, the portrait panel will be created and linked up for you.
     * If you use the custom portrait handling option, you'll need to create and
     * add portrait panels yourself.

     * @param gc the PortraitProvider (usually a game component, such as a DIY) 
     *     that provides the portrait model
     * @param portraitIndex the index of the portrait controlled by this panel
     *     (for components with multiple portraits; default is 0)
     * @param title an optional title for the panel; if not specified, a localized default
     *     title will be provided
     * @returns the portrait editing panel
     */
    function portraitPanel(gc: JavaObject<"arkham.component.PortraitProvider">, portraitIndex?: number, title?: string): JavaObject<"arkham.PortraitPanel">;

    /**
     * Calling this function on a UI control will prevent that control from
     * becoming a target for the **Markup** menu or displaying a context bar.
     * The function returns the same control that is passed to it,
     * so it can be wrapped transparently around the function used to create
     * the control: `let field = noMarkup(textField("42", 4));`.
     *
     * control : the UI control to prevent from accepting markup
     */
    function noMarkup(c: JavaObject<"swing.JComponent">): JavaObject<"swing.JComponent">;
}