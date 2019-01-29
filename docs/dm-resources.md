# Resources

Plug-ins typically require access to resources such as [images](dm-res-image.md), [fonts](dm-res-font.md), and other data files. Resource files are included in a plug-in like any other file, by placing them in the plug-in's project task folder before it is bundled. For ease of access, resource files are typically stored in the plug-in under a folder called `resources`. As files in a plug-in are "visible" to all other plug-ins, it is important to avoid creating resources with the same path. The easiest way to do this is to store your files in a subfolder of `resources` based on your name, game code, plug-in UUID, or some other effectively unique string.

**Example** 
Suppose Jane Simmons is writing a plug-in for a game called *SuperWhiz*. To keep her resource file names from colliding with other plug-ins, she might create a subfolder of `resources` named `jsimmons` and a subfolder of that named `superwhiz`. If she later creates a plug-in for a different game, she could store its resources in another subfolder of `jsimmons`.

To *quickly create nested folders in a project*, create a new folder, and then when prompted to enter a folder name, add more folder names separated by `/`. Following the example above, Jane could right click on her plug-in task folder and choose **New/Folder**, then enter the name `resources/jsimmons/superwhiz` to create all three folders.

## Accessing resources from a plug-in

### Using `ResourceKit`

The [ResourceKit](assets/javadoc/resources/ResourceKit.html) class defines a number of static utility methods for dealing with resources. Many types of resources are loaded using special-purpose methods (functions) that are designed to process that kind of file. *Check the page for the particular resource type in this section for more information.*

For general access to any kind of resource file, such as a data file in your own private format, you can use the [`ResourceKit.getInputStream(path)`](assets/javadoc/resources/ResourceKit.html#getInputStream). Here, as elsewhere in ResourceKit, the `path` is a path relative to the combined `resources` virtual file system. For example, Jane might access one of her files using the path `jsimmons/superwhiz/data.bin`. This would be stored in her plug-in task folder under `resources/jsimmons/superwhiz/data.bin`.

### Using URLs

Resources can also accessed using [URL](https://docs.oracle.com/javase/8/docs/api/java/net/URL.html)s of the form `res://`. The remainder of the URL is the same as a `path` that would be passed to a `ResourceKit` method. For example, the following code is equivalent to the `getInputStream` example above:

```java
new java.net.URL("res://jsimmons/superwhiz/data.bin").openStream();
```

[More on `res://` URLs](dm-special-urls.md)