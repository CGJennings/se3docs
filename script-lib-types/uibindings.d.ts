/**
 * # uibindings library
 * 
 * Script classes to create bindings between user interface (UI) controls and
 * the private settings on components.
 * Bindings automate the details of synchronizing the state of the user interface
 * controls with the state of an edited game component.
 * When the user manipulates a bound control, the new state is converted into a
 * setting string value and written to the component. When the component
 * is loaded into an editor that uses bound controls, the bound controls will
 * be set to match the setting value in the component.
 * 
 * Include this library by adding `useLibrary("uibindings")` (or [[ui]]) to your script.
 * See the plug-in authoring kit for examples that use this library.
 */
declare module uibindings {
    /**
     * A Java interface that can be used to customize the
     * mapping between a component state and setting values. When a bound control
     * implements this interface, `update` and `initComponent`
     * will call the `fromSetting` and `toSetting` methods provided
     * by the control instead of the default `controlToSetting` and
     * `settingToControl` methods provided by the binding class.
     * As an example of when this would be useful, consider the case where you
     * have a combo box of different options, and you want those options to be
     * localized into the game language. The default binding class will use the string
     * value of the selected option, so if a component is created in one language,
     * saved, and opened in another language, the value saved with the component
     * won't match any of the available options (since it is written in the original
     * language). Using `SettingBackedControl`, you could map each label to
     * a number or other neutral identifer instead. (If the list of
     * options is fixed, you could use `IndexedComboBoxBinding` for this
     * purpose.)
     */
    type SettingBackedControl = JavaObject<"arkham.diy.SettingBackedControl">;

    /**
     * A Binding is an association between a UI control
     * and part of a game component's state, usually one of the game
     * component's private settings. When the UI control is activated
     * by the user, calling `Binding.update()` will convert the state
     * of the control into a game component setting and use this to
     * update the game component so that it matches the state of the UI control.
     * When the game component is loaded from a file, calling `Binding.initComponent()`
     * will read the game component's state and update the state of the
     * UI control to match it.
     *
     * **The Binding Process**
     * 
     * When `update` method is called, it calls `controlToSetting` to convert the
     * state of the UI component into a setting value (a string).
     * It will then look in the private settings of the game component for
     * a setting with the provided key name. If the setting does not exist or
     * is different from the the setting returned from `controlToSetting`,
     * then it will copy the new value into the game component's private settings
     * and mark the sheets listed in the list of card faces as being out of date.
     * 
     * `update` returns true if it updated the component.
     *
     * When `initComponent` method is called, it will first fetch the named
     * setting from the game component's private settings and then call
     * `settingToControl` to modify the state of the control to reflect
     * the setting value.
     *

     *
     * <b>Writing Binding Classes</b><br>
     * The <tt>Binding</tt> base class will copy the text that a user writes
     * in a text component to a private setting (for <tt>update()</tt>) and
     * will set the text in the component to the value of the private setting
     * (for <tt>initComponent()</tt>. For other kinds of components, you need to create
     * an appropriate subclass that knows about the specific kind of control
     * it is binding the game component state to. To create a subclass you
     * only need to override the <tt>controlToSetting()</tt> and
     * <tt>settingToControl()</tt> methods to handle the new type of control.
     * For example, the following binding will bind a checkbox to a yes/no
     * setting value in the game component:
     * <pre>
     * function CheckboxBinding( name, uiControl, gameComponent, sheetsToUpdate ) {
     *     // call superclass constructor
     *     Binding.call( this, name, uiControl, gameComponent, sheetsToUpdate );
     * }
     *
     * CheckboxBinding.subclass( Binding );
     *
     * CheckboxBinding.prototype.toSetting = function controlToSetting( control ) {
     *     if( control.selected )
     *         return 'yes';
     *     else
     *         return 'no';
     * }
     *
     * CheckboxBinding.prototype.settingToControl = function settingToControl( control, value ) {
     *     control.selected = value != null && value.equals( 'yes' );
     * }
     * </pre>
     *
     * If you wish to create more advanced binding behaviours, such as calling methods
     * on the game component instead of changing private settings, override
     * `update` and `initComponent`. It is critical that `update`
     * method returns true *if and only if* the setting is updated with a different
     * value.
     */
    class Binding {
        /**
         * Creates a Binding instance. When you create a binding, you provide a key name, a UI control,
         * a game component, and an array of numbers. The array of numbers is a list of card faces
         * (0 for front, 1 for back, and so on) that need to be updated when the bound state changes. For
         * example, if the bound state represented content that is drawn only on the component's back face,
         * then you would use `[1]`.
         * 
         * @param keyName the setting key that the control is bound to; if it starts with `$`,
         *     the `$` will be removed and any underscores (`_`) replaced with dashes (`-`)
         * @param uiControl the UI component that will take part in the binding
         * @param gameComponent the game component that will take part in the binding
         * @param sheetsToUpdate an array of the indices of the game component's sheets
         *     which should be repainted when the bound setting changes
         */
        constructor(keyName: string, uiControl: JavaObject<"java.awt.Component">, gameComponent: JavaObject<"arkham.component.GameComponent">, sheetsToUpdate: number[]);

