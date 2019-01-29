# String table resources

**File extension:** `.properties`

A string table stores translated text so that a plug-in, game component, or other feature can be used with different languages. A single collection of translatable strings is split over multiple files: one for the default translation (which is ideally English), and one for each translation.

To *add a new string table*, right click in a project resource folder and choose **New|String Table**.

To *add a new translation to a string table*, right click one of the files in the translation and choose **Add Locale**. The name of the new string table file will be the same as the name of the base file containing the default strings but with the locale name concatenated to the end (such as `example.properties` and `example_fr.properties`).

The default strings are defined using the [code editor](dm-code-editor.md). The format of the file is the same as that of [settings resource files](dm-res-settings.md). The “setting name” in a string table is the key used to look up the translated string, while the value is the default value that will be returned when no suitable translation is found.

Translations are edited using the string table editor, which lists the keys defined in the base string table on the left side, and their default and translated values on the right. Keys not yet translated for the edited locale will be listed in grey. Keys that have been added in a translation that do not appear in the base string table are listed in dark orange.

![The string table editor](images/string-table-editor.png)

To *translate a string*, choose its key in the key pane. Read the default value (or base language value when adding a regional translation), then enter or edit the translation in the Language (or Region) field.

String tables are loaded and accessed using the `Language` class.

For more information on string tables and localization, refer to the [Translation Manual](tm-index).