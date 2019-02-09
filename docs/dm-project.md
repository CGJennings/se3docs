# Access the open project and its files

This page provides an overview of [projects](um-proj-intro.md) from the developer's perspective.

## Overview of project classes

### Project members

Projects consist of a tree of files and folders stored on the local file system. The root of the tree is the project itself; it is distinguished from non-project folders because it contains a file named `seproject` that stores [settings](dm-settings.md) associated with the project. Regular files and folders stored in the project folder are called project *members*. Projects also contain special folders called *task folders*. A task folder is set up to support a particular kind of activity; members can support different actions depending on the task folder they are saved in.

[Project](assets/javadoc/ca/cgjennings/apps/arkham/project/Project.html)  
Represents the entire project. This has methods to create and open projects (though you should use the higher level methods described below), convert them between packaged and unpackaged versions, and iterate over the task folders it contains. Starting from a Project you can iterate over every member of the project in order.

[Task](assets/javadoc/ca/cgjennings/apps/arkham/project/Task.html)  
Represents a task within the project. Every task folder also has Settings that can be used to store related configuration details, including the type and optionally the subtype of the task.

[TaskGroup](assets/javadoc/ca/cgjennings/apps/arkham/project/TaskGroup.html)  
A TaskGroup is a particular type of Task, the only kind that is allowed to contain other task folders. All Projects are also TaskGroups.

[Member](assets/javadoc/ca/cgjennings/apps/arkham/project/Member.html)  
A member of a project; this is the base class of all of the classes above and represents any kind of file in a project. It includes methods to enumerate children, rename, delete, get a path or URL, locate the associated Task, and get metadata such as an icon and file type information.

### The project view

The contents of the open project are displayed in a component called a [ProjectView](assets/javadoc/ca/cgjennings/apps/arkham/project/ProjectView.html). The current instance can be obtained with `Eons.window.openProjectView`. From the app window you can also call `closeProject()` to close the current project, or `setOpenProject(projectRootFile)` to open a different project.

Using the ProjectView instance, you can modify or clear the selected members, listen for changes to the selection, copy and paste members, scroll to display chosen members, and similar kinds of operations.

### Actions

