# Customize Ink Saver rendering

Ink Saver mode is meant for use when prototyping a game. By default, it has the following effects:

* all sheets are drawn with a solid white background
* images are not rendered
* text and shapes are rendered (in part because some text is drawn as shapes)

Internally, Ink Saver mode works by passing you a special graphics context that transparently modifies how your content is rendered. In most cases, there is no need to take any special action. In rare cases you may wish to detect this mode and render some elements differently.

To *detect whether Ink Saver* mode is active on a sheet, call `Sheet.isPrototypeRenderingModeEnabled()`. This returns `true` if Ink Saver is active.

To *render images when Ink Saver mode is active*, call `getUnrestrictedGraphics()` on the graphics context you are passed. This returns a graphics context that bypasses the Ink Saver restrictions. Be aware that this method *does not exist* on a normal graphics context.

## Mixing drawing modes

If you feel some of your image-based content is critical to an understanding of the component, you have two choices. The first is to render it differently when in text saver mode (for example, using text instead of a symbol). The second is to bypass the special graphics context for selected elements. One approach for the latter is to use two variables for the graphics context used for drawing. One of these is always set to the context passed to your painting function and is used for most of your drawing. The other is normally set to the same context, but is set to the unrestricted context when Ink Saver is active. Then use the first variable for drawing except when it is critical that your content be rendered. Here is a rough outline:

```js
const normalGraphics = g;
const criticalGraphics = sheet.prototypeRenderingModeEnabled ? g.unrestrictedGraphics : g;

normalGraphics.drawImage(/* unimportant stuff */);
normalGraphics.drawImage(/* more unimportant stuff */);

criticalGraphics.drawImage(/* important stuff */);

normalGraphics.drawImage(/* even more unimportant stuff */);
// ...
```

### Customizing the restrictions

To change which elements are excluded, create a new [PrototypingGraphics2D](assets/javadoc/ca/cgjennings/graphics/PrototypingGraphics2D.html), passing it a graphics context and your preferred options.