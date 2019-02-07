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

## Key name translation

Many settings include `-` in the key name. This is an issue since this is not a valid character in setting names. (The convention of using `-` in key names predates the addition of $-notation by several years.) As a workaround for this, when using `$` notation the `_` character is translated to `-`. Hence:

```js
// instead of
value = settings.get("key-with-hyphen");
// you would write
value = $key_with_hyphen;
```

Key names that use `_` or characters that are illegal in JavaScript variable names cannot use $-notation and must be accessed directly through a Settings instance.

## Type coercion

Since settings values are always stored as strings, any value that is assigned to a $-variable will first be converted to a string. Assigning non-string values may cause unexpected issues. For example, the following code does not print two as you might expect:

```js
$x = 1; // ⚠
println($x + $x);
```

Since `$x` only accepts strings, the `1` is first converted to the string `"1.0"`. As a result, the expression `$x + $x` will concatenate two copies of string together, resulting in `"1.01.0"`.

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

`$$key.region2D`: a rectangular [Region2D](assets/javadoc/resources/Settings.Region2D.html) (allows non-integer coordinates)

`$$key.string` or `$$key.value`: a string (that is, the setting value)

`$$key.textAlignment`: a [text alignment](assets/javadoc/resources/Settings.html#textAlignment-java.lang.String-) setting suitable for use with a markup box

`$$key.textStyle`: a [TextStyle](assets/javadoc/ca/cgjennings/layout/TextStyle.html) [value](assets/javadoc/resources/Settings.html#textStyle-java.lang.String-ca.cgjennings.layout.TextStyle-) suitable for use with a markup box

`$$key.tint`: a tint value parsed from a comma-separated list of angle, saturation factor, brightness factor

In addition, the following properties can be used to look up information about the live setting instance:

`$$key.key`: returns the name of the key reflected by this live setting

`$$key.settings`: returns the [Settings](assets/javadoc/resources/Settings.html) instance that the key is being looked up with