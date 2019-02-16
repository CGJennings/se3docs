# se3docs readme

[Documentation](https://cgjennings.github.io/se3docs/index.html) for [Strange Eons 3](https://strangeeons.cgjennings.ca), a tool for creating and customizing components for paper-based games. The documentation is built automatically from the sources in `docs/`. Contributions welcome.

**Plug-in authoring kit**

This repository also houses the source of the Plug-in Authoring Kit, a project for Strange Eons that contains sample code and other resources that complement the doc files.

**Utility scripts**

The project includes some Node.js utility scripts in `doc-utils/`:

`linkcheck.js`  
Checks for some common errors, such as links to `.md` files that don't exist and orphan pages that are not linked to by any document.

`makenav.js`  
Updates the navigation data file (`docs/assets/js/nav.json`) used by the site to automatically add links to the previous/next links at the bottom of each page. Run this after making changes to one of the `*-index.md` manual contents pages.