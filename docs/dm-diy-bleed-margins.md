# Bleed margins

A bleed margin is an extra margin around the outside of a component design. The component's graphics extend out of the intended design area to cover the bleed margin as well. This allows some wiggle room when the components are cut out with less than perfect precision.

## Simulated bleed margins

DIY components can choose whether or not to include a bleed margin as part of the design. If a component does not include bleed margins but the user wants them, they can [simulate them in the deck editor](um-deck-pubmarks.md#bleed-margins). Simulated bleed margins are good enough for most designs; since machine cuts are not generally off by more than a millimetre or so, the faked margin rarely stands out.

## Building a bleed margin into the design

For complete control, components can include a bleed margin as part of their design. To do this:

1. Decide on the bleed margin size. This is measured in points and will be the same on all sides. Typical bleed margin sizes in the publishing industry are 3 mm (8.5 pt) or 1/8" (9 pt).
2. Ensure that the template image takes the bleed margin into account. You must extend the design by the margin size on all four sides, keeping the "true" design in the centre of the image.
3. In the component's `create` function, set the margin size. For example, `diy.bleedMargin = 9;` would set a 9 pt margin. The same margin will apply to all of the component's faces.

To change or remove the margin in a future edition of the component's plug-in, set the margin in both `create` and `onRead`. Setting the margin to 0 will remove the bleed margin; this is also the default.