# Plug-in tasks

Several of the task types in Strange Eons are concerned with creating plug-ins. All plug-in task folders support the same actions; the difference between them is in how they set up the task folder.

For information on creating plug-ins, refer to the [Developer Manual](dm-index.md).

**Empty Plug-in**  
Creates a suitable task folder but adds no initial content.

**Import Plug-in**  
Prompts you select an existing plug-in bundle stored on your computer and then unpacks its contents into the new task folder. This can be used to examine or extend an existing plug-in.  If you are using this plug-in as a basis for an entirely new plug-in, be sure to [generate a new UUID](dm-eons-plugin.md) (unique ID) so that Strange Eons can tell them apart.

> If the imported bundle uses compiled `.class` files, you will also need the original source files in order to review or modify the code.

**New Plug-in**  
Leads you through some basic choices about the kind of plug-in you want to create, then creates a task with some skeleton code and resources to get you started.