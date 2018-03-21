# User folder

Strange Eons stores all of your personalized settings and installed plug-ins in a location called the *user folder*. When you switch to a new computer you can transfer all of your settings and plug-ins by copying this folder to the equivalent location on the new computer. (Even if it uses a different operating system!)

## Folder location

The location of the folder varies:

On **Windows** it is part of your "roaming profile". It includes the following folder and its contents:

​    `%APPDATA%\StrangeEons3`

The `%APPDATA%` is an environment variable that expands to different location for each user, but you don't need to worry about that. You can view the contents by opening an explorer window (<kbd>Windows</kbd>+<kbd>E</kbd>) and pasting the path above into the location bar at the top of the window.

On **macOS** and **Linux**, the user folder is a hidden directory under your home directory:

​    `~/.StrangeEons3`

Because the file is hidden (starts with `.`) it might not be visible under normal conditions, but if you have run Strange Eons it will exist!

> If you are having trouble finding it you can open **Toolbox/Quickscript**, paste in the following script code, and run it:  
>
> ```js
> println(Eons.getUserStorageFile(null));
> ```

## ⚠️ Using a different folder

You can specify a different location by setting the environment variable `STRANGE_EONS_USER_DIR` to the path of the new directory before starting Strange Eons. If the directory does not exist, Strange Eons will try to create it (and any intermediate directories that are missing). If this fails, or if the path points to a file instead of a directory, it will fall back to the default location.

## What is stored there

Most of the files stored in the user folder have self-explanatory names. Here are some of the most common items you will find:

`abbrev/*`  
This folder contains your custom [abbreviations](um-gc-abbreviations.md). Deleted it will revert abbreviations to their defaults.

`cat-cache`  
A copy of the last [plug-in catalogue](um-plugins-catalogue.md) you downloaded. If you open the catalogue several times in quick succession, this cached copy is used instead of downloading it again each time.

`debugger-client/*`  
Stores preferences for the script debugger client application used by plug-in developers.

`learned-spelling-words`  
Contains your personal [spelling words](um-gc-spelling.md).

`plugins/*`  
Contains the bundle files of all currently installed plug-ins.

`preferences`  
Contains your personalized [preference settings](um-ui-preferences.md).

`quickscript`  
Contains the last script that you ran from the **Quickscript** window, to restore it when you open the window again.