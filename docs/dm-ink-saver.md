# Customize Ink Saver rendering

Ink Saver mode is meant for use when prototyping a game. By default, it has the following effects:

* all sheets are drawn with a solid white background
* images are not rendered
* text and shapes are rendered (in part because some text is drawn as shapes)

Internally, Ink Saver mode works by passing you a special graphics context that transparently modifies how your content is rendered. In most cases, there is no need to take any special action. In rare cases you may wish to detect this mode and render some elements differently.

To *detect whether Ink Saver* mode is active on a sheet, call `Sheet.isPrototypeRenderingModeEnabled()`. This returns `true` if Ink Saver is active.

To *render images when Ink Saver mode is active*, call `getUnrestrictedGraphics()` on the graphics context you are passed. This returns a graphics context that bypasses the Ink Saver restrictions. Be aware that this method does not exist on a normal, non Ink Saver graphics context.

## Mixing drawing modes

One approach is to use two variables for the graphics context used for drawing. One of these is always set to the context passed to your painting function and is used for most of your drawing. The other is normally set to the same context, but is set to the unrestricted context when Ink Saver is active. This can be used in critical cases, when the content being rendered is critical to the component's meaning. Here is a rough outline:

```js
const optionalGraphics = g;
const criticalGraphics = g;
if (sheet.prototypeRenderingModeEnabled) {
    criticalGraphics = g.unrestrictedGraphics;
}

optionalGraphics.drawImage(/* unimportant stuff */);
optionalGraphics.drawImage(/* more unimportant stuff */);

criticalGraphics.drawImage(/* important stuff */);

optionalGraphics.drawImage(/* even more unimportant stuff */);
// ...
```

