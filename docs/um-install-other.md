# Installation on other platforms

This page describes the steps needed to install Strange Eons on any device that supports *desktop* Java. At least 2 GB of RAM recommended.

**Note:** On most consumer Linux PCs, you can install Strange Eons with an easy to use Debian (DEB) package instead. [See this page for details.](um-install-linux.md)

## System requirements

**As of version 3.4, Strange Eons is built with and requires Java 11.** You may be able to get it to work in newer versions, as described below.

> **Java 16+**
>
> Due to how the script engine currently works, the command line argument `--illegal-access=permit` must be passed to Java for scripted plug-ins to function correctly. (This option is not as scary as it sounds.) Altogether this means a command line like the following:
>
> ```bash
>java -Xmx2g --illegal-access=permit -javaagent:strange-eons.jar -cp strange-eons.jar strangeeons --xDisableJreCheck
> ```

## Installation steps

1. [Download the latest version of Strange Eons for "other" systems.](http://cgjennings.ca/eons/download/update.html?platform=other) This version is a plain JAR file packaged as a gzipped tarball (`.tar.gz`). Copy the archive to wherever you want to install it.

2. Unpack the tarball:

   ```bash
   cd {directory where you copied the file}
   tar -xzf strange-eons-b{XXXX}.tar.gz
   ```

3. This will extract a single file named `strange-eons.jar`. This file contains the main Strange Eons application and support tools. You can start Strange Eons with a command like the following:

   ```bash
   java -Xmx2g -javaagent:strange-eons.jar -cp strange-eons.jar strangeeons
   ```
   
   > **Important:** Currently, Strange Eons requires Java 11 so ensure that that is the version you have installed. You can check with `java -version`. Strange Eons normally refuses to run if started with a different JRE (Java) version. You can bypass this check by adding `–xDisableJreCheck` to the command, but it will not magically fix any compatibility issues you may run into.
   
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

Installation problems are rare but frustrating.

If unpacking the tarball or pack file fails, it usually means that the file did not download correctly. Try downloading it again. If it fails again, it may be corrupt on the server: [please report the issue](https://cgjennings.ca/contact.html).

For issues that occur after installation, refer to the [Troubleshooting](um-install-troubleshooting.md) page.
