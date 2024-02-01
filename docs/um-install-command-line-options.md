# Command line options

*Strange Eons* has command line options for advanced users. They change how it works or runs. This page shows the options and how to use them on different platforms. If the options don’t match your version, use the `--help` option to see the current ones.

There are three types of command line options: standard, non-standard, and VM. Standard options set up and manage Strange Eons. Non-standard options are for testing or fixing things. They may change in different versions. VM options control the *virtual machine* that runs Strange Eons. They can do things like give it more memory.

## Standard options

Options must start with `-` or `--`. Other arguments are file names to open. Options can be any case: `--version` and `--Version` do the same thing.

`--version`  
Prints the version number and exits.

`--help ` 
Prints information about the standard command line options and then exits.

`--glang locale ` 
Sets the game language to the given locale, such as `en_CA` for Canadian English. (The preferred language for game components such as cards.)

`--ulang locale ` 
Sets the user interface language to the given locale. (The preferred language used for windows, menus, buttons, and so on.)

`--pluginTest bundlefile`  
Starts the app in [plug-in test mode](dm-test-plugin.md) to test the specified plug-in. The bundle will be loaded as if it were installed in the plug-in folder. Multiple bundles can be listed by separating them with `;` on Windows, `:` on other platforms. You can also test plug-ins with the [**Test Plug-in** project command](dm-test-plugin.md).

`--resetPrefs ` 
Resets user preferences to their default values.

`--logLevel level ` 
Sets the minimum logging level. This determines the level of detail used to report certain events, for debugging or informational purposes. Possible levels include `OFF`, `SEVERE`, `WARNING`, `INFO`, `CONFIG`, `FINE`, and `ALL`.

`--resFolder path`  
Adds the files in the specified path to the application as if they were internal resources. (They can be loaded from `res://` URLs.)

`--run scriptfile`  
Starts the app in [non-interactive script running mode](um-run-script.md).

## Non-standard options

Non-standard options are set just like standard options, but they change from version to version, and are usually only useful in specific circumstances. They all start with `x`.

**Startup options**

*If you are [having trouble](um-install-troubleshooting.md) getting a previously working Strange Eons edition to start, or it is starting slowly, these options can be used to work around or investigate the cause.*

`--xDisableProjectRestore`  
Prevents Strange Eons from trying to re-open the project that was open when the app was last used. This is useful if a problem with this folder is preventing the app from starting.

`--xDisableFileRestore`  
Prevents Strange Eons from trying to re-open the files that were being edited when the app was last used. This is useful if a problem file is preventing the app from starting.

`--xDisablePluginLoading`  
Prevents Strange Eons from from trying to load any plug-ins. This is useful to diagnose if a bad plug-in is causing a problem.

`–xDisableJreCheck`   
Strange Eons needs a certain Java version to run. If you use a different Java version, it may cause unexpected problems. So, if the version is wrong, Strange Eons shows an error message and stops. Usually, this is fine, because it comes with its own Java of the right version. This option lets you skip that check, which is good for developers or if you want to try running the app from a JAR file with your device’s default Java installation.

**Graphics options**

*These options override how Strange Eons optimizes graphics performance by default. They can be useful to correct issues or improve performance.*

