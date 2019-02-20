# Adding a new translation

This page describes a general process for adding a new translation, but keep in mind that every plug-in is different. Contact the plug-in author with any specific questions.

## Verify that the plug-in is localized

Start by checking that the plug-in is set up to be localized. If it isn't, then you'll need to contact the author to ask them to modify the plug-in.

1.  [Create a project](um-proj-intro.md) to hold your translation work.
2. Import the plug-in into the project. You can do that by adding an [import plug-in task](um-proj-plugin-task.md) to the project, or by copying the plug-in bundle into the project from the [user folder](um-plugins-manager.md), right clicking the bundle, and choosing **Import Plug-in**.
3. Importing the plug-in will add a task folder to the project that can be used to make new versions of the plug-in once you add your translation. The task folder will contain all of the files needed to make the plug-in work.
4. If you don't already know whether the plug-in supports translation, you'll want to open the task folder and poke around to find out. In most cases, a plug-in that supports translation will contain at least one [string table](dm-res-string-table.md). String tables can be identified as a collection of files with the extension `.properties`. The easy way to find out if the project has any of these files is to click on the **Find in Project** bar (the little search bar underneath the project files), type in `.properties` and hit enter.

## Identifying the string tables

Assuming you find some `.properties` files, you are probably good to go, but if you have any doubts get in contact with the author of the plug-in. Note that there may be one string table or several, and each may consist of several `.properties` files, so you'll need to start out by working out the *base name* of each string table. This is the one with no locale code appended. Each base name you find represents one set of keys to be translated.

> You can always click on a `.properties` file and check the **Properties** tab of the project pane to see which locale the locale code represents. 

## Create the needed files

At this point there are 3 possible cases for each string table:

1. There is already a base translation for your language, but the specific regional dialect is missing. For each string table, right click one of its files and choose **Add Locale** to add the specific region (such as *French-Canada*). This creates a new file with the same base name but with the newly selected locale's code appended (for example, `base-name_fr_CA.properties`). Open this in the [string table editor](dm-res-string-table.md) and translate any keys that require different text in the target region.
2. There is support for the language at all yet. This is similar to (1), but instead of adding the specific region you will add the default translation for the language (for example, `base-name_fr.properties`). If your particular language can have regional dialects, you should also add a file for the specific regional dialect you will use for the default. (The regional file can be left blank since all of the keys can inherit from the language default.) After, if you want to add other regional variants yourself just follow case (1).
3. There is an existing translation for your language/dialect, but it is out of date or needs corrections. In this case you may need to edit multiple files. To the best of your ability, you should strive to place translations that will be the same for all regions in the default translation for the region, and put region-specific translations in the appropriate region-specific file. The exception is that, if your region happens to be the one that was used for the default translation for the language, then make all your edits there. If possible, work with the author of the original translation.

> Files for the game language often don't require regional variants since a game is typically only published in one dialect of a given language. An English-language game published in the UK is unlikely to also produce a special US English edition. So game language files often define only a default translation for each language, even for languages with regional dialects.