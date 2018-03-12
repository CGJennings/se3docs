# ⚠️ Portable installations

A portable installation is one that can move from one computer to another without having to install the app on the new computer. For example, you might want to be able to run Strange Eons off of a flash drive using computers in a public lab.

There is no official portable installation of Strange Eons, but it should be possible to create one with a little work. This section outlines the steps. The instructions are aimed at Windows as it has the most complex install process, but the basic idea could be applied to other platforms.

You need three things to run Strange Eons:

1. The app itself.
2. A Java Runtime Environment (JRE).
3. A [user folder](um-user-folder.md) for storing plug-ins and preferences.

To get the app, you can run the installer normally and then grab the contents of the installation folder, which on Windows is typically `%PROGRAMFILES%\StrangeEons`.

The app requires a JRE with a very specific version range. If you don't have Java installed, or don't have an acceptable version installed, the installer will download and install a *private* JRE inside the installation folder. You can tell if this is the case because the installation folder will contain a `jre` subfolder. If that's there, you should be good to go. Otherwise you can create a `jre` folder and copy the existing JRE installation into it (ensure that you end up with `jre\bin` and `jre\lib` subfolders). Failing that, you can uninstall Java from your computer, then reinstall Strange Eons, and you should end up with a `jre` folder in the new installation.

Copy the installation folder, including the private JRE, to your flash drive or other destination. (You do not need the contents of the `.install4j` subfolder.) You should now be able to run Strange Eons directly from the copy by double clicking `StrangeEons\bin\strangeeons.exe`.

The new copy runs but it will still try to store plug-ins and settings in your user profile (home directory). The next step is to create a new, portable user folder. Create the folder `StrangeEons\user` in your destination. If you have existing preferences or plug-ins you want to transfer, [copy the contents](um-user-folder.md) of your user folder into this new folder.

To get Strange Eons to use this new user folder you need to set an environment variable before running it. Create a text file `StrangeEons\run.cmd` with the following contents:

```bash
set STRANGE_EONS_USER_DIR=%CD%\user
bin\strangeeons
```

That should do it. To start the portable version, double click on `run.cmd`.