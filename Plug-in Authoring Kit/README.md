# Plug-in Authoring Kit
This kit contains examples and other resources to help
you learn to write plug-ins for
[Strange Eons 3](https://strangeeons.cgjennings.ca/).

You are free to adapt and reuse these examples in your
own plug-in projects. For details see the
[license file](LICENSE.md).

## Getting started
To get started, open the kit as a project folder in
Strange Eons using the **File/Open Project** menu item.

The kit is divided into folders depending on the topic.
Each topic folder has its own `README` file with more
information on what you'll find inside.

### Types of examples
Some examples are standalone scripts that you can just
run directly:
 - right click on it in the project and choose **Run**; or
 - double click to open the script for editing and choose **Run File**

Other examples are complete plug-ins. You can test a plug-in
by right-clicking on its *task folder* and choosing
**Test Plug-in**. This lets you test the plug-in in a
separate copy of Strange Eons without installing it.

*The plug-in's "task folder" is the folder that contains
a file named `eons-plugin`.*

To install a plug-in, first right click on its task folder
and choose **Make Plug-in Bundle**. Then double-click the
bundle to install it. You may need to restart Strange Eons
for the plug-in to work correctly.

### Resource mapping
It is often possible to run even a plug-in script, such
as script to create a game component, without installing
it. One reason for this is resource mapping. If a
script tries to load a resource (such as an image) and it
isn't found in an installed plug-in, then before issuing
an error Strange Eons will check plug-in task folders in
the open project, and use the first file with the same name
and path that it finds. If your plug-in task folder contains
a file `task_folder/resources/bad_kitty/cat.jpg`, then
plug-in script code looking for `res://bad_kitty/cat.jpg`
will find it. (Installed plug-ins take precedence, so if
you install the plug-in and then change the file in your
project, you will continue to see the version from the
plug-in.)

## Additional resources
The following additional resoruces are available online:

 - **[Developer manual](https://se3docs.cgjennings.ca/dm-index.html)**
 - **[Scripting API docs](https://se3docs.cgjennings.ca/assets/jsdoc/index.html)**
 - **[Strange Eons API docs](https://se3docs.cgjennings.ca/assets/javadoc/)**