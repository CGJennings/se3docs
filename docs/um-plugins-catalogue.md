# The plug-in catalogue

The plug-in catalogue, available from the **Toolbox/Catalogue** menu, is used to install and update plug-ins. When the opened, it connects to the Strange Eons Web site and downloads the latest catalogue. You can then browse the available entries and choose which plug-ins to install.

> If the catalogue fails to load, it may be due to a temporary network issue. *Try again later.* If you continue to have problems, you may need to adjust your [proxy settings](um-install-troubleshooting.md#proxy-settings).

To *view more information about a listing*, click on its entry in the list. A description of the plug-in will be shown in the information pane to the right.

To *install plug-ins*, check the boxes in their list entries, then choose **Download and Install**. Some plug-ins will display *installation notes*; click **Close** after reading them.

> Some plug-ins require other plug-ins to function; Strange Eons will handle installing these for you automatically.

To *update plug-ins to the latest version*, open the catalogue as above. Any plug-ins you have installed that have updates available will be preselected. Then choose **Download and Install**.

![plug-in catalogue dialog](images/catalog.png)

## Listing icons

The catalogue uses the following icons to help you identify the status of each plug-in:

|                  Plug‑in Icon                  |        [Core](um-plugins-intro.md#core) icon        | Description                                                  |
| :--------------------------------------------: | :-------------------------------------------------: | ------------------------------------------------------------ |
| ![icon](images/catalog/not-installed-new.png)  | ![icon](images/catalog/core-not-installed-new.png)  | **New:** not installed, and new or updated since you last checked the catalogue |
|   ![icon](images/catalog/not-installed.png)    |   ![icon](images/catalog/core-not-installed.png)    | **Not installed:** not installed, not new                    |
|  ![icon](images/catalog/update-available.png)  |  ![icon](images/catalog/core-update-available.png)  | **Update available:** a new version of this installed plug-in is available |
|     ![icon](images/catalog/up-to-date.png)     |     ![icon](images/catalog/core-up-to-date.png)     | **Up to date:** the latest version is installed              |
| ![icon](images/catalog/installed-is-newer.png) | ![icon](images/catalog/core-installed-is-newer.png) | **Future version:** the installed version is newer than the one in the catalogue (may be seen by plug-in developers, or if the catalogue information is wrong) |
|     ![icon](images/catalog/app-update.png)     |       ![icon](images/catalog/app-update.png)        | **Update required:** the app must be updated before this plug-in can be used |

## Filtering (searching) the listings

To *filter the displayed listings*, enter search terms in the field below the listings. The terms will be matched against the name, description, credits, and other fields and only those listings that match will be shown.

To *clear the filter and show all listings again*, delete the text in the filter field.

> A number of useful built-in filters are provided, such as filtering by game or plug-in type. You can access these by right clicking the filter field.
>

### Advanced filter syntax

The filter field accepts one or more *search tokens*. Search tokens are separated from each other by commas and/or spaces. (When making an [`eonscat` link](um-plugins-eonscat.md), avoid using spaces.) A token is normally matched against the `name`, `description`, `credits`, `tags`, `core`, `id`, and `comment` keys in the [catalog listing data](dm-eons-plugin.md) assigned by the plug-in developer. To match against a specific key, start the search token with the key name and an equals sign. For example, the token `game=AH` matches the `game` key against the token `AH`. If a token starts with an exclamation mark, as in `!game=AH`, then it will *exclude* matching plug-ins from the results.

Normally, a token matches the value of a key if it occurs anywhere inside it. However, when matching the `game` key, the token must match the entire value. Matching is not case-sensitive. The following wildcards are allowed in tokens: `*` to match any text except spaces, and `.` to match a single letter.

## ⚠️ For plug-in developers

### Submitting plug-ins

Plug-in developers can submit their own plug-ins for inclusion. At the moment, the easiest way to get started is through this [contact form](https://cgjennings.ca/contact.html). The plug-in's catalogue listing information is prepared using the [root file editor](dm-eons-plugin.md). To test how your listing will appear, you can use the catalogue tools included with the **Developer Tools** plug-in (`eonscat:6574`).

### Private catalogues

Developers can create their own private catalogues. To display a private catalogue's listings, paste its base URL into the address bar at the top of the dialog and press <kbd>Enter</kbd>. Private catalogues can be prepared using the catalogue tools (see above).

### Clearing cached listings

The standard catalog is cached for a few hours for efficiency. This rarely causes problems, but you can bypass the cache by clicking in the address bar and pressing <kbd>Enter</kbd>.
