/**
 * # project library
 * 
 * Support for extending the project system. This library provides support
 * for automatically tracking extensions registered with the project system
 * so that they can be unregistered automatically. It also imports the entire
 * `arkham.project` package into your script's namespace.
 * 
 * Include this library by adding `useLibrary("project")` to your script.
 * See the plug-in authoring kit for examples that use this library.
 */
declare module project {
    /** Class representing a file or folder on the computer. */
    type File = JavaObject<"java.io.File">;
    /** Class representing a member of a project (file in a project folder). */
    type Member = JavaObject<"arkham.project.Member">;
    /** Class representing a project-related task. */
    type Task = JavaObject<"arkham.project.Task">;
    /** Class representing a project. */
    type Project = JavaObject<"arkham.project.Project">;
    /** The registry of all actions that can be performed on project members. */
    type Actions = JavaObject<"arkham.project.Actions">;
    /** Class representing an action that can be performed in a project. */
    type TaskAction = JavaObject<"arkham.project.TaskAction">;
    /** The task used to open project files, which can be extended for new file types. */
    type Open = JavaObject<"arkham.project.Open">;
    /** Collection of utility functions that make implementing project extensions easier. */
    type ProjectUtilities = JavaObject<"arkham.project.ProjectUtilities">;
    /** Alias for `ProjectUtilities`. (This matches the naming convention of other script utility objects.) */
    type ProjectUtils = ProjectUtilities;

    /**
     * A tracked registry provides a wrapper to automatically
     * track registrations made by your script in some other
     * registry. By registering something through a tracked
     * registry, the wrapper will automatically keep track of
     * what is currently registered and allow all registered
     * entities to be unregistered automatically (for example,
     * when a plug-in is unloaded). Other classes in the library
     * build on this base class.
     */
    class TrackedRegistry<T> {
        /**
         * Creates a new tracked registry.
         * The only restriction on the registration function
         * is that it requires at least one argument, which is used to track the
         * registration. The unregistration function must be able to unregister
         * the entity using the entity parameter alone.
         * 
         * @param registerFn a function that can be called to register a new entity
         * @param unregisterFn a function that can be called to unregister an entity
         */
        constructor(registerFn: CallableFunction, unregisterFn: CallableFunction);

        /**
         * Registers some entity in the wrapped registry by calling the registration
         * function with the provided arguments. The resuly of registering the
         * same entity multiple times is undefined.
         * 
         * @param entity the argument that uniquely identifies the registered object; usually a handler function
         * @param moreArguments additional arguments passed to the registration function
         */
        register(entity: T, ...moreArguments: any[]): void;

        /**
         * Unregisters a previously registered entity by calling the unregister function with the provided entity.
         * @param entity the entity to be unregistered, as passed to [[register]]
         */
        unregister(entity: T): void;

        /**
         * Unregisters all tracked entities.
         */
        unregisterAll(): void;
    }

    /**
     * A tracked registry of task actions. When registering
     * a new action, you can pass the action's priority as a second argument.
     * The priority determines the action's position in the project
     * context menu. The default is `Actions.PRIORITY_DEFAULT`.
     */
    const ActionRegistry: TrackedRegistry<TaskAction>;

    /**
     * A tracked registry of child actions of the **New** action.
     * A new action is used to create a new file of given type.
     * These actions appear as subitems of the **New** menu
     * in a project. The register function takes a task action and (optionally)
     * an action, or the name of an action, that this action should be inserted after.
     */
    const NewActionRegistry: TrackedRegistry<JavaObject<"arkham.project.New.NewAction">>;

    /**
     * A tracked registry of internal openers. Internal openers are used by the
     * **Open** action to open files inside of the application. A new internal
     * opener can be used to add support for opening new kinds of files.
     */
    const OpenerRegistry: TrackedRegistry<"arkham.project.Open.InternalOpener">;

    /**
     * A tracked registry of project file metadata sources. A metatdata source
     * provides metadata for a particular file type. This includes the
     * icon used for the file type in the project view, and the information
     * listed on the **Properties** tab when files of that type are selected.
     */
    const MetadataRegistry: TrackedRegistry<"arkham.project.MetadataSource">;

    /**
     * A tracked registry of new task types. New task types are used to add
     * support for new kinds of task folders.
     */
    const NewTaskTypeRegistry: TrackedRegistry<"arkham.project.NewTaskType">;

    /**
     * Calls the `unregisterAll` method of *every* TrackedRegistry that has been created by the script that included this library. This is typically called
     * in the `unload()` function of a plug-in that extends the project system. 
     */
    function unregisterAll(): void;

    /**
     * Helps test a plug-in script that extends the project system. When called,
     * it runs your script's `run()` function, then creates a button an
     * **Unregister** button in the app interface. You can then test your new
     * project functionality. On clicking **Unregister**, the button is removed
     * and your script's `unload()` function is called.
     * 
     * When developing a project plug-in, it is important to unregister changes
     * you make to the project system before re-running your script, because many
     * elements in the project system can only be registered once. For example, only
     * one task action with a given name can be registered at a given time.
     */
    function testProjectScript(): void;
}