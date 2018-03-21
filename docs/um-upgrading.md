# Upgrading from Strange Eons 1 or 2

Upgrading from version 1 or 2 of Strange Eons is easy. Although settings and plug-ins from previous versions are not entirely compatible with the new version, Strange Eons 3 keeps these files in a separate place from previous versions so that there are no conflicts. For the most part, you can just download and install Strange Eons 3 with the [standard directions](um-getting-started.md).

## Don't panic!

When you run Strange Eons 3 for the first time, there are some glaring differences that might lead you to feel a bit lost initially. Keep reading! This section will help get you over the hump.

### What Happened to the Arkham Horror Stuff?

SE3 only creates a few basic kinds of components out of the box. Support for specific games is added separately by installing plug-ins. Choose the **Toolbox/Catalogue** menu item, then check the main Arkham Horror plug-in and choose **Download and Install**.

### Where are My Favourite Plug-ins?

Some plug-ins were never updated to work in SE3, some have had their functionality built into SE3. Some script-based plug-ins will continue to work if SE3 is run in compatibility mode (um-which it is by default, but you can change this in [Preferences](um-ui-preferences.md)). Here is an annotated list of SE2 plug-ins whose features are now part of SE3 or another plug-in:

<dl>
<dt>Image Resource Browser</dt>
<dd>This plug-in was used to explore the images that SE or plug-ins use internally. It is built in now: in an image selection dialog or component portrait panel, there will be a folder icon that opens a file chooser to select an image file. Shift+clicking this icon will open a dialog for browsing image resources.</dd>   <dt>Markup Bar</dt>
<dd>This plug-in creates a floating toolbar that helps with editing. This functionality has been improved and expanded in the new <strong>Context Bar</strong> feature.</dd>
<dt>Script Library Documentation Browser</dt>
<dd>Replaced by the improved <strong>Document Browser</strong>, which is found in the <strong>Help</strong> menu.</dd>
<dt>Silhouette Pack</dt>
<dd>These token shapes, and many more are now built in. (It is still possible to register additional shapes as required using a plug-in.)</dd>
<dt>Show Regions, Memory Monitor</dt>
<dd>Equivalents can be found in the Developer Tools plug-in.</dd>
<dt>Monster Expansions Symbols, Variable Health Investigators</dt>
<dd>Improved versions are now built into the Arkham Horror plug-in.</dd>
</dl>

## Migrating your preferences

When you run SE3 for the first time, it will detect the presence of an older Strange Eons installation (if any) and it will import compatible preference settings automatically. For this reason it is recommended that you install SE3 *before* uninstalling the previous version.

## Keeping both versions

It is possible to have both Strange Eons 3 and an older version installed on the same system simultaneously. You may wish to do this if a favourite plug-in hasn't been upgraded. However, be aware that once you save a file in Strange Eons 3, you won't be able to open it in the old version.