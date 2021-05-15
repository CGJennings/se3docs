# Command line options

Advanced users can start *Strange Eons* using command line options that customize its behaviour or performance. This page lists the options available and describes how to start the application with command line options on different platforms. Note that if the options listed here are out of date, you can use the `--help` option for updated information.

There are three kinds of command line options that can be used with Strange Eons: standard options, non-standard options, and VM options. Standard options are used to configure and control Strange Eons. Non-standard options also modify Strange Eons, but they are used to control experimental features or work around specific issues. Non-standard options can come and go from version to version. VM options are used to control the virtual machine that Strange Eons runs in. They can be used to do things like increase the maximum amount of memory that it is allowed to use.

## Standard options

Each option must be prefixed with either one or two hyphens (`-` or `--`). Options that don't begin with a hyphen are treated as the names of files to be opened. Standard option names are not case sensitive.

`--version`
Prints the version number to the console and then exits.

`--help`
Prints information about command line options and then exits.

`--glang locale`
Sets the game language to the given locale, such as `en_CA` for Canadian English.

`--ulang locale`
Sets the game language to the given locale.

`--plugintest bundlefile`
Runs the application in [plug-in test mode](dm-test-plugin.md) in order to test the specified plug-in bundle file. The bundle will be loaded as if it were the plug-in folder. This is usually used indirectly, by using the [**Test Plug-in** project command](dm-test-plugin.md). Multiple bundles can be listed by separating them with the path separator character (`;` on Windows, `:` elsewhere).

`--resetprefs`
Resets user preferences to their default values.

`--migrateprefs`
Migrates compatible preferences from Strange Eons 1 or 2, if available. This normally happens automatically when SE3 is run for the first time; this option forces the migration to be run again, overwriting any options that have changed in the meantime.

`--loglevel level`
Sets the minimum logging level. This determines the level of detail used to report certain events, for debugging or informational purposes. Possible levels include `OFF`, `SEVERE`, `WARNING`, `INFO`, `CONFIG`, `FINE`, and `ALL`.

`--resfolder path`
Adds the files in the specified path to the application as if they were internal resources.

`--run scriptfile`  
Starts the app in [non-interactive script running mode](um-run-script.md).

## Non-standard options

Non-standard options are set just like standard options, but they can change from version to version. These option names all start with `x`.

`--xAAText aatype`  
Sets which [text anti-aliasing mode to use](um-install-troubleshooting.md#text-quality-issues). Used to correct text quality issues.

`--xDebugException`
Causes a fatal startup error. Used for testing.

`--xDisableProjectRestore`
Prevents Strange Eons from trying to re-open the project that was open when the app was last used. This is useful if a problem with this folder is preventing the app from starting.

`--xDisableFileRestore`
Prevents Strange Eons from trying to re-open the files that were being edited when the app was last used. This is useful if a problem file is preventing the app from starting.

`--xDisableFilterThreads`
Disables the use of multiple threads to improve graphics filter performance on multicore CPUs.

`--xDisableBackgroundInit`
Disables the use of multiple threads to start the app faster.

`--xDisableAnimation`
Disables interface animation effects.

## VM options

VM options allow you to control the Java virtual machine that Strange Eons runs within. The most commonly needed VM option is `-Xmx`, which lets you set the maximum amount of memory that Strange Eons is allowed to use. For example, `-Xmx2g` sets the limit to 2 gigabytes. VM options are set differently from regular options, as described below.

## Setting command line options

Command line options are specified in different ways, depending on the platform.

### On Windows

Open a command prompt by pressing <kbd>Windows</kbd>+<kbd>R</kbd>, then typing `cmd` and pressing <kbd>Enter</kbd>. Then change to the SE install directory by entering:

```bash
cd "%programfiles%/StrangeEons/bin"
```

You can then start SE with a second command of the form:

```bash
strangeeons [options...]
```

where `[options...]` is the list of options you want to use, separated by spaces. For VM options, you must put `-J` in front of the option name (for example, `-J-Xmx1200m`).

To use the same options every time you run Strange Eons, right click on the shortcut icon that you use to start Strange Eons and choose **Properties**. Look for the field labelled **Target**. In this field you will find something like `"C:\Program Files\Strange Eons\bin\strangeeons.exe"`. Edit this by adding a space, then the list of options you wish to set (all after the `.exe"`).

### On macOS

Open **Terminal** and use a command of the following form to run Strange Eons with command line options:

```bash
open "/Applications/Strange Eons.app" --args [options...]
```

where `[options...]` is the list of options you want to use, separated by spaces. For VM options, you must put `-J` in front of the option name. To change the VM options permanently, right click the app icon in **Finder** and choose **Show Package Contents**. In the folder that opens, navigate into `Contents`, then open the `Info.plist` file, and find the appropriate entry.

### On Linux and other platforms

When starting the app from the command line, use the following template:

```bash
java [vmoptions...] -cp strange-eons.jar strangeeons [options...]
```

Replace `[vmoptions...]` with the list of desired VM options, and `[options...]` with list of desired app options. Note that SE needs a limit of at least 1 GB of memory to run correctly (more is better), so at a minimum you should include a VM option like `-Xmx2g`. If the location of the java binary is not included in the path, you will need to replace `java` with the complete path to the Java binary.
