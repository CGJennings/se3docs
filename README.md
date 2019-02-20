# se3docs readme

[Documentation](https://cgjennings.github.io/se3docs/index.html) for [Strange Eons 3](https://strangeeons.cgjennings.ca), a tool for creating and customizing components for paper-based games. This repository contains the documentation and plug-in example code for the app. Contributions welcome.

## Contents

### Doc sources

The source files used to build the documentation are located in `docs/`. Pages are written in a simple formatting language called Markdown. The [documentation Web site](https://cgjennings.github.io/se3docs/index.html) is built automatically from these files and updated within a few minutes after changes are merged into this repository.

The documentation is split into three "manuals", one for users, one for developers, and one for translators. The prefix of each source file indicates which manual the file belongs to (`um-`, `dm-`, and `tm-`, respectively). The main table of contents for each manual is found in `*-index.md`, where `*` is the manual prefix.

The source files include API documentation under `docs/assets/javadoc` and `docs/assets/jsdoc`. This allows documentation pages to link directly to reference documentation when appropriate. Since these are automatically generated, you should not submit patches to fix issues with them here. Any problems with them need to be corrected at the source. (You can raise issues about them here, though.)

### Plug-in authoring kit

This repository also houses the sources for the [Plug-in Authoring Kit](https://github.com/CGJennings/se3docs/releases/latest), a project for Strange Eons that contains sample code and other resources that complement the documentation.

### Utility scripts

The project includes some [Node.js](https://nodejs.org/) utility scripts in `doc-utils/` to assist with checking and updating contributions:

`linkcheck.js`  
Checks for some common errors, such as links to `.md` files that don't exist and orphan pages that are not linked to by any document.

`makenav.js`  
Updates the navigation data file (`docs/assets/js/nav.json`) used by the site to automatically add links to the previous/next pages at the bottom of each page. This needs to be re-run whenever changes are made to one of the `*-index.md` manual contents pages.

If you change any section headings, you must also search for links to that section heading in other doc files and update them accordingly. Section hash links are formed automatically by converting the heading to lower case, replacing spaces with `-` and stripping out other characters. For example, the heading of this section would convert to `#utility-scripts`.