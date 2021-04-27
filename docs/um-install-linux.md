# Installation on Linux

This page describes the steps needed to install Strange Eons on desktop PCs running a common Linux distribution, such as Ubuntu.

## System requirements

A Debian package (`.deb`) is available for amd64 (64-bit Intel/AMD) devices. This includes a precompiled private Java runtime, ensuring that Strange Eons has a compatible runtime that will not interfere with any edition of Java you may have installed for general use. If your device is not compatible, see the instructions for [other devices](um-install-other.md) instead.

At least 2 GB of RAM is recommended.

## Installation steps

1. [Download the latest version of Strange Eons for Linux systems.](http://cgjennings.ca/eons/download/update.html?platform=nix) This version is provided as a Debian package (`.deb`).

2. On many systems, including [Chromebooks with the Linux feature enabled](https://support.google.com/chromebook/answer/9145439?hl=en), you can double click on the `.deb` file to install it. Otherwise, in a shell window, in the directory where you downloaded the file, run the following (replacing `{xxxx}` with the correct build number):

   ```bash
   dpkg -i strange-eons-linux-b{xxxx}.deb
   ```
   
3. An icon for Strange Eons should be added to your desktop launcher. Open it as you would any other application.

4. After installation, it is safe to delete the downloaded `.deb` package if you wish.

## Troubleshooting

Installation problems are rare but frustrating.

If unpacking the `.deb` package fails, it may mean that the file did not download correctly. Try downloading it again. If it fails again, it may be corrupt on the server: [please report the issue](https://cgjennings.ca/contact.html).

If the `dpkg` command is not available, your distribution may not have built-in support for Debian packages. If your distribution supports Red Hat Package Manager (`.rpm`) packages, you may be able to convert it using a tool called Alien. Look up how to install Alien on your system (if it is not already installed), then try converting and install the package with:

```bash
alien --to-rpm strange-eons-linux-b{xxxx}.deb
rpm -ivh strange-eons-linux-b{xxxx}.rpm
```

If your device does not support Debian packages, is not hardware compatible, or you just can't get this to work, you can instead try installing the version for [other devices](um-install-other.md).

For issues that occur after installation, such as failing to start at the splash screen, refer to the [Troubleshooting](um-install-troubleshooting.md) page.