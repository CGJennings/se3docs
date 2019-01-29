# Special URLs

A URL is text that points to the location of something, like the Web URL https://cgjennings.ca. URLs can be used in various places in Strange Eons. For example, you can set a portrait's file to the URL of an image from the Web and it will use that image for the portrait. Strange Eons also defines two special kinds of URLs (technically, URL *protocols*) for internal use: resource URLs, which start with `res://`, and project URLs, which start with `project://`. They can be used with any method that takes a URL as a parameter.

## Resource URLs

A resource URL provides access to resources that are linked to Strange Eons. This includes resources that are built into Strange Eons as well as files stored in the `resources` folder of an installed plug-in. All of the files stored in all of these locations are combined into a single *virtual file system*. This means that when a resource is requested, it will be found if it exists in *any* of the `resources` folders in *any* installed plug-in. If the same path occurs in multiple places, the plug-in that is loaded first takes precedence; you can take advantage of this by changing a plug-in's `priority` (using the [root file](dm-eons-plugin.md)).

A resource URL starts with the protocol `res://` and is followed by a path relative to this virtual file system. If your plug-in bundle includes the file:

​    `resources/myplugin/images/kitty.jpg`

then you can access it with the URL:

​    `res://myplugin/images/kitty.jpg`

> You can "escape" out of the `resources` folder to the root of the class path by adding an extra slash at the start of the URL. This URL refers to a file stored in the root of the plug-in bundle: `res:///at-the-root.txt`.

### Resources and the open project

If you refer to a resource that is not found in any of the real `resources` folders in the loaded plug-ins, the `ResourceKit` will search the open project before giving up. To do this it checks each task folder with a `resources` subfolder for a suitable match. If it finds one, this is returned as the missing resource.

This is helpful when developing plug-ins: you can, for example, run a plug-in script and it will load image resources for the script directly out of your plug-in task folder. Image resources that are discovered this way aren't cached, so if you replace one the new version will be used on the next run of the script.

## Project URLs

A project URL can be used to access a file in the open project independently of where the project is stored on your computer. They can be useful for [automation scripts](um-proj-automation.md) and in other cases where you want to refer content stored in another part of a project. For example, if you have a card that contains an `<image>` markup tag, you could use a project URL to store the image alongside the card without the link breaking when the project is copied somewhere else.

A project URL starts with `project://` and is followed by a path relative to the root of the open project.