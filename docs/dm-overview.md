# Overview of plug-in authoring

So you want to make a [plug-in](um-plugins-intro.md). Maybe? What's involved? How hard is it? Let's start with some of the things you can do with plug-ins:

* Add support for new games, game expansions, and game components. This is the most common reason for wanting to write a plug-in.
* Add new commands and tools to help automate tasks or provide useful features.
* Add new commands, new task types, new file types and other extensions to the [project system](um-proj-intro.md).
* Add new export containers. For example, you could write a plug-in to let users [export images](um-gc-export.md) directly to their favourite file sharing service.

Would you like to do any of the above? If so you are in the right place, so read on. If not, perhaps you are looking for the regular [user manual](um-index.md)?

> **Before going further**  
> If you have not yet downloaded the [Plug-in Authoring Kit](https://strangeeons.cgjennings.ca/download.html#pak), you should do so now. This is a Strange Eons project that includes a wealth of example plug-ins, code, and resources to get you started.

## What is involved?

A plug-in consists of a collection of files that work together to provide whatever features the plug-in offers. The basic task of a plug-in author is gathering or creating these files. For example, a plug-in that adds a new card type might include some images used to draw the card face, some fonts needed for the card text, and some extra text files with the information needed to tie everything together. And every plug-in includes one special file called the [root file](dm-eons-plugin.md). Strange Eons reads this file first, in order to figure out what to do with the rest of the files!

Once the files are collected together, they are packaged into a *plug-in bundle*. This is basically a ZIP file with a special file extension like `.eons-plugin`. The plug-in bundle is what you actually install in Strange Eons in order to add the plug-in.

You organize and manage the files for your plug-in from right within Strange Eons, using the [project system](um-proj-intro.md). All the files for a single plug-in go inside one plug-in [task folder](um-proj-plugin-task.md). When you are ready to prepare a plug-in bundle, just right click on the task folder and choose **Make Bundle**. In a moment a bundle appears next to your task folder and you can double click to install it!

## What are the prerequisites?

### Skills and knowledge

Since plug-in authoring is part of the [project system](um-proj-intro.md), you should take the time to familiarize yourself with it (and Strange Eons generally) before getting started.

There is no one list of skills that will make you the perfect plug-in author. Depending on what you want to achieve, you might need to know a little about image editing, a little about fonts, a little about coding, or other topics. Generally, the more experience you have with computers the easier it is going to be. Remember that you don't need to go it alone! You can always recruit help from others with complementary skills.

Some kinds of plug-ins do involve writing small to medium amounts of script code. *Don't freak out!* You generally don't need to be an experienced programmer to write these scripts. It is often enough to start with a small example plug-in that is similar to what you want to do and adapt it to your needs. Don't be intimidated! More than one plug-in for Strange Eons has been written by an author with no prior programming background.

### Tools

Most of the tools you need are already built into Strange Eons. You will probably want to install the Developer Tools plug-in (`eonscat:6574`). You will also want to enable support for the [script debugger](dm-debugger.md). As mentioned above, you will also want to explore the [Plug-in Authoring Kit](https://strangeeons.cgjennings.ca/download.html#pak).

#### Graphics apps

For graphics editing, there are several commercial and free applications to choose from. Some free choices include [Krita](http://krita.org) and [GIMP](https://www.gimp.org/). Photoshop is a well-known commercial app. For [vector graphics](dm-res-image.md#vector-images), [Inkscape](https://inkscape.org/) is a free SVG editor.

#### Font apps

Usually it is enough to package some open source fonts in your plug-in, but sometimes it is convenient to create a simple font or edit an existing font. For example, you may want to create a small font with some custom icons used in your card text. For font editing, the most comprehensive free choice is probably [FontForge](https://fontforge.github.io/). It can be intimidating if you new to font design! You may find a tool like the online editor [Glypher Studio](https://www.glyphrstudio.com/) more approachable.
