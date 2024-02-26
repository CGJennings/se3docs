# Troubleshooting

## Plug-in fails to start or causes error messages

### The plug-in bundle *X* could not be updated

This indicates that you have downloaded an update for a plug-in that required a [relaunch](um-plugins-relaunching.md), but when Strange Eons restarted it was unable to replace the old plug-in for some reason. To investigate, you'll need to check your plug-in folder. If the app finishes starting, you can do this from the [plug-in manager](um-plugins-manager.md). Otherwise, find the `plug-ins` subfolder inside your [inside your user folder](um-install-user-folder.md). You should find a file with the name indicated by the error message and the file extension `.autoupdate`. You will usually also find a file with the same name but no `.autoupdate`. For example:

```
DeveloperTools.seplugin 
DeveloperTools.seplugin.autoupdate
```

The file with the `.autoupdate` extension is the new plug-in, the one without it is the old version. For some reason (file permissions, the file is open in another app, disk error) the old file could not be deleted. Try deleting it manually, then renaming the new plug-in file to remove the `.autoupdate` extension. If the file is locked because it is in use by an application and you can't figure out which one, you can try rebooting your computer first.

### Script warnings

If a plug-in causes the script console to open and display a yellow “Warning” message, this may indicate a bug in the script. Ideally, plug-in developers should update plug-in scripts so that these warnings do not appear. In some cases the plug-in developer may no longer maintain the plug-in, in which case the warning messages may become an annoyance. In such cases it may be desirable to disable the warnings:

1. Open the **Preferences** dialog.
2. In the **Plug-ins** category, find **Plug-in scripts/Compiler options**.
3. Uncheck the **Warnings** check box.

### Errors when running a 3.x alpha or beta version

Where possible, Strange Eons is updated so that existing plug-ins continue to work. When a new version makes significant changes, this reconciliation phase may not begin until the version enters the beta stage of development. If you are running an alpha version, feel free to report the issue but don’t feel obligated. If you are running a beta version (or if the version is no longer in beta!) and the issue still occurs, report the problem as an issue.

### Errors when running a “stable” 3.x version

If a plug-in that produces error messages when run in a “stable” version (not an alpha or beta version), try the steps in the sections below to see if that resolves the problem. If not, it may indicate a fault in the plug-in. Does the problem appear to be due to a transient issue, such as a temporary network problem? Does it appear to be due to a user error, such as selecting a non-existent file? In these cases, the plug-in is probably working more-or-less as intended. Unless the error ripples out in such a way that it causes other problems, such as data loss, then the solution is to correct the underlying cause and try again. For other kinds of errors, try to contact the plug-in author and report the issue so that they can fix the issue and release an update.

**Note:** If the plug-in worked in the previous 3.x version, it may actually be an example of the previous case that slipped through the cracks. If you are not sure, report it as an error in Strange Eons.

### Compatibility mode

If a plug-in exhibits `ReferenceErrors` or messages stating that something is undefined, this may indicate that the plug-in was written for a previous version of Strange Eons and has not been updated. You might be able to get the plug-in to run by enabling script compatibility mode.

*To enable script compatibility mode,* open the Preferences dialog, choose the **Plug-ins** category, and check **Compatibility mode**. If the problem is with an extension, exit and restart the app.

> Enabling script compatibility mode may add a small performance hit. It also *adds objects to the global scope*, which may interfere with other scripts if they try to define constants with the same name. Where possible, the plug-in or script should be updated to use current APIs.

### Missing required plug-ins

Another potential cause of plug-in errors is that a plug-in may depend on other plug-ins that are not installed. Check for plug-ins in the catalogue that look like they may be interrelated to the problem plug-in and install them. If this corrects the problem, contact the plug-in author to suggest that they update the plug-in to [list its dependencies](dm-eons-plugin.html#requires).