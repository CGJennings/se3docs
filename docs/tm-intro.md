# Overview of localization

The process of adding support for multiple languages to a plug-in is called *localization* (also internationalization, translation). Strange Eons supports localization for both the main application and its plug-ins, although not all plug-ins are designed to support localization.

> In a computer program, a bit of text is often called a *string* (as in, *a string of letters*.). You will often see the terms "text" and "string" used interchangeably in this manual.

## How localization works

To prepare a plug-in for localization, the plug-in author must make it to refer to text *indirectly.* Instead of writing code that tells Strange Eons *print the word "'hello"*, the author will write something like *print the text for a greeting in the current language*. This process must be done for each bit of text that is needed, and so to tell them apart the plug-in author will assign each one a unique label called a *key*. The key is a placeholder that stands in for the final text, because the plug-in won't know what the final text is until the code is actually running (because the choice depends on which languages are active).

In order to make the text available to translators, the plug-in author will create a file to store the *default string values*. This file will list each key along with the default text that will be used for that key if a more specific translation isn't available. Usually the default strings are English (and things usually work better this way). However, no particular language is specified or required; it is simply "the default".

### Translation

Once the plug-in author has defined all the keys that they will use (and their default values), translation can begin. To start, the translator will add a default file *for the particular language* if one doesn't already exist. Then, using the [string table editor](dm-res-string-table.md), the translator can add a translation for each of the keys based on the text from the default translation. (The plug-in author can also add *comments* to the default string file that provide additional context for how the text of each key will be used.) Any key that is not translated in the language-specific file will *inherit* the value it has in the default translation.

Each translation is stored in a separate file. The file will have the same name as the file that stores the default strings, except that it will have a suffix added that indicates which language (and optionally, which regional dialect) the file is for. These files are called *string tables* by Strange Eons.

## Locales

The suffix added to different translations is called a *locale code*. A [locale code](tm-locales.md) combines a *language* with an optional *region* (the region is often called a *country*, though this is not always strictly correct). For example, *English* is a locale (with code `en`), as are the regional variants *Canadian English* (with code `en_CA`) and *Australian English* (with code `en_AU`).

> All language codes are written the lower case letters *a&ndash;z* while all region codes use the upper case letters *A&ndash;Z*. The character between them is an underscore (_). Locale codes can include other features not mentioned here, but they are not used with Strange Eons.

Just as undefined keys in a language-specific file inherit their value from the default translation, region-specific variants inherit from their base language. For example, consider this example set of string tables (the format is `key = value`):

```properties
# example.properties (default strings, in US English)
col-picker = Color picker
ok = OK
cancel = Cancel
```

```properties
# example_en.properties (English default, in UK English)
col-picker = Colour picker
# ok and cancel will just inherit the default value
```

```properties
# example_en_US.properties (US English)
# since the default strings use US English, just inherit everything
```

```properties
# example_fr.properties (French default)
col-picker = Sélecteur de couleur
cancel = Annuler
# ok is inherited from the default
```

## Interface versus game language

Strange Eons actually runs in two different languages (technically, locales) at once. The first is the *interface* (or UI) language, which is used for buttons, menus, dialog boxes, and other user interface elements. The second is the *game* language, which is used for text on game components. There are many good reasons to separate the two: the user might be translating a set of components, the game might not be available in the user's preferred interface language and so on. Because of this, the strings needed by a plug-in will usually be divided into at least two separate string tables: one for interface elements and one for game text.

> By default, the preferred game language will be the same as the interface language; the user can change this in [**Preferences**](um-ui-preferences.md).