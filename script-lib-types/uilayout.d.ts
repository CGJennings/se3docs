/**
 * # uilayout
 * 
 * Classes that assist with laying out a user interface.
 * Layouts created using these classes can be displayed as dialogs,
 * added as tabs to a game component editor, or realized into generic containers.
 * Containers can be nested to create complex layouts.
 * 
 * Include this library by adding `useLibrary("uilayout")` (or [[ui]]) to your script.
 * See the plug-in authoring kit for examples that use this library.
 */
declare module uilayout {
    /**
     * AbstractContainer is the base class for other layout containers in this library.
     * Layout containers manage a list of objects and can *realize* these objects
     * into a grouping of user interface controls.
     *
     * When a container is realized, the control objects that have been added to
     * it will be converted into user interface widgets and laid out in a panel
     * or other user interface control.
     * A given container can only be realized once; attempting to realize the
     * container again will throw an error.
     *
     * Any kind of object may be added to an AbstractContainer. They will be
     * converted into interface controls as follows:
     * 
     * - Interface controls, such as those creates with the [[uicontrols]] library,
     *   are added unchanged.
     * - Layout containers are converted into a control or group of controls
     *   by calling the container's `realize()` method. (In fact, this works
     *   with any objevct that defines such a method.)
     * - Icons and images are converted into icon labels.
     * - Other kinds of objects are first converted into strings, then added as labels.
     *
     * Some kinds of containers can have controls added with "hints" that affect
     * how the control is laid out. Controls are added with hints using the
     * `place` method. Adding controls using the `add` method will
     * add them with a default hint (null).
     */
    class AbstractContainer {
        /**
         * Called by subclasses to initialize the base class. If an array of controls
         * is passed in, they will be `add`ed to the container.
         * 
         * @param controls an optional array of controls to add as if by calling [[add]] on each in turn
         */
        constructor(controls?: any[]);

        /**
         * This read-only property is `true` if this container was previously
         * realized, which means that realizing it again will throw an exception.
         */
        realized: boolean;

        /**
         * This property defines a title for the container. If a title is set,
         * the realized UI panel will be placed in a border titled using this text.
         * Some types of container may ignore this setting.
         */
        title: string;

        /**
         * This property affects how a container will be added to a
         * component editor when calling `addToEditor`. If true
         * (the default), then the container will be nested inside of a
         * panel. The panel will be laid out with BorderLayout and the
         * container will be placed in the `NORTH` position. This produces
         * a more consistent layout by preventing the container from expanding to
         * cover the entire extent of the tab.
         */
        editorTabWrapping: boolean;

        /**
         * This property affects how a container will be added to a
         * component editor when calling `addToEditor`. If true,
         * then the container will be wrapped in a scroll pane that enables vertical
         * scrolling. If the editor is not tall enough to display all of the
         * controls in a tab, a scroll bar will automatically appear to allow the
         * user to scroll to unreachable controls. If false (the default),
         * then the controls will be clipped to the bottom of their tab.
         */
        editorTabScrolling: boolean;

        /**
         * Convert this container into a user interface component that groups together
         * the controls that have been added to it. Typically the returned object
         * is a `swing.JPanel`, but this is not required.
         *
         * This abstract method is not defined in `AbstractContainer` and will
         * throw an exception if called. Sublasses must override this method.
         * This method can only be called once. See [[realized]].
         * 
         * @returns the realized container
         */
        realize(): JavaObject<"java.awt.Component">;

        /**
         * Adds zero or more control objects to this container. The added objects
         * will all be given a default hint value that allows this container
         * to lay the control out as it sees fit.
         * 
         * @param controls controls to be added to the container
         * @returns this container
         */
        add(...controls): AbstractContainer;

        /**
         * Adds zero or more control objects to this container, using hints to
         * control the layout. Not all containers use hints, so these may be ignored.
         * The arguments are declared in pairs: a control followed by its hint:
         * `place(control1, "hint1", control2, "hint2", ...)`.
         * 
         * @param controlsAndHints pairs of controls and hints
         * @returns this container
         */
        place(...controlsAndHints): AbstractContainer;

        /**
         * Returns the control added at position `index` in the list of controls
         * maintained by this container.
         * 
         * @param index the index of the control, counting from 0 in the order they were added
         * @returns the requested control
         * @throws if the index is invalid
         */
        getControl(index: number): any;

        /**
         * Returns the hint added at position `index` in the list of hint
         * maintained by this container.
         * 
         * @param index the index of the hint, counting from 0 in the order controls were added
         * @returns the requested hint
         * @throws if the index is invalid
         */
        getHint(index: number): any;

        /**
         * Returns the number of controls in this container.
         */
        getControlCount(): number;

        /**
         * Realizes this container as a user interface control and adds it
         * to a component editor as a new tab.
         * 
         * @param editor the editor to add this layout to
         * @param title an optional title for the tab that will be added
         * @param heartbeatListener an optional function that is called every update heartbeat
         * @param fieldPopulationListener an optional function that is called when the controls should be populated with data from the component
         * @param tabIndex an optional index at which to insert the new layout in the list of tabs
         * @returns the UI container that holds the converted controls
         */
        addToEditor(editor, title?: string, heartbeatListener?: CallableFunction, fieldPopulationListener?: CallableFunction, tabIndex?: number): JavaObject<"java.awt.Component">;

