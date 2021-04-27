# Installation on other platforms

This page describes the steps needed to install Strange Eons on PCs based on various devices that support desktop Java.

**Note:** On most consumer Linux PCs, you can install Strange Eons with an easy to use Debian (DEB) package instead. [See this page for details.](um-install-linux.md)

## System requirements

**Strange Eons requires Java 8.** Adding support for newer versions is in progress, but not complete.

At least 2 GB of RAM recommended.

<!--

> Supporting Java 9+ is in progress. To run Strange Eons under Java 9+, you must include an argument declaring that the `.selibrary` file is an "agent". For example:
>
> ```bash
> java -Xmx2g -javaagent:./strange-eons.selibrary -cp ./strange-eons.selibrary strangeeons
> ```

-->

## Installation steps

1. [Download the latest version of Strange Eons for "other" systems.](http://cgjennings.ca/eons/download/update.html?platform=other) This version is packaged as a gzipped tarball (`.tar.gz`). Copy the archive to wherever you want to install it.

2. Unpack the tarball:

   ```bash
   cd {directory where you copied the file}
   tar -xzf strange-eons-b{XXXX}.tar.gz
   ```

3. This will extract a single file named `strange-eons.jar`. This file contains the main Strange Eons application and support tools. You can start Strange Eons with a command like the following:

   ```bash
   java -Xmx2g -cp strange-eons.jar strangeeons
   ```
   
   > **Important:** Currently, Strange Eons only works with Java 8 so ensure that that is the version you have installed. You can check with `java -version`, the reported version number should start with 1.8.
   
4. On many Unix-like systems, Strange Eons can integrate itself with the desktop environments to make it easier to start and to open saved files. To perform this step, run the following command:

   ```bash
   java -cp strange-eons.jar register
   ```

   For a list of additional options accepted by `register`, run it with the `--help` option. A few of the most important are:

   `--java` specify the path to the Java binary you wish to use (necessary if your main Java binary is the wrong version)

   `--allusers` to attempt to install for all users and not just yourself (typically requires root access, so run with `sudo` or `su`)

   `--uninstall` to undo a previous registration

   `--xdg` to specify the location of the `xdg-utils` used to complete the registration (see below)
   
   >The registration tool requires that you have the package `xdg-utils` installed. Recent builds of popular Linux distros should already include it, but if yours does not you can install it yourself. A typical command to do this is `sudo apt-get install xdg-utils`; check the documentation for your distro for more information.

## Troubleshooting

Installation problems are rare but frustrating. If unpacking the tarball or pack file fails, it usually means that the file did not download correctly. Try downloading it again. If it fails again, it may be corrupt on the server: [please report the issue](https://cgjennings.ca/contact.html).

For issues that occur after installation, refer to the [Troubleshooting](um-install-troubleshooting.md) page.
