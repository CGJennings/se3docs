# Automation scripts

Automation scripts are script files stored in a project with the extension `.ajs` (icon: ![icon](images/project/auto.png)). They are used to automate repetitive tasks such as converting image files, exporting a group of components to images, or building a group of plug-ins. They are essentially "mini commands" specific to the needs of the project they are stored in.

An automation script runs automatically when double clicked. To edit the script, right click in it and choose **Open**. When working with a project from an untrusted source, be sure to open and review any automation scripts before running them.

Automation scripts can be created anywhere in a project. Right click the parent folder and choose **New/Automation Script** or rename an existing script to change the extension from `.js` to `.ajs`.

The following variables are predefined in an automation script: `project`, `task`, and `member`.  These are instances of `ca.cgjennings.apps.arkham.project.Member` that point to the project, task folder (if any) and script file. These can be used to make the script independent of where the project folder or script is stored. You can get a Java `File` object for a project member using `member.getFile()` and a [project URL](dm-special-urls.md) using `member.getURL()`.