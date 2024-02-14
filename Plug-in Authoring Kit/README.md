# Plug-in Authoring Kit
This kit provides examples and resources for creating plug-ins
for [Strange Eons 3](https://strangeeons.cgjennings.ca/).
Feel free to adapt these examples for your projects.
See the [license file](LICENSE.md) for details.

## Getting started
Open this kit as a project in Strange Eons via
**File/Open Project**. The kit is organized into topic-specific
folders, each with its own `README` detailing its contents.

### Example types
Examples come in two forms:
 1. **Standalone scripts**  
    Double-click the script in the project to view or edit,
    or right-click and select **Run File**.
 2. **Complete plug-ins**  
    Test these by right-clicking the plug-in's *task folder*
    and selecting **Test Plug-in**. This allows you to test
    the plug-in in a separate instance of Strange Eons without
    installing it. (The task folder contains an `eons-plugin` file.)
    To install a plug-in, right-click the task folder and choose
    **Make Plug-in Bundle**, then double-click the bundle
    to install.

### Resource mapping
Plug-in scripts, such as those creating game components,
can often run without installation due to resource mapping.
If a script attempts to load a resource (e.g., an image)
not found in an installed plug-in, Strange Eons will search
the plug-in task folders in the open project before issuing
an error. For example, if your task folder contains
`task_folder/resources/bad_kitty/cat.jpg`,
a script requesting `res://bad_kitty/cat.jpg`
will locate it. Note that files in installed plug-ins take
precedence over project files.

## Additional resources
Online resources include:
 - [Developer manual](https://se3docs.cgjennings.ca/dm-index.html)
 - [Scripting API docs](https://se3docs.cgjennings.ca/assets/jsdoc/index.html)
 - [Strange Eons API docs](https://se3docs.cgjennings.ca/assets/javadoc/)