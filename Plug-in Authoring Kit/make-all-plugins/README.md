# Make all plug-ins
This folder contains an *automation script*, `make-all.ajs` that
will scan the entire project to find examples that are complete
plug-ins rather than standalone scripts, make instllable plug-in
bundles for them, and put the bundles in this directory.

Once a plug-in is bundled, you can install it by double-clicking
its icon.

Automation scripts are used to automate commonly repeated tasks
in a project. They are normal script files, but their file extension
is `.ajs` instead of `.js`. When this extension is used, Strange
Eons defaults to running them instead of editing them when you
double-click their icon. To edit an automation script, right-click
and choose **Open**.

**Note:** You should never double-click an automation script from an
untrusted source without first opening it to check that its is safe.