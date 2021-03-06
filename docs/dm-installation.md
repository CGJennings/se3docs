# Installation notes and scripts

It is possible to display release notes or perform actions when a bundle is installed.

## Installation notes

Installation notes are displayed to the user when a plug-in is installed. The notes are formatted using simple HTML (headings, emphasis, paragraphs, lists). The notes must be stored in the root of the plug-in folder (next to the [eons-plugin](dm-eons-plugin.md) file) and named `index.html`. Localized versions can be including by adding an additional file for each language, with an `_` and the language code. For example, `index_fr.html` for a French translation.

## Installation scripts

An installation script is a script file that is run when a plug-in bundle is installed or uninstalled. *Most plug-ins do not require an installation script.* They are most often used when a plug-in must unpack platform-specific native code or data.

### Declaring the script

A plug-in bundle can have at most one installation script, declared with the `installer` property of the bundle’s [root file](dm-eons-plugin.md).

### Implementing the script

An installation script must define functions that match the methods declared in the [InstallationActions](assets/javadoc/ca/cgjennings/apps/arkham/plugins/InstallationActions.html) interface. Namely:

`install(pluginBundle)`  
Called just after the bundle is copied to the plug-in folder during installation. No plug-ins in the bundle have been instantiated at this point.

`uninstall(pluginBundle)`  
Called just before the bundle is deleted during uninstallation. Be aware that plug-ins that were uninstalled on a previous run are often deleted the next time the app starts up.

> **Important**  
> When these scripts run, the plug-in is generally not loaded and the app may be starting up: Do not assume that the user interface is available. Do not assume that any other classes or resources in the bundle are loaded or available. Do not expect the full [API](dm-java-api.md) to be available (though standard Java classes are safe).)