`--xAAText aatype`  
Sets which [text anti-aliasing mode to use](um-install-troubleshooting.md#text-quality-issues). Used to correct on-screen text quality issues. This has no effect when printing or exporting.

`--xDisableAnimation ` 
Disables animation effects. This may be useful on low performance systems, or for accessibility reasons.

`--xDisableAcceleration`  
Disabled graphics acceleration. On most platforms (but not Windows), your graphics card is used to improve drawing performance. In some cases that may cause strange drawing issues, like black rectangles or bits of the window being drawn in the wrong place. This should fix those issues.

`--xEnableAcceleration`  
Enables graphics acceleration on platforms where it is disabled by default. Currently this means Windows, because it doesn’t work with so many graphics cards. Trying this option might improve performance on your Windows installation.

`--xOpenGL`  
Causes Strange Eons to use OpenGL for graphics acceleration instead of a native library, if OpenGL is available. If you have problems with graphics acceleration, you might try this option before disabling acceleration altogether.

**Development and debugging options**

*These options are normally only of interest if you are working on the Strange Eons source code, or trying to diagnose specific problems.*

`--xDisableStartupThreads`  
Disables the use of multiple threads to help start the app faster on multicore CPUs.

`--xDisableFilterThreads`  
Disables the use of multiple threads to improve graphics filter performance on multicore CPUs.

`--xDisableSystemMenu`  
On macOS, the Strange Eons menu appears at the top of the screen like other Mac applications. Setting this option makes the menu part of the app window like it is on other platforms.

`--xMigratePrefs`  
Migrates compatible preferences from Strange Eons 1 or 2, if available. This normally happens automatically when SE3 is run for the first time; this option forces the migration to be run again, overwriting any options that have changed in the meantime.

`--xDebugException`  
Causes a fatal error during start-up. This exists only to test that Strange Eons handles an error during startup correctly.

## VM options

VM options allow you to control the Java virtual machine that Strange Eons runs within. The most commonly needed VM option is `-Xmx`, which lets you set the maximum amount of memory that Strange Eons is allowed to use. For example, `-Xmx2g` sets the limit to 2 gigabytes. VM options are set differently from regular options, as described below.

## Setting command line options

Command line options are specified in different ways, depending on the platform.

### On Windows

**From the shortcut icon**

To use the same options every time you run Strange Eons, right click on the shortcut icon that you use to start Strange Eons and choose **Properties**. Look for the field labelled **Target**. In this field you will find something like `"C:\Program Files\Strange Eons\bin\strangeeons.exe"`. Edit this by adding a space, then the list of options you wish to set (all *after* the `.exe"` part).

**From the command line**

Open a command prompt by pressing <kbd>Windows</kbd>+<kbd>R</kbd>, then typing `cmd` and pressing <kbd>Enter</kbd>. Then change to the SE install directory by entering:

```bash
cd "%programfiles%/StrangeEons/bin"
```

Starting with build 4198, you can then start SE with a separate command of the form:

```bash
eons [options...]
```

where `[options...]` is the list of options you want to use, separated by spaces. For VM options, you must put `-J` in front of the option name (for example, `-J-Xmx4g`).

The `eons` application will launch the app without detaching it from the console mode. This makes Strange Eons behave more like a command line program. Console output such as log messages will be printed to the console window, and the shell will be blocked until the app exits.

### On macOS

Open **Terminal** and use a command of the following form to run Strange Eons with command line options:

```bash
open "/Applications/Strange Eons.app" --args [options...]
```

where `[options...]` is the list of options you want to use, separated by spaces. For VM options, you must put `-J` in front of the option name. To change the VM options permanently, right click the app icon in **Finder** and choose **Show Package Contents**. In the folder that opens, navigate into `Contents`, then open the `Info.plist` file, and find the appropriate entry.

### On Linux and other platforms

**From the command line**

Use this template to start the app:

```bash
java [vmoptions...] -javaagent:strange-eons.jar -cp strange-eons.jar strangeeons [options...]
```

`[vmoptions...]` are VM options and `[options...]` are app options. SE needs at least a 1 GB memory limit, more is better, so a VM option like `-Xmx2g` is recommended. If `java` is not on the path, use its full location.

**From the desktop**

If you installed the app to the desktop, you should have a desktop entry file. This is normally stored in `~/.local/share/applications`. Open the file in your favourite text editor and edit the `Exec` entry to add the desired options. Depending on how the desktop entry was created, the `Exec` entry may start with a `java` or a `strangeeons` executable. If it starts with `java`, use the command template above. Otherwise, add regular app options normally and specify VM options by putting `-J` in front of them, as in `-J-Xmx4g`.