        /**
         * Updates the UI component setting using the current value of the
         * control.
         *
         * @returns true if the setting has changed
         */
        update(): boolean;

        /**
         * Updates the UI component using the current setting value.
         */
        initComponent(): void;

        /**
         * Converts the state of the control to a setting string.
         * Subclasses override this to customize how the control's state is
         * represented in the game component's private settings.
         *
         * @param uiControl the control whose state should be converted to a string
         * @returns the string representing the state of the control
         */
        controlToSetting(uiControl: JavaObject<"java.awt.Component">): string;

        /**
         * Changes the state of the `control` to reflect the provided
         * setting value.
         * Subclasses override this to customize how the control's state is
         * represented in the game component's private settings.
         * 
         * @param value the string value to be mapped to a control state
         * @param uiControl the control to update
         */
        settingToControl(value: string, uiControl: JavaObject<"java.awt.Component">): void;
    }

    /**
     * An ActiveBinding is a type of binding that can determine for itself
     * when it needs to update the game component because of a change to the
     * state of the UI control. For example, the binding might install
     * a listener on the control that will be notified when the control is updated.
     * The listener would then call `update` when it is notified of a
     * change in the control state.
     *
     * To create a new type of active binding, subclass `ActiveBinding` and
     * override the `installActivationHandler` method to make the binding
     * active.
     */
    class ActiveBinding extends Binding {
        /**
         * Called to installs the mechanism which makes the binding active
         * (such as an event listener) on `this.control`.
         * The base class attempts to install an `ActionListener` on the component,
         * which is sufficient for many types on control.
         */
        installActivationHandler(): void;
    }


    /**
     * Bindings( editor, [gameComponent] ) [ctor]
     * A collection of bindings for a group of custom controls in
     * <tt>editor</tt> that are bound to settings in <tt>gameComponent</tt>.
     * If <tt>gameComponent</tt> is not specified, the game component currently
     * installed in the editor will be used.
     *
     * editor : the editor that will contain the bound controls
     * gameComponent : the game component that that will be edited using the controls
     */
    class Bindings {
        /**
         * Creates a new Bindings instance that will manage bindings between the specified editor and game component.
         * @param editor the editor that will contain the bound controls
         * @param gameComponent the game component that that will be edited using the controls (default is the editor's current component)
         */
        constructor(editor: JavaObject<"arkham.AbstractGameComponentEditor">, gameComponent?: JavaObject<"arkham.component.GameComponent">);

        /**
         * Creates a new Binding using the supplied constructor function and adds it to
         * this set of bindings. The binding is created as if by calling
         * `new bindClassConstructor(keyName, uiControl, this.component, sheets)`.
         * 
         * If `uiControl` is a scroll pane, then the component contained by
         * the scroll pane will be bound rather than the scroll pane itself.
         *
         * If `bindClassConstructor` is not specified, then a default class will be
         * searched for using `Bindings.getBindingClass`. Most standard control types
         * have a suitable default binding class available.
         *
         * @param keyName the setting key that the control is bound to; if it starts with `$`,
         *     the `$` will be removed and any underscores (`_`) replaced with dashes (`-`)
         * @param uiControl the UI component that will take part in the binding
         * @param sheetsToUpdate an array of the indices of the game component's sheets
         *     which should be repainted when the bound setting changes; by default all sheets are updated
         * @param bindClassConstructor the constructor function for the Binding subclass that
         *  will be used to create the binding; by default a default binding class for the
         *  UI control type is looked up from the registry
         */
        add(keyName: string, uiControl: JavaObject<"java.awt.Component">, sheetsToUpdate?: number[], bindClassConstructor?: new (...args) => Binding): void;

