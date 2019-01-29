# Default abbreviation table resources

When adding a new game, you may also wish to define a default table of [abbreviations](um-gc-abbreviations.md) so that users can insert stock phrases with a few keystrokes. This not only speeds up component development, but it helps ensure consistent wording and styling.

When an abbreviation table is required, Strange Eons uses the [AbbreviationTableManager](assets/javadoc/ca/cgjennings/apps/arkham/editors/AbbreviationTableManager.html) class to load it. This first looks for a custom table defined by the user. If none is found, it looks for a default table in the `abbrev` resource folder, under the name `game-XX.settings`, where `XX` is the code of the relevant game.

Abbreviation tables use the same format as other [settings files](dm-res-settings.md): the keys are the abbreviations and the values are their matching expansions. For example:

```properties
ho = Make a <b>Horror ($|-1|$) check</b>.
ip = If you pass, $|effect|$
```

See the main article for [Abbreviations](um-gc-abbreviations.md) for an explanation of the special codes used in abbreviation expansions.

## Using the abbreviation table editor to create the file

To use the abbreviation table editor to create your default table, open the editor (choose the **Markup|Abbreviations**) and select your game. Changes that you make here will be saved to the `abbrev` subfolder of the [user folder](http://basement.cgjennings.ca/User+Folder), using the same file naming convention. This means that when you are done editing you can simple copy this file into your plug-in’s `abbrev` folder.