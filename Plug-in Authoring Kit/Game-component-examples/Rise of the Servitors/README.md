# Rise of the Servitors

This example expands an existing game (that has its own separate plug-in)
with a new card type.

Since the main plug-in for the game does most of the work of setting up,
the plug-in script doesn't have much to do: it checks that the main game
(Arkham Horror 2nd ed, with code `AH`) has been installed, and stops
if not. Otherwise it adds the settings needed for the new card type to
the existing settings for the `AH` game, and then registers the new
card type using the `rots.classmap` file.

## Requiring other plug-ins
The `eons-plugin` root file also indicates that this plug-in requires Arkham Horror
(check the **Referenced Bundles** and **Advanced** tabs). This entry becomes part
of the metadata about the plug-in in the catalogue, so Strange Eons can check the
requirements before installation. The check in the plug-in script is still important,
since a user could install both plug-ins and then uninstall Arkham Horror.

## Installation notes
Notice the [install.html](install.html) file. This contains the *installation notes*
for the plug-in. It is displayed when the plug-in is installed. Strange Eons looks
for this file, named `install.html` or `install.md`, in the root of the plug-in bundle.
Translations can be provided by adding more files, tagged with the relevant locale
code (such as `install_en_US.html`). Right click on the file and choose **Add Locale**
to create a file with correct name automatically.

## The `diy` script
The DIY script for the component, `diy.js` is interesting in that instead of painting
each element of the design directly, it builds the design up using markup box tags.
Have a look, it is straightforward and well documented.