        /**
         * Adds multiple bindings to this set of bindings. The argument to this method is an array in which
         * each element is an array of arguments as they would be passed to `Bindings.add()`. For example:
         * 
         * ```js
         * bindings.bindAll(
         *     ["determination", detmCtrl, [0]],
         *     ["special-effect", effectField, [1]],
         *     ["hint", hintField, [0,1]]
         * );
         * ```
         *
         * @param bindingArray arrays of binding arguments
         */
        addAll(...bindingArray: [string, JavaObject<"java.awt.Component">] | [string, JavaObject<"java.awt.Component">, number[]] | [string, JavaObject<"java.awt.Component">, number[], new (...args) => Binding]): void;

        /**
         * Returns a function that will update all of the bindings in this set
         * and return whether any of the bound settings were changed.
         * 
         * @returns an update function for the managed bindings
         */
        createUpdateFunction(): () => boolean;

        /**
         * Returns a function that will call `initComponent()` for all of the
         * bindings in this set.
         *
         * @returns a control populator function for these bindings
         */
        createPopulateFunction(): () => void;

        /**
         * Binds the editor and game component together, loading the component's current
         * state into the bound controls and installing event listeners that will
         * update the game component when the UI controls are manipulated.
         * A Bindings instance can only be bound once.
         */
        bind(): void;

        /**
         * Returns the default binding class for a particular component type,
         * as determined by the specified class. If there is no default binding
         * for the component class, or one of its superclasses, returns null.
         * 
         * @param controlClass the UI control subclass to return a default binding class for
         * @returns the binding class constructor for the default binding, or null
         */
        static getBindingClass(controlClass: JavaObject<"java.awt.Component">): new (...args) => Binding | null;

        /**
         * Registers a binding class constructor to be the default Binding
         * class for a particular type of UI control.
         * 
         * @param controlClass the UI control class that will have a default Binding registered; this may be a Java class or a string that names one
         * @param bindingClassConstructor a constructor for a Binding class that can convert between setting strings and control state
         */
        static registerBindingClass(controlClass: string | JavaObject<"java.awt.Component">, bindingClassConstructor: new (...args) => Binding | null): void;
    }

    /**
     * Binds a `swing.JCheckBox` to a setting that can be fetched with
     * `gameComponent.settings.getYesNo(keyName)`.
     */
    class CheckBoxBinding extends ActiveBinding {
    }

    /**
     * Binds `swing.JList`s to the `toString()` value of the selected item,
     * or null if no item is selected.
     */
    class ListBinding extends ActiveBinding {
    }

    /**
     * Binds `swing.JComboBox`es to the `toString()` value of the selected item,
     * or null if no item is selected.
     */
    class ComboBoxBinding extends ActiveBinding {
    }

    /**
     * Binds `swing.JComboBox`es to the index of the selected item,
     * or null if no item is selected.
     * This type of binding must be explicitly requested by passing this as the
     * optional binding class to `Bindings.add`. Note that this cannot be
     * used with editable combo boxes (only drop down lists).
     */
    class IndexedComboBoxBinding extends ActiveBinding {
    }

    /**
     * Binds `swing.JSpinner`s that use integer models (including those made
     * with the `spinner()` function in the `uicontrols` library)
     * to an integer digit string that can be fetched with
     * `gameComponent.settings.getInt(keyName)`.
     */
    class SpinnerBinding extends ActiveBinding {
    }

    /**
     * Binds `swing.JSlider`s to an integer digit string that can be fetched with
     * `gameComponent.settings.getInt(keyName)`.
     */
    class SliderBinding extends ActiveBinding {
    }

    /**
     * Binds `arkham.HSBPanel`s to a comma-separated list of hue, saturation, and
     * brightness values. Hue is represented as a relative angle; saturation
     * and brightness and represented as numbers between 0 and 1 (inclusive).
     * Tints can be fetched as an array of three `float` values by calling
     * `Settings.tint(gameComponent.settings.get(keyName))`.
     * The returned array represents the tint in the same format as that used by
     * tint filters, which expresses the hue as an angle between 0 and 1.
     */
    class HSBPanelBinding extends ActiveBinding {
    }

    /**
     * Binds a radio button group to a set of user-defined values. The button group
     * must be a special subclass of `swing.ButtonGroup`, which can be
     * created using the `buttonGroup()` function in the `uicontrols` library.
     * When the button group is created, each button in the group is associated with
     * a specific setting value. This binding maps between those values and the
     * selection state of buttons in the group.
     */
    class ButtonGroupBinding extends ActiveBinding {
    }
}