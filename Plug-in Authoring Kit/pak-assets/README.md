# `pak-assets`
You don't need to worry about this folder!
It contains images and other assets that documents and scripts
in the Plug-in Authoring Kit can refer to.

You can recognize that one of these assets is being linked to
by the use of project URL that starts like this:
`project://pak-assets/...`.

*A project URL locates a resource in the current (that is, open)
project, starting from the project's root folder.*

## Plug-in resources
Full plug-in examples are self-contained, because they need
to work when the plug-in is installed, whether this project
is open or not. They use resource URLs (`res://`) URLs to
locate resources relative to the plug-in's `resources` folder.

(This folder is called `pak-assets` instead of `resources` or
`pak-resources` to prevent confusion with resource folders.)