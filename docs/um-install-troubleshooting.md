# Troubleshooting

## Strange Eons fails to start

### If using the “Other” platform version

In most cases this indicates an issue with your command line options, or that you are trying to run Strange Eons with an unsupported version of Java. [Refer to the “other” installation instructions for more information.](um-install-other.md)

### After installing a plug-in

If the app won't start after installing a plug-in, it is a good bet that the problem involves that plug-in. Using the instructions for [catalog issues](um-catalogue-troubleshooting.md), find the `plug-ins` subfolder [inside your user folder](um-install-user-folder.md). Locate the just-installed plug-in(s) and delete them, then try starting the app again.

### After displaying a Fatal Error message

*Also check the other troubleshooting pages to see if your specific error message has its own help page.*

When this appears, SE will try to check for an updated version which might have fixed the error. If it finds an update, a link will appear at the bottom of the message dialog. Otherwise, you should choose the **Report a Bug**  button to submit a bug report, or [report it here](https://cgjennings.ca/contact.html).

![example fatal error dialog](images/fatal-error.png)

### “The plug-in installation folder is not a valid folder”

Strange Eons uses a special [user folder](um-install-user-folder.md) stored in your account’s home directory to save your preferences, downloaded plug-ins, and so on. It tries to create this folder automatically if it does not exist. This message indicates that, for some reason, the folder either does not exist or that Strange Eons does not have permission to access it. The following general steps may help solve the problem.

> **Note:** It is possible to customize the location of the user folder, in which case these instructions will refer to the wrong location. [See this page for details.](um-install-user-folder.html#%EF%B8%8F-using-a-different-folder) Experienced computer users may try to resolve this problem by checking if a custom location is set and/or setting a new location.

#### Step 1: Check that a user folder exists

**Windows:** Open an Explorer window (<kbd>⊞ Win</kbd> + <kbd>E</kbd>), and in the location bar at the type `%APPDATA%` and press <kbd>Enter</kbd>. Look for a folder named `StrangeEons3`. If for some reason there is a file with this name instead of a folder, delete the file.

**macOS:** Open a Finder window and go to your home folder. On Macs and Linux, the user folder is named `.StrangeEons3`, but files that start with a `.` are normally hidden from view. Press <kbd>⌘ Command</kbd> + <kbd>⇧ Shift</kbd> + <kbd>.</kbd> to show these files (pressing this a second time will hide them again). Look for a folder named `.StrangeEons3`. If for some reason there is a file with this name instead of a folder, rename or delete the file.

If the folder does not exist, try creating the folder yourself. If you cannot, check the permissions for current folder (go up one level, select the folder you were just in, and follow the instructions below under Step 3).

**Windows:** Right click in the Explorer window, choose **New/Folder**. Name the folder `StrangeEons3`.

**macOS:** Choose **File/New Folder**. Name the folder `.StrangeEons3`.

#### Step 2: Check for a plug-in subfolder

Open the folder. Inside you may find [a number of files and folders](um-install-user-folder.md#what-is-stored-there). Check for a folder named `plug-ins` and if it does not exist, create it (see previous step for instructions, changing the folder name). As before, if for some reason there is a file with the name `plug-ins` instead of a folder, rename or delete the file.

*If you made any changes during either of these steps, try starting Strange Eons again to see if it corrects the problem.*

#### Step 3: Check ownership and permissions

If the folders exist but Strange Eons still does not start correctly, there may be a file permissions issue. You should check that you are the “owner” of both folders and that you have read, write, and create permission.

**Windows:** For each folder in turn, right click on the folder and choose **Properties**, then **Security**. Choose **Edit**. Choose your user name from the upper list (for example, *Users (Lisa/Users)*). If it is not present, choose **Add** to add it to the list. Then check **Full control** under **Allow** in the lower list, and choose **OK**. You choose to apply this automatically to all of the files and folders under `StrangeEons3` (including `plug-ins`).

**macOS**: Follow [Apple’s instructions for modifying file permissions](https://support.apple.com/en-ca/guide/mac-help/mchlp1203/mac). Make sure that you have read and write permission, and that you are the owner.

*If you made any changes during this step, try starting Strange Eons again to see if it corrects the problem.*

#### Step 4: If all else fails

If the above steps do not help, but the user folder did exist, you can try renaming or deleting the folder. Then try starting Strange Eons again (it will try to recreate the folder automatically). If it works, you will lose all preferences, installed plug-ins, and other customization.



