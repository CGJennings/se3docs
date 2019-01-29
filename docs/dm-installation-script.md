# Installation scripts

An installation script is a script file that is run when a plug-in bundle is installed or uninstalled. *Most plug-ins do not require an installation script.* They are most often used when a plug-in must unpack platform-specific native code or data.

## Declaring the script

A plug-in bundle can have at most one installation script, declared with the `installer` property of the bundle’s [root file](dm-eons-plugin.md).

## Implementing the script

An installation script must define functions that match the methods declared in the [InstallationActions](assets/javadoc/ca/cgjennings/apps/arkham/plugins/InstallationActions.html) interface. Namely:

`install(pluginBundle)`  
Called just after the bundle is copied to the plug-in folder during installation. No plug-ins in the bundle have been instantiated at this point. Generally the plug-in will not have been loaded, so you cannot expect any classes or resources from the bundle to be available to the installation script.

`uninstall(pluginBundle)`  
Called just before the bundle is deleted during uninstallation. Plug-ins that were uninstalled on a previous run are often deleted the next time the app starts up, before Strange Eons is completely loaded. Therefore you cannot rely on the full API being available (but standard Java classes will be available). The plug-in will not have been loaded, so you also cannot expect any classes or resources from the bundle to be available to the installation script.