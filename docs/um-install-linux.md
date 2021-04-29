# Installation on Linux

This page describes the steps needed to install Strange Eons on desktop PCs running a common Linux distribution, such as Ubuntu.

## System requirements

Debian packages (`.deb`) are available for devices with 64-bit Intel/AMD (amd64) and ARM64 (arm64) processors. This includes a precompiled private runtime, ensuring that an existing Java installation does not interfere with Strange Eons. If your device's processor is not compatible with one of these packages, see the instructions for [other devices](um-install-other.md) instead.

At least 2 GB of RAM is recommended.

## Installation steps

1. [Download the latest version of Strange Eons for Linux systems.](http://cgjennings.ca/eons/download/update.html?platform=nix) This version is provided as a Debian package (`.deb`).

2. On many systems, you can double click on the `.deb` file to install it. Otherwise, in a shell window, in the directory where you downloaded the file, run the following (replacing `{arch}` and  `{xxxx}` with the correct architecture code (amd64/arm64) and build number):

   ```bash
   dpkg -i strange-eons-linux-{arch}-b{xxxx}.deb
   ```
   
3. An icon for Strange Eons should be added to your desktop launcher. Open it as you would any other application. You can also start Strange Eons from a shell with the command `strangeeons`.

4. After installation, it is safe to delete the downloaded `.deb` package.

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