When the user selects one or more members in the project view and right clicks, they are presented with a menu of [TaskAction](assets/javadoc/ca/cgjennings/apps/arkham/project/TaskAction.html)s. This menu is composed by asking each registered action whether it wants to be included in the menu (based on what's selected). The order of the items is determined by a priority value.

[Actions](assets/javadoc/ca/cgjennings/apps/arkham/project/Actions.html)  
Registry of all available TaskActions.

[TaskAction](assets/javadoc/ca/cgjennings/apps/arkham/project/TaskAction.html)  
An action (command) that can be applied to members of a project.

[TaskActionTree](assets/javadoc/ca/cgjennings/apps/arkham/project/TaskActionTree.html)  
A task action that creates a group of related actions; used to create submenus of TaskActions.

[SpecializedAction](assets/javadoc/ca/cgjennings/apps/arkham/project/SpecializedAction.html)  
Used to modify an existing TaskAction, for example, by extending to apply to another file type.

[New](assets/javadoc/ca/cgjennings/apps/arkham/project/New.html)  
The TaskActionTree that handles creating new files. Use New.NewAction as a base for adding new entries to the **New** action's menu.

[Open](assets/javadoc/ca/cgjennings/apps/arkham/project/Open.html)  
The action that typically handles opening project files. Use Open.InternalOpener to handle the opening of new file types.

[Rename](assets/javadoc/ca/cgjennings/apps/arkham/project/Rename.html)  
The action used to rename project files; register a Rename.RenameListener to be notified when files are renamed or deleted through the project system. For example, plug-in tasks listen for the plug-in bundles that they generate to be renamed; when this is detected, the new name is stored in the task's settings so that future builds use the same name.

### File type metadata

[MetadataSource](assets/javadoc/ca/cgjennings/apps/arkham/project/MetadataSource.html)  
Provides information about a file type; new sources are registered with the Member class.

## Working with project members

You can get the current open project from the [application instance](assets/javadoc/ca/cgjennings/apps/arkham/StrangeEons.html) (`Eons` in script code): `Eons.openProject`. This returns `null` if no project is open. The [ProjectUtilities](assets/javadoc/ca/cgjennings/apps/arkham/project/ProjectUtilities.html) class defines static helper methods that can ease common project processing tasks.

### Getting the members of a project

The following methods of Member can be used to enumerate a project's contents:

`isFolder()`  
Returns `true` if the member is a folder (and therefore can have children).

`getChildren()`  
Returns an array of a member's children.

`hasChildren()`  
Returns `true` if the member has children.

`getChildCount()`  
Returns the integer number of children (may be 0).

`getChildAt(index)`  
Returns the `index`th child of this member.

`findChild(name)`, `findChild(file)`  
Returns the child matching the relative path and name, or the immediate child matching the specified [File](https://docs.oracle.com/javase/8/docs/api/java/io/File.html). To search an entire project for a file, use the `Project.findMember(file)` method.

The following script code will print a tree of all of the members in the current project:

```js
function printTree(node, indent) {
	if(indent === undefined) {
		indent = '';
	}
	println(indent, node.name);
	for( kid in Iterator(node) ) {
		printTree(kid, indent + ' ');
	}
}

printTree(Eons.openProject);
```

(The for-in syntax works because Member is [Iterable](https://docs.oracle.com/javase/8/docs/api/java/lang/Iterable.html).)

### Accessing members

Given a Member, the following methods can be used to get basic information about it:

`getName()`  
Returns the complete file name, such as `mountains.png`.

`getBaseName()`  
Returns the base name of the file, without its extension.

`getExtension()`  
Returns the file extension of the file, such as `png`. If the file has multiple extensions, only the last extension is returned. You can test if a file matches any of a list of candidate extensions using `ProjectUtilities.matchExtension(member, extensions...)`.

`getIcon()`  
Returns an Icon that represents the file. This is a convenience that looks the icon up from the member's metadata.

`getMetadataSource()`  
Returns an object that can provide metadata for the type of file that the member represents, a [MetadataSource](assets/javadoc/ca/cgjennings/apps/arkham/project/MetadataSource.html). A description of the file type can be obtained via the source's `getDescription()` method. If the file type is text-based, the source's `getDefaultCharset()` method can be used to determine the expected encoding. The method `getMetadata(member)` can return the specific metadata for the member in question.

The following methods provide access to the underlying file:

`getFile()`  
Returns a [File](https://docs.oracle.com/javase/8/docs/api/java/io/File.html) for the absolute path to this member in the local file system.

`getURL()`  
Returns a [`project://` URL](dm-special-urls.md) that can be used to access this file (when this member is in the open project). Methods in the [ResourceKit](assets/javadoc/resources/ResourceKit.html) that accept resource paths will also accept project URLs.

## About Tasks

Within a project, task folders are represented by [Task](assets/javadoc/ca/cgjennings/apps/arkham/project/Task.html) objects. Since these are a subclass of Member, everything that applies to a member also applies to a task.

### Task folder creation

Users create new task folders with the [AddTask](assets/javadoc/ca/cgjennings/apps/arkham/project/AddTask.html) action, which can be activated like other actions (by right clicking on the parent) or using the **Add Task** link at the top of the project view. Tasks can only be created as children of a TaskGroup (including Projects). The user chooses the type of task to create. This triggers the following steps:

1. The user's choice is mapped to a [NewTaskType](assets/javadoc/ca/cgjennings/apps/arkham/project/NewTaskType.html) instance.
2. The selected parent TaskGroup's `addNewTask` method is called with the task type and the name for the new task folder.
3. A folder with the requested name is created, and an `seproject` file is created within to store the task type and other settings.
4. The NewTaskType is used to initialize the folder with any additional files or settings. In some cases it shows a dialog to gather additional information.

### Task settings

Each task folder has its own [Settings](dm-settings.md) instance that can be obtained by calling the task's `getSettings()` method. At a minimum, the settings will include a `type` setting key that specifies the task type. Some also include a `subtype` with more specific information. Task actions can use this value to determine if they apply to a given task. Actions are free to define additional keys to store task-specific configuration data.

### Custom icons

Task types are shown in the project view using distinctive icons. The default icon is determined by the task type, but the user can change the default using the **Change Icon** action. Over 120 custom icons are included with the application, but plug-in developers can also register additional icons using the `Task.registerCustomIcon(imageResource)` method.