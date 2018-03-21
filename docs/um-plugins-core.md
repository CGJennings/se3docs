# Core components

A core component is a special plug-in that is needed for Strange Eons to provide full functionality. Strange Eons will work without these plug-ins, but some features will be incomplete or unavailable. Core components are large but they don't change often. By separating them, app updates are faster and use less bandwidth.

## Installing core components

When you first run Strange Eons, and again after each update, you will be prompted to check the plug-in catalogue for updates. This ensures core components are kept up to date, but if you prefer you can [manage them manually](um-plugins-intro.md) just like any other plug-in.

## Missing plug-ins

Occasionally Strange Eons may open a window stating that an additional plug-in is required to continue. Such plug-ins are generally called core components, although that name is not always accurate. In many cases, one plug-in simply depends on some resources that are stored in another plug-in.

Choose **Download and Install** to install the required plug-in and continue. You can also check the option to automatically install these in the future, without asking first.

![missing plug-in dialog](images/missing-core.png)

## List of core components

### Core Typefaces

A baseline set of fonts. The most important of these is the *default body font* used for serif text on game components. When this core is installed, components that use this font will look the same on all platforms. Without it they will substitute a platform-specific fallback.

### Spelling Dictionaries

Dictionaries for several common languages, including English. Without this, spelling checking is disabled.

### PDF Support

Provides basic support for creating PDF files from game components and decks. When installed, the **Print** command will include a **Save as PDF** option.

### SVG Image Support

When installed, game components and plug-ins can use SVG images.

### API Documentation

When installed, the **Document Browser** will include information on the full Strange Eons API for plug-in developers. Without it, only documentation for the scripting libraries is available.