# ⚠️ Portable installations

A portable installation is one that can move from one computer to another without having to install the app on the new computer. For example, you might want to be able to run Strange Eons off of a flash drive using computers in a public lab.

There is no official portable installation of Strange Eons, but it should be possible to create one with a little work. This page outlines the steps. The instructions are aimed at Windows as it has the most complex install process, but the basic idea could be applied to other platforms.

You need three things to run Strange Eons:

1. The app itself.
2. A Java Runtime Environment (JRE).
3. A [user folder](um-install-user-folder.md) for storing plug-ins and preferences.

To get the app, you can run the installer normally and then grab the contents of the installation folder, which on Windows is typically `%PROGRAMFILES%\StrangeEons`.

Copy the installation folder to your flash drive or other destination. This must include the `bin` and `jre` subfolders; you won't need the contents of the `.install4j` subfolder so you can skip that. You should now be able to run Strange Eons directly from the copy by double clicking `strangeeons.exe` in the `StrangeEons\bin` folder of your copy.

So far the new copy will still try to store plug-ins and settings in your user profile (home directory). The next step is to create a new, portable user folder. Create the folder `StrangeEons\user` in your destination. If you have existing preferences or plug-ins you want to transfer, [copy the contents](um-install-user-folder.md) of your user folder into this new folder.

To get Strange Eons to use this folder you need to set an environment variable before running it. Create a text file `StrangeEons\run.cmd` with the following contents:

```bat
@echo off
set STRANGE_EONS_USER_DIR=%CD%\user
bin\strangeeons
```

That should do it. To start the portable version, double click on `run.cmd`.