@ -0,0 +1,19 @@
# Prefab

This example includes two "prefab" components you can try by right clicking
and **Run**ning their script files.

A [prefab component](http://se3docs.cgjennings.ca/dm-diy-prefab.html)
is one whose design is controlled by its `.settings` file.
The `-diy` script is just a *stub* that loads the `prefab` library and
says which setting keys to use.

`prefab-diy.js`  
This prefab includes a heading, body text, and portrait.

`prefab2-diy.js`  
This example demonstrates how the default behaviour of a prefab component
can be customized using before and after functions. It adds a page
shape that restricts the text to fit inside the white oval.
(Use **View/Region Boxes** to make the page shape visible as a dashed
blue line.)