        /**
         * Returns the tab pane that houses the primary editing controls for an editor.
         * 
         * @param editor the editor to search for a tab pane
         * @returns the tab pane that houses editing controls, or null if none was found
         */
        static findEditorTabPane(editor): JavaObject<"swing.JTabbedPane"> | null;

        /**
         * Realizes this container and places the resulting component in a dialog box.
         * The returned dialog box can be displayed by calling its `showDialog()`
         * method.
         * 
         * @param title an optional title for the dialog window
         * @param okText optional text to use for the OK button; use null for default text, `""` to hide button
         * @param cancelText optional text to use for the Cancel button; use null for default text, `""` to hide button
         * @param icon an optional icon that will be placed next to the content (null for no icon)
         * @param modal if true, the script stops running until the dialog is closed
         * @returns the new dialog box
         */
        createDialog(title?: string, okText?: string, cancelText?: string, icon?: JavaObject<"swing.Icon">, modal?: boolean): DialogBox;

        /**
         * Tests the layout of the container by realizing it and
         * displaying the result in a simple dialog.
         */
        test(): void;

        /**
         * Converts an array of controls to a Java `Object[]`. Some container subclasses
         * use this internally as a stage in realizing a container.
         * 
         * @param source the controls to convert, by default the controls in this container are used
         * @returns a Java array of converted controls
         */
        _controlsToArray(source: any[]): JavaObject<"java.lang.Object[]">;

        /**
         * Converts an object into a corresponding UI component.
         * If the control is already a UI component, it is returned
         * unchanged. If it is an icon, it is wrapped in a label.
         * If it is an image, the image is converted into an icon
         * and treated as above. Other objects are converted into
         * strings and then returned as labels. Subclasses may override this
         * to perform other kinds of conversions.
         */
        _controlToComponent(control): JavaObject<"java.awt.Component">;

        /**
         * Wraps the `panel` in a titled border (or not, dependinging on the [[title]] property of the container).
         * Concrete subclasses may call this to implement the standard `realize()` behaviour.
         * @param panel the panel to wrap
         * @returns the panel
         */
        _applyTitle(panel: JavaObject<"java.awt.Component">): JavaObject<"java.awt.Component">;
    }

    /** Interface implemented by dialog boxes returned from [[createDialog]]. */
    interface DialogBox extends JavaObject<"swing.JDialog"> {
        /**
         * Returns the button pressed by the user to close the dialog:
         * 
         * -1 if the dialog is still open (possible if modeless) or the user closed the dialog window  
         * 0 if the user chose the Cancel button  
         * 1 if the user chose the OK/accept button  
         */
        getCloseButton(): -1 | 0 | 1;

        /**
         * Returns the dialog's OK button, or null if it has none.
         */
        getOKButton(): JavaObject<"swing.JButton"> | null;

        /**
         * Returns the dialog's Cancel button, or null if it has none.
         */
        getCancelButton(): JavaObject<"swing.JButton"> | null;

        /**
         * Displays the dialog. If the dialog is modeless, the method returns
         * immediately. If it is modal, the script stops until the user closes
         * the dialog, and the returned value indicates the button used to close
         * it (see [[getCloseButton]]).
         */
        showDialog(): number;

        /**
         * Returns the component that was realized by the container when the dialog
         * was created.
         */
        getContent(): JavaObject<"java.awt.Component">;
    }

    /**
     * Rows organize their controls into a horizontal row. Controls in the container
     * will accept a non-negative numeric hint that adjusts the size of the gap
     * between the hinted control and the previous control. The exact size of the gap
     * is measured in "gap units" whose exact size is not specified.
     * The default is 0 gap units for the first control and 1 gap unit for subsequent
     * controls.
     */
    class Row extends AbstractContainer {
        /**
         * Creates a new Row container.
         * @param controls Zero or more controls to be added to the row.
         */
        constructor(...controls);

        /**
         * Sets the alignment of the row within the parent container:
         * left-justified if -1, centered if 0, right-justified if 1.
         * The default for new Rows is left-justified.
         *
         * @param alignment the alignment value to set
         */
        setAlignment(alignment: -1 | 0 | 1): void;

        /**
         * Returns the alignment setting of the Row.
         */
        getAlignment(): -1 | 0 | 1;
    }

    /**
     * Stacks organize their controls into a vertical list.
     * This container does not use hints.
     */
    class Stack extends AbstractContainer {
        /**
         * Creates a new Stack container.
         * @param controls Zero or more controls to be added to the stack.
         */
        constructor(...controls);
    }

