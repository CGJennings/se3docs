# Testing a translation

Once you have made progress on a translation, you will want to test the result. The instructions on this page should help, but plug-in authors have the freedom to do things many different ways. If you have problems, try contacting them for suggestions. Note that the **Test Plug-in** method described below should work with any plug-in; if it doesn't then there is a problem with the plug-in.

## Plug-ins that use the Language class

If the plug-in you are testing works by adding your string table to the global string table using the [Language](assets/javadoc/resources/Language.html) class, then in most cases you can test it quickly by following these steps:

1. Save any open tabs that are being used to edit the string table. (You can use <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd> to save all open tabs with unsaved changes.)
2. Right click on the string table in the project view and choose **Merge Strings Into** and the appropriate target (**Interface Language** or **Game Language**).
3. Start/create the thing you want to test. For example, if testing a translation for a game component, create a new component of that kind.
4. Observe the result and make any necessary changes to the string tables.
5. Close the test item you started/created.
6. Repeat from (1) as needed.

> It may not be necessary to close and recreate a new test item. For example, if testing the text on a game component it may be enough to change one of the editing controls in order to force the preview to update.

## Using the Test Plug-in action

The [**Test Plug-in** project action](dm-test-plugin.md) is useful if you are having trouble testing the plug-in any other way, or if you want to test a different locale than the one you are currently running in. It starts a separate test instance of Strange Eons that will load your modified plug-in automatically. Before starting the test, you can choose any locales you want for both the game and interface language to be used for testing.

To *test a plug-in task folder with modified string tables*, right click on the task folder and choose **Test Plug-in**.