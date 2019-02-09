# Extend the project system

The [project system](um-proj-intro.md) can be extended by registering new task types, new files types, new editors, new commands, and more. Often, a single plug-in register several of these at once. For example, a plug-in that registers a new task type might also add commands specific to the new task type.

Complete examples of extending the project system can be found in the [Plug-in Authoring Kit](dm-pak.md).

## Plug-in construction

Typically, a plug-in that extends the project system will install its changes when the plug-in is loaded and uninstall them when the plug-in is unloaded, meaning that it will use the `INJECTED` [type](dm-plugin-types.md).

Scripts that extend the project system can take advantage of the project library. This defines a general class, TrackedRegistry, for tracking objects that must be *registered* to take effect. A subclass is provided for each specific type of registerable entity: for example, ActionRegistry for tracking registered actions. A registry's `unregisterAll()` method can be called to automatically unregister any registered objects, making the plug-in's unloading code trivial to implement. The library also defines `testProjectScript()`. A call to this can be placed in a plug-in script to simulate loading and unloading the plug-in.

## Registering actions

Task actions are commands that can be applied to folders and files in a project. When the user right clicks selected files in a project, a menu is displayed that lists the actions applicable to the selection. When the user selects one, the associated action is performed.

### Elements of a TaskAction

Task actions are created by subclassing [TaskAction](assets/javadoc/ca/cgjennings/apps/arkham/project/TaskAction.html). The following *abstract methods* are not defined in the TaskAction base class and must be implemented by you:

`getLabel()`  
Returns the name of the action as presented to the user.

`appliesTo(project, task, member)`  
Called for each selected member; this should return `true` if the action can be applied to the member.

`perform(project, task, member)`  
Called when the user chooses the action in order to apply it to the specified member.

When implementing a project action with script code, the following should also be overridden:

`getActionName()`  
Returns a unique name for the action; conventionally this is the name of the action, in English, with all lower case letters.

### Registering actions

Task actions are registered and unregistered through static methods in the [Actions](assets/javadoc/ca/cgjennings/apps/arkham/project/Actions.html) class. The location of the action in the menu is determined by the action's *priority*, which you specify during registration. Actions includes some predefined priorities.

Here is a simple example that would apply to any file (but not folders):

```js
importPackage(arkham.project);

var action = {
	getLabel: function getLabel() {
		return 'Example';
	},
	getActionName: function getActionName() {
		return 'example';
	},
	appliesTo: function appliesTo(project, task, member) {
		// since projects and tasks are both kinds of folder, member
		// must be non-null and not a folder.
		return member != null && !member.isFolder();
	},
	perform: function perform(project, task, member) {
		println('Hello, ' + member.name);
	}		
};

// We now have a script object that implements the needed methods.
// We have to use it to create a Java object that subclasses the
// TaskAction class.
action = new JavaAdapter(TaskAction, action);

Actions.register(action, Actions.PRIORITY_DEFAULT);
```

### Specializing actions

Existing actions can be *specialized* in order to change their default behaviour or extend them for new circumstances. Specializations are created like regular actions, but they subclass [SpecializedAction](assets/javadoc/ca/cgjennings/apps/arkham/project/SpecializedAction.html). This provides a method, `getSuperAction()`, which returns the underlying action. Whenever the specializing action is asked whether it applies, or is asked to perform its action, it has two choices. If it wants to replace or change the default action's behaviour in this case, it should do so. Otherwise, it can call the same method in the underlying action (and return its result) in order to defer to the default behaviour.

### Submenus of actions

To present a submenu of actions, create a [TaskActionTree](assets/javadoc/ca/cgjennings/apps/arkham/project/TaskActionTree.html). This is an action whose label will be used as the submenu label. To add items to the submenu, add TaskActions to the TaskActionTree.

## Registering *New* subactions

The [New](assets/javadoc/ca/cgjennings/apps/arkham/project/New.html) TaskActionTree is a built-in action that lets the user create new, empty files of various types. It appears whenever you right click on a folder, including task and project folders. The types of files that are available to create depend on the type of the Task containing the folder.

