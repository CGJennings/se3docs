# Cloud fonts

The cloud fonts feature provides on-demand access to thousands of fonts. Just choose the fonts you want to use and they will be downloaded automatically, and registered so that they can be accessed by their family name. Downloaded fonts are cached locally, so they only need to be downloaded again if they are updated on the server.

To use cloud fonts, start by obtaining a `CloudFontCollection`:

```js
const cfc = ca.cgjennings.graphics.cloudfonts.CloudFonts.getDefaultCollection();
```

A collection consists of a number of  cloud font families. Each family is a set of one or more related fonts. (For example, a family might include separate fonts for the regular, bold, and italic variants.) The first time you use the collection to access a family, there will be a delay as a small metadata file is downloaded. The metadata provides information about the available fonts without having to download the fonts themselves.

You can examine all of the available fonts by calling the collection’s `getFamilies()` method, or if you already know the name of the family you want, you can get it directly:

```js
// get an array of all of the currently available families
let families = cfc.getFamilies();

// get a specific family
let firaSans = cfc.getFamily("Fira Sans");
```

This returns a `CloudFontFamily`, which can be used to get more information about the family and the fonts that it contains. For example, you can find out which open license it is made available under, and information about the general categories it belongs to (such as display, serif, or sans serif). You can also get `Font` objects for the individual fonts that make up the family. Most commonly, though, you will simply `register()` the desired family. This will download fonts as necessary, and then register the entire family similarly to `ResourceKit.registerFontFamily()` or the equivalent script library function. Then the font will be available by its family name in markup boxes, when using the `Font` constructor, and elsewhere.

## Tips

* To use the registered family, it is recommended that you get the family name from the first `FontRegistrationResult` returned by the `register()` method, like this:

  ```js
  let ralewayFamily = cfc.getFamily("Raleway").register()[0].family;
  let markup = `<family "${ralewayFamily}">This text uses Raleway.`;
  ```

  This ensures that if the actual family name varies slightly from that reported by the cloud font collection, you will use the correct name.

* Although you can download each font in a family individually (e.g., `cloudFamily.getCloudFonts()[0].getFont()`), it is usually more efficient to download the entire family (`cloudFamily.getFonts()` or `cloudFamily.register()`), since these methods can download multiple files in parallel.

* If you want to use a cloud font in a plug-in, there are two choices: you can use the cloud font system to `regsiter` the desired family, or you can use the cloud font API to download the font files ahead of time and include them in your plug-in resources. The first method has the advantage that the font will be kept up to date automatically, while the second method ensures that the plug-in will work regardless of network connectivity. You could even use a hybrid approach: try to download and register the fonts using the cloud font API during plug-in startup, but if that fails fall back to a copy in the plug-in.

* The default collection is based on the same font collection as [Google Fonts](https://fonts.google.com). This site offers a nice interface for searching the available fonts, so feel free to use it to find the family names of fonts that you like. A handful of fonts in Google Fonts, including all of the color fonts, are not available in the cloud font collection, so be sure to verify that your choices are available.

