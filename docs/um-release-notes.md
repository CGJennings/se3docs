# Release notes

## Next release

### Updates and changes

* Updated help links to point to new documentation site.
* Typeface viewer/insert character dialog:
  * highlight the following cell types using different colours: control characters, unassigned code points, code points not present in the selected font;
  * rows with no assigned Unicode code points are hidden;
  * enter a hexadecimal code point (e.g., `u+2c7e`) in the search field to go to that code point (or the nearest valid row).

### API changes

- Added `HSBPanel.setTitle`/`getTitle` to change `tintPanel` title label.
- Added `StrangeEons.getUrlForDocPage` to get a URL for a page in the se3docs site give its base file name (e.g., `"dm-preferences"`).
- Method `FillInPreferenceCategory.addHelp` no longer takes third argument (old code will still work).
- Deprecated `JHelpButton.setWikiPage`; this now forwards to `setHelpPage`.
- Removed `arkham.project.PluginWizard` (superseded by `PluginWizardDialog`).
- Removed deprecated `arkham.dialog.prefs.SBOrderedList`.
- Removed `PlatformSupport.isOSXMinorVersionAtLeast`, `isUsingAquaDerivedLookAndFeel`, `isUsingOSXSystemLookAndFeel`, `isUsingQuaquaLookAndFeel`.

### Bug fixes

* In the **Test Plug-in** dialog, only explicitly selected locales are passed to the test instance (entering a locale code directly in the text field had no effect).
* Script function `Console.printComponent` failed due to argument name mismatch.

