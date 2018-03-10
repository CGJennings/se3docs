# Installation on other platforms

This page describes the steps needed to install Strange Eons on Linux-based PCs.

## System requirements

Strange Eons requires Java 8. It is strongly recommended that you install the official Oracle build for best performance.

At least 2 GB of RAM recommended.

## Installation steps

1. [Download the latest version of Strange Eons for "other" systems.](http://cgjennings.ca/eons/download/update.html?platform=nix) This version is packaged as a gzipped tarball (`.tar.gz`). Copy the archive to wherever you want to install it.

2. Unpacking is done in two steps. First, unpack the tarball. In a shell:

   ```bash
   cd {directory where you copied the file}
   tar -xzf strange-eons-nix-b{XXXX}.tar.gz
   ```

3. This will extract `README`, `unpack.jar`, and `strange-eons.selibrary.pack`. The file `unpack.jar` is a small Java application that will unpack the main file for use. Run it with:

   ```bash
   java -jar unpack.jar
   ```

4. If all goes well, the `.pack` file will be unpacked to `strange-eons.selibrary`. You can delete `unpack.jar`:

   ```bash
   rm unpack.jar
   ```

5. The `.selibrary` file that you unpacked is Strange Eons. The file is stored in a dual format: it is both a Strange Eons plug-in bundle and an archive that you can pass to Java in order to run Strange Eons and related tools. You can start Strange Eons with a command like the following:

   ```bash
   java -Xmx2g -cp strange-eons.selibrary strangeeons
   ```

6. Strange Eons can integrate itself with most desktop environments to make it easier to start and to open saved files. To perform this step, run the following command:

   ```bash
   java -cp strange-eons.selibrary register
   ```

   >To register for all users instead of yourself, try the `--allusers` option (run with `sudo`). The registration tool requires that you have the package `xdg-utils` installed. Recent builds of popular Linux distros should already include it, but if yours does not you can install it yourself. A typical command to do this is `sudo apt-get install xdg-utils`; check the documentation for your distro for more information. If needed, you can specify the location of `xdg-utils` with the `--xdg` option. (Use `--help` option for a complete list of options.)

   ​