To add a new file type to the **New** menu, all you need to do is write an appropriate TaskAction and add it to the existing New action's tree. The following code can be used to get the New action:

```js
var newAction = Actions.findActionByName("new");
```

However, on the off chance that another plug-in has specialized the action, it is preferable to get the action this way:

```js
var newAction = Actions.getUnspecializedAction("new");
```

You can then add your action normally:

```js
newAction.add(myAction);
// or
newAction.add(positionIndex, myAction);
```

### The New.NewAction helper

The New class includes a special inner class, [New.NewAction](assets/javadoc/ca/cgjennings/apps/arkham/project/New.NewAction.html) that makes it easy to add an item that creates its empty file by copying it from a resource folder.

## Registering file openers

File openers are used to open project files. To support a new file type, you register an opener for the type. When the user attempts to open a matching file, it will then be passed to your opener. Typically, the opener creates an editor for the file (a subclass of [AbstractSupportEditor](assets/javadoc/ca/cgjennings/apps/arkham/AbstractSupportEditor.html)) and adds it to the open document tabs.

File openers are registered directly with the Open action that handles the opening of files. This action includes the methods `registerOpener` and `unregisterOpener`. These are passed an instance of the interface [Open.InternalOpener](assets/javadoc/ca/cgjennings/apps/arkham/project/Open.InternalOpener.html) that you create. There are only two methods to implement: 

`appliesTo(file)`  
Returns `true` if the opener knows how to open the [File](https://docs.oracle.com/javase/8/docs/api/java/io/File.html) passed to it; otherwise `false`.

`open(file)`  
Opens the File passed to it.

## Registering metadata sources

A [MetadataSource](assets/javadoc/ca/cgjennings/apps/arkham/project/MetadataSource.html) provides the icon, description, and other metadata for file types recognized by the project system. To add basic support for a new file type, create a subclass that returns appropriate results from `getIcon()` and `getDescription()` and override `appliesTo` to return `true` only if the member passed to it is a file of the type in question (usually by checking the extension). Then register the source using `Member.registerMetadataSource(mySource)`.

### Custom metadata properties

When a file of your new type is selected in the project view, the **Properties** tab is updated to display information about the file collected from the MetadataSource by calling `fillInMetadata`. To provide additional data, your subclass should override this method to first call the superclass implementation and then submit its own extended data. If some of these properties are expensive to generate (such as thumbnail images), you can subclass [ThreadedMetadataSource](assets/javadoc/ca/cgjennings/apps/arkham/project/ThreadedMetadataSource.html) instead.

### Per-Member sources

Typically, a single MetadataSource is shared by all files of the given type (or even multiple closely related types). To customize the results for each individual member, override `getSpecificInstanceFor`.

## Registering new task types

Within a project, users organize their work into various *task folders*. Each represents a different kind of activity related to the project. The available task actions and other features are tailored to the specific task folder that contains the selected project member.

To create a new kind of task folder, subclass the abstract [NewTaskType](assets/javadoc/ca/cgjennings/apps/arkham/project/NewTaskType.html) class. You will override some or all of the following:

`getLabel()`  
Returns the name of the task type as presented to the user.

`getDescription()`  
Returns a longer description of the task type. This is displayed to the user the task type is selected in the **Add Task** dialog. It can be marked up with basic HTML tags.

`getIconResource()`  
Returns the [resource path](dm-resources.md) of an [image](dm-res-image.md) to be used as the task's default task folder icon.

`getType()`  
Returns a unique string that codes for the task type. This is stored in the task folder's settings so that actions can test it when deciding whether a given action should be available in a given task type. A number of predefined values are defined in the NewTaskType class, but you can also define your own.

`getSubtype()`  
You can optionally return a more specific subtype here to further differentiate the task folder when choosing commands. For example, a factory task might use a subtype to code what type of data it uses to generate components.

`initializeNewTask(project, task)`  
When the user chooses your task type, the folder will be created and then its Task will be passed to this function so you can perform additional setup, such as copying in starter files or presenting a wizard with further configuration options.

Once defined, the new task type must be registered to make it available:

```js
NewTaskType.register(myNewTaskType);
```

The new task folder type will then appear in the list of options in the **Add Task** dialog.

