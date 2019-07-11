# $-notation

When working with settings in script code, you can save time and make your code easier to read by using $-notation. Any variable name that starts with `$` will be treated as the setting key with the same name, excluding the `$`. That means that the following statements are equivalent:

```js
// instead of
value = settings.get("keyname");
// you can write
value = $keyname;
```

This also works for assignment. The following statements are also equivalent:

```js
// instead of
settings.set("keyname", value);
// you can write
$keyname = value;
```

To look up a value by from string key, you can use `$(key)` to keep your notation more consistent:

```js
keyname = "image-region-" + (side === -1 ? "left" : "right");

// instead of
value = settings.get(keyname);
// or
value = global["$" + keyname];
// you can write
value = $(keyname);
```

## Choosing a setting source

A $ variable is always resolved against a particular collection of [Settings](assets/javadoc/resources/Settings.html). By default this is usually the global shared setting space obtained from `Settings.getShared()`. In DIY scripts, the default is the private settings of the DIY component itself (`diy.settings`). You can switch $-notation to use a different source by passing it to the `useSettings(source)` function. This can be passed a Settings instance, a game component (to use its private settings), or null/undefined to use the global shared settings.

## How $-notation differs

### Key name translation

Many settings include `-` in the key name. This is normally not allowed as part of a script identifier, but is allowed when using $-notation (as well as #- and @-notation). However, older versions of Strange Eons did not support this and instead used the workaround of translating the `_` character to `-`. To remain compatible with old code, this translation is still performed. Hence:

```js
// instead of
value = settings.get("key-with-hyphen");
// you could write
value = $key_with_hyphen;
// but in all recent versions of Strange Eons you can also simply write
value = $key-with-hyphen;
// but if the key name really has an underscore (or other illegal character) you'd use, e.g.:
value = settings.get("key_with underscores and_spaces");
```

As shown in the example, key names that use either `_` or characters that are [not allowed in variable names](https://developer.mozilla.org/bm/docs/Web/JavaScript/Guide/Grammar_and_types#Variables) cannot use $-notation and must be accessed directly through a Settings instance.

### Type coercion

Since settings values are always stored as strings, any value that is assigned to a $-variable will first be converted to a string. Assigning non-string values may cause unexpected issues. For example, the following code does not print two as you might expect:

```js
$x = 1; // ⚠
println($x + $x);
```

Since `$x` only accepts strings, the `1` is first converted to the string `"1"`. As a result, the expression `$x + $x` will concatenate two copies of string together, resulting in `"11"`.

## Live settings

While setting values are always strings, they are used to encode a variety of other data types, including specialized types like regions and colours. To make working with such settings more convenient, you start the variable name with `$$` instead of `$`. A setting starting with `$$` will reflect the setting value as a special kind of object which lets you interpret the value as different data types through its properties.

```js
$example = "24,32,100,200";
println($$example.region.width);

$example = "ff0000";
println($$example.color.red); // colour is also accepted
```

Live settings are read-only. For example, you cannot assign a [Region](assets/javadoc/resources/Settings.Region.html) instance to `$$key_name.region` to change the underlying key value. However, most setting data types (including Region) are implemented so that they become their setting value when converted to strings. This means that simply assigning the value to the regular setting will work as expected (`$key_name = someRegion`).

The following properties are available:

`$$key.boolean` or `$$key.yesNo`: boolean value

`$$key.color` or `$$key.colour`: color (a [Settings.Colour](assets/javadoc/resources/Settings.Colour.html))

`$$key.cupShape`: a [PageShape.CupShape](assets/javadoc/ca/cgjennings/layout/PageShape.CupShape.html)

`$$key.integer`: an integer value (32-bit signed, converted to a JavaScript number)

`$$key.number`: a number value

`$$key.region`: a rectangular [Region](assets/javadoc/resources/Settings.Region.html)

`$$key.region2D`: a rectangular [Region2D](assets/javadoc/resources/Settings.Region2D.html) (allows fractional coordinates)

`$$key.string` or `$$key.value`: a string (that is, the setting value)

`$$key.textAlignment`: a [text alignment](assets/javadoc/resources/Settings.html#textAlignment-java.lang.String-) setting suitable for use with a markup box

`$$key.textStyle`: a [TextStyle](assets/javadoc/ca/cgjennings/layout/TextStyle.html) [value](assets/javadoc/resources/Settings.html#textStyle-java.lang.String-ca.cgjennings.layout.TextStyle-) suitable for use with a markup box

`$$key.tint`: a tint value parsed from a comma-separated list of angle, saturation factor, brightness factor

In addition, the following properties can be used to look up information about the live setting instance:

`$$key.key`: returns the name of the key reflected by this live setting

`$$key.settings`: returns the [Settings](assets/javadoc/resources/Settings.html) instance that the key is being looked up with
