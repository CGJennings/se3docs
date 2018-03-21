# Project file types

## Common project files
|                       Icon                       | Type                   | Extension(s)           | Notes                                                        |
| :----------------------------------------------: | ---------------------- | ---------------------- | ------------------------------------------------------------ |
|  ![eon-default](images/project/eon-default.png)  | Game component or deck | `.eon`                 |                                                              |
|       ![copies](images/project/copies.png)       | Copies file            | exact name `copies`    | describes the number of copies of a component to include in a deck when [making it automatically](um-proj-deck-task.md#making-a-deck-automatically) |
|        ![table](images/project/table.png)        | CSV table              | `.csv`                 | source data for a [**CSV Factory**](um-proj-csv-factory.md)  |
|       ![script](images/project/script.png)       | Script code            | `.js`                  | to *run the script*, right click on it and choose **Run**    |
|         ![auto](images/project/auto.png)         | Automation script      | `.ajs`                 | a script meant to [automate some task](um-proj-automation.md); runs when double clicked, to *edit the script*, right click on it and choose **Open** |
|          ![zip](images/project/zip.png)          | ZIP archive            | `.zip`                 | requires the Zip Tools plug-in `eonscat:fd53`                |
|       ![folder](images/project/folder.png)       | Folder                 |                        | a plain (non-task) folder                                    |
|         ![mt00](images/project/mt00.png)         | Task folder            |                        | an additional graphic is overlaid on the circle to indicate the task type; this graphic can be [customized](um-proj-intro.md#basic-project-file-management) |
|    ![deck-task](images/project/deck-task.png)    | Deck of Cards task     |                        | [collects a group of related game components](um-proj-deck-task.md) |
|     ![doc-task](images/project/doc-task.png)     | Documentation task     |                        | [used to store rules, notes, or other documentation](um-proj-doc-task.md) |
| ![factory-task](images/project/factory-task.png) | Factory task           |                        | [used to generate game components automatically from data or code](um-proj-factory-task.md) |
|  ![plugin-task](images/project/plugin-task.png)  | Plug-in task           |                        | [used to develop new plug-ins](um-proj-plugin-task.md)       |
|         ![task](images/project/task.png)         | Generic task           |                        | [a general purpose task folder](um-proj-generic-task.md)     |
|   ![task-group](images/project/task-group.png)   | Task group             |                        | [a task that can contain other tasks](um-proj-intro.md#adding-tasks) to group them together |
|      ![project](images/project/project.png)      | Project                | folder or `.seproject` | the root folder of a [project](um-proj-intro.md); contains all other project content |

### Formatted text documents

|               Icon               | Type                      | Extension(s)                            | Notes                                                        |
| :------------------------------: | ------------------------- | --------------------------------------- | ------------------------------------------------------------ |
|  ![doc](images/project/doc.png)  | Plain text                | `.txt`                                  |                                                              |
| ![html](images/project/html.png) | Hypertext markup language | `.html`, `.htm`                         | to *edit*, double click to **Open**; to *view* right click and choose **Browse** |
|  ![css](images/project/css.png)  | Cascading style sheet     | `.css`                                  | used by HTML files to declare how content should be presented |
|  ![doc](images/project/doc.png)  | Miscellaneous             | `.doc`, `.docx`, `.rtf`, `.wpd`, `.odt` | recognized as documents; double click to open in default application on your system |

### Images

To *convert or optimize a bitmap image*, right click and choose **Convert To/PNG**, **Convert To/JPEG**, or **Convert To/JPEG2000**. Adjust the quality and scan settings as desired, then choose **Convert**.
|                       Icon                       | Type           | Extension(s)    | Notes                                                        |
| :----------------------------------------------: | -------------- | --------------- | ------------------------------------------------------------ |
|        ![image](images/project/image.png)        | JPEG           | `.jpg`          | widely supported [lossy bitmap image format](https://cgjennings.ca/articles/jpeg-compression.html); does not support transparency |
|        ![image](images/project/image.png)        | JPEG2000       | `.jp2`          | lossy or lossless bitmap format commonly used in plug-ins to retain quality and reduce size |
|        ![image](images/project/image.png)        | PNG            | `.png`          | widely supported lossless bitmap image format                |
|                                                  | Windows Bitmap | `.bmp`, `.gif`  | widely supported legacy format                               |
|                                                  | GIF            | `.bmp`, `.gif`  | widely supported obsolete format                             |
|                                                  | Photoshop      | `.psd`          | to *convert to a regular bitmap image*, double click to **View** then choose **Save As** |
| ![vector-image](images/project/vector-image.png) | SVG            | `.svg`, `.svgz` | requires core component; limited support, always converted to fixed bitmap internally |


## Plug-in files

### Code
|                 Icon                 | Type               | Extension(s) | Notes |
| :----------------------------------: | ------------------ | ------------ | ----- |
| ![script](images/project/script.png) | Script source code | `.js`        |       |
|   ![java](images/project/java.png)   | Java source code   | `.java`      |       |
|  ![class](images/project/class.png)  | Compiled Java code | `.class`     |       |

### Data

| Icon                                         | Type                   | Extension(s)             | Notes                                              |
| -------------------------------------------- | ---------------------- | ------------------------ | -------------------------------------------------- |
| ![root](images/project/root.png)             | Plug-in root           | exact name `eons-plugin` | tells Strange Eons how to load the plug-in         |
| ![classmap](images/project/classmap.png)     | Class map              | `.classmap`              | used to add new game component types               |
| ![properties](images/project/properties.png) | String table           | `.properties`            | stores translated text for a specific locale       |
| ![settings](images/project/settings.png)     | Settings               | `.settings`, `.txt`      | stores settings that control game component layout |
| ![sil](images/project/sil.png)               | Silhouette definitions | `.silhouettes`           | used to add new shapes to the token editor         |
| ![tiles](images/project/tiles.png)           | Tile definitions       | `.tiles`                 | used to add new objects to the deck editor         |

### Fonts

To *examine a font*, double click on it.

|               Icon               | Type              | Extension(s)   | Notes                 |
| :------------------------------: | ----------------- | -------------- | --------------------- |
| ![font](images/project/font.png) | TrueType/OpenType | `.ttf`, `.otf` | preferred font format |
| ![font](images/project/font.png) | PostScript Type 1 | `.pfa`, `.pfb` |                       |

### Plug-in bundles

Plug-in bundles store the entire contents of a plug-in in a single file. This is the form in which plug-ins are normally stored and used by Strange Eons.

To *edit the contents of a plug-in*, right click on the bundle and choose **Import** to convert the bundle into a plug-in task.

|                        Icon                        | Type                     | Extension(s)           | Notes                                                        |
| :------------------------------------------------: | ------------------------ | ---------------------- | ------------------------------------------------------------ |
|        ![plugin](images/project/plugin.png)        | Plug-in bundle           | `.seplugin`            | most often used to add new app features                      |
|     ![extension](images/project/extension.png)     | Extension plug-in bundle | `.seext`               | most often used to add new game component types; loaded during app startup and cannot be reloaded |
|         ![theme](images/project/theme.png)         | Theme bundle             | `.setheme`             | defines an alternate user interface theme                    |
|    ![packed-bundle](images/project/library.png)    | Library bundle           | `.selibrary`           | adds code or resources to Strange Eons but does not itself define any plug-ins |
| ![packed-bundle](images/project/packed-bundle.png) | Packed bundle            | `.pbz`, `.pgz`, `plzm` | a highly compressed plug-in bundle; this is how plug-ins are downloaded from the [catalogue](um-plugins-catalogue.md) |

## Special purpose file types

### Document browser collections

| Icon                                         | Type                | Extension(s)  | Notes                                                   |
| -------------------------------------------- | ------------------- | ------------- | ------------------------------------------------------- |
| ![collection](images/project/collection.png) | Document collection | `.collection` | defines the documents that make up a browser collection |
| ![idx](images/project/idx.png)               | Search index        | `.idx`        | index for a document browser collection                 |

### Spelling dictionaries

|                     Icon                     | Type                   | Extension(s) | Notes                                               |
| :------------------------------------------: | ---------------------- | ------------ | --------------------------------------------------- |
| ![dict-3tree](images/project/dict-3tree.png) | Pruned ternary tree    | `.3tree`     | spelling word dictionary                            |
|   ![dict-cpl](images/project/dict-cpl.png)   | Compressed prefix list | `.cpl`       | spelling word list with optional simple compression |
