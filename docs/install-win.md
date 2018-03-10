# Installation on Windows

This page describes the steps needed to install Strange Eons on Windows-based PCs.

## System requirements

One of Windows 7 SP1, Windows 8, Windows 10

At least 2 GB of RAM recommended.

A 64-bit processor (and 64-bit version of Windows) are recommended.

Before installing, it is a good idea to make sure that you have installed the latest graphics drivers for your graphics card. Check the support section of the Web site for your computer or graphics card manufacturer.

## Installation steps

1. [Download one of the Windows installers](http://cgjennings.ca/eons/download/update.html?platform=win): the 64-bit version if you have 64-bit Windows; otherwise the 32-bit version.
2.  Start the installer by double-clicking it in your downloads folder or opening it from your Web browser.
3. An installation wizard will guide you through the rest of the process. If you are not sure what to do, stick with the default options.

## Troubleshooting

Installation problems are rare but frustrating. If the installer fails to start or reports a corrupt file, it usually means that the file did not download correctly. Try downloading it again.

### Graphics issues

Some Windows machines have weird graphics glitches when running Strange Eons, such as bits of the interface not being drawn or being drawn in the wrong place. If this happens to you, try these steps:

1. Update your graphics driver to the latest version. Once installed and the the computer reboots, try starting Strange Eons again.
2. If your computer has two graphics chipsets (one power saving and one high performance), make sure Strange Eons uses the high performance chip.
3. Right click on the shortcut icon that you use to start Strange Eons and choose **Properties**. Look for the field labelled **Target**. In this field you will find something like `"C:\Program Files\Strange Eons\bin\strangeeons.exe"`. Edit this by adding a space, then the following (all after the `.exe"`):
   `-J-Dsun.java2d.ddoffscreen=false`
   Click **OK** and try running the app again.
4. The option above seems to do the trick for most people, but i f that doesn't work, you can also try adding the following in various combinations to see if you can find one that works (put a space between each extra option, as well as between the options and the end of the `.exe"` bit):
   `-J-Dsun.java2d.opengl=true`
   `-J-Dsun.java2d.d3d=false`