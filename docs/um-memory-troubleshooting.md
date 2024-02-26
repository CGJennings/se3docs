# Troubleshooting

## Not enough memory to complete the operation

This message indicates that Strange Eons is running out of memory. Memory is the temporary workspace that holds both the application and the data that the application works on, like the portrait images you load and the cards you create. When Strange Eons starts, a fixed limit is selected for the amount of memory it is allowed to use. This default limit depends on your platform.

When this message appears, you have two options: either use less memory at a time, or increase the maximum amount of memory allowed to Strange Eons. To use less memory at a time, close tabs that you do not need to have open. For example, if you are laying out a deck, just have the deck tab open and close any other files you are working on. You can also uninstall unused plug-ins, although most plug-ins don’t use much memory unless you are actually using their features. You may find it useful to install the **Developer Tools** plug-in (`eonscat:6574`) and then use the **Window/Memory Use** menu item. This will show you how much memory is being used at any given time so you can get a better idea of what is causing the problem.

### Increasing the memory limit

If you continue to run into this message, you should increase the memory available to Strange Eons by modifying the [Strange Eons VM options](um-install-command-line-options.md). Here are some example settings:

`-Xmx2g`
This sets the limit to 2&nbsp;GiB (gigabytes). This is *lowest recommended value* for running Strange Eons.

`-Xmx2028m`
Sets a 2048&nbsp;MiB (megabyte) limit. This is the same as the 2&nbsp;GiB option above.

`-Xmx3g`
This sets the limit to 3&nbsp;GiB (gigabytes). This should be acceptable if your system has 8&nbsp;GiB of system RAM.

`-Xmx4g`
This sets the limit to 4&nbsp;GiB (gigabytes). Try starting here if you have at least 16&nbsp;GiB of system RAM. This is usually plenty, but as long as you have more system memory you can increase it if needed. To avoid performance issues, don’t set the limit to more than about 40% of your total system RAM.

> Note that this is a *maximum limit*; Strange Eons will not use this much memory all of the time. 