    /**
     * FixedGrid( columns, [controls...] ) : AbstractContainer
     * Creates a new <tt>FixedGrid</tt> object, which organizes controls into a simple
     * grid. All cells in a grid column have the same width, and all cells in a grid
     * row have the same height. This container recognizes a single hint, the string
     * <tt>"wrap"</tt>. A component with this hint will end the current row of controls
     * and start a new row with the next control added.
     *
     * columns : the number of column grids
     * control : a list of zero or more controls to be added to the new <tt>Stack</tt>
     */
    /**
     * Fixed grids organize their controls into a simple grid.
     * All cells in a grid column have the same width, and all cells in a grid
     * row have the same height. This container recognizes a single hint, the string
     * `"wrap"`. A component with this hint will end the current row of controls
     * and start a new row with the next control added.
     */
    class FixedGrid extends AbstractContainer {
        /**
         * Creates a new FixedGrid container.
         * @param numColumns the number of columns to include in each row (default is 2)
         * @param controls Zero or more controls to be added to the grid.
         */
        constructor(numColumns?: number, ...controls);

        /**
         * Returns the number of columns included in each row.
         */
        getColumnCount(): number;
    }

    /**
     * TypeGrids organize controls similarly to a typewritten page.
     * A TypeGrid is easier to use, but less flexible, than a [[Grid]] container.
     * The layout is controlled using string hints that describe the
     * desired layout options:
     * 
     * `br`  
     * Inserts a line break *before* this control.
     * 
     * `p`  
     * Inserts a paragraph break *before* this control.
     * 
     * `tab`  
     * Aligns this control to a tab stop.
     * 
     * `hfill`  
     * Causes this control to fill the available horizontal space.
     * 
     * `vfill`  
     * Causes this control to fill the available vertical space (may be used once per container).
     * 
     * `left`  
     * Aligns subsequent controls to the left edge of the container (this is the default).
     * 
     * `right`  
     * Aligns subsequent controls to the right edge of the container.
     * 
     * `center`  
     * Centers subsequent controls horizontally.
     * 
     * `vtop`  
     * Aligns all controls to the top of the container (this is the default).
     * 
     * `vcenter`  
     * Aligns all controls to the vertical center of the container.
     *
     * **Example:**
     * 
     * ```js
     * var typeGrid = new TypeGrid();
     * typeGrid.place(
     *     "<html><b><u>Registration", "center",
     *     "Name", "p left",
     *     textField( "", 30 ), "tab hfill",
     *     "Age", "br",
     *     textField( "", 3 ), "tab",
     *     "Gender", "br",
     *     comboBox( ["Male","Female","Other"] ), "tab"
     * );
     * typeGrid.createDialog( "Demo", "Register", null, null ).showDialog();
     * ```
     */
    class TypeGrid extends AbstractContainer {
        /**
         * Creates a new TypeGrid container.
         * @param hgap the gap between controls in a row
         * @param vgap the gap between rows in the grid
         */
        constructor(hgap?: number, vgap?: number);
    }

    /**
     * Creates a new <tt>Grid</tt> object, which organizes controls using a highly
     * flexible grid. The layout is controlled using strings that describe the
     * desired layout options.
     * See [this summary](http://www.migcalendar.com/miglayout/cheatsheet.html)
     * of the hint string syntax for details.
     *
     * **Example:**
     * 
     * ```js
     * var grid = new Grid();
     * grid.place(
     *     "Name", "",
     *     textField(), "wrap, span, grow",
     *     "Ability", "",
     *     textField( "", 15 ), "grow",
     *     "Modifier", "",
     *     textField( "", 10 ), "grow"
     * );
     * grid.createDialog().showDialog();
     * ```
     */
    class Grid extends AbstractContainer {
        /**
         * Creates a new Grid, which organizes controls using a highly flexible grid.
         * Layout is controlled using string hints that describe the desired layout options.
         * 
         * @param layoutConstraints optional global constraints on the layout
         * @param columnConstraints optional constraints on the grid columns
         * @param rowConstraints optional constraints on the grid rows
         */
        constructor(layoutConstraints?: string, columnConstraints?: string, rowConstraints?: string);
    }


    /**
     * A new TabPane organizes controls into a set of tabs with mutually exclusive
     * visibility. Each control added will be shown on a separate tab. For this reason,
     * the added controls are usually other containers. The hint supplied for each added
     * control will be used as the label for the tab. If no hint is given, a series of
     * dummy names (`"Tab 1"`, `"Tab 2"`, etc.), will be used.
     */
    class TabPane extends AbstractContainer {
        /**
         * Creates a new TabPane container.
         * 
         * @param controls Zero or more controls to be added to the pane.
         */
        constructor(...controls);

        /** If true, the tab pane will feature tabs of smaller than standard size. */
        smallTabs: boolean;
    }

    /**
     * A Splitter container creates a panel that divides its space between two controls.
     * The controls are separated by a splitter bar that can be dragged to change the relative
     * space that they are allotted.
     */
    class Splitter extends AbstractContainer {
        /**
         * Creates a new spiltter container.
         * 
         * @param verticalSplit if true, then the space is divided into two columns; otherwise two rows
         * @param left the first component, which is assigned the left or top space
         * @param right the second component, which is assigned the right or bottom space
         */
        container(verticalSplit?: boolean, left?: any, right?: any);
    }
}