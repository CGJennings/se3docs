## Adding a Bleed Margin to a DIY Component

The following steps can be used to create a component with a bleed margin:

1. Decide on the size of the margin. This is measured in points and will be the same on all sides. Typical bleed margin sizes in the publishing industry are 3 mm (8.5 pt) or 1/8" (9 pt).
2. Ensure that the template image accounts for the bleed margin. You must add twice the margin size to both the width and height (i.e., extend all four sides by the bleed margin size).
3. In the component's **create( diy )** function, set the bleed margin size. For example, to set a 9 pt margin:

```
function create( diy ) {
    // ...
    diy.bleedMargin = 9;
    // ...
}
```

To add or remove the bleed margin from an existing component, modify the template and 

create()

 function accordingly, and add a line to 

onRead()

 to update existing components with the new margin setting.

Tip

When designing the card layout, keep in mind that any content close to the edge of the card will be cut off if the cut is misaligned. Keep any important content at least as far away from the intended card edge as the size of the bleed margin. (Ideally, you should add a small amount of extra dead space in addition to this minimum interior margin so that a misaligned cut does not end up putting text right on the card edge.)