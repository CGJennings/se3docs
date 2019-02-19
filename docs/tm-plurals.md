# Translate strings that use plural forms

Most languages use different word forms for nouns depending on the number of objects being referred to. For example, in English one writes *one donkey* but *two donkeys*. The rule in English is that the single form is used when there is one object, and the plural is used in all other cases (including zero). Other languages can have different rules, and some even use more than one plural form.

A programmer who wishes to add a plural-aware string will define multiple keys. The first key will be the singular form. The next will add `-pl` to the key name, and will be the first plural form. If there is more than one plural form, additional keys `-pl2`, `-pl3`, and so on, will be defined. For example: 

```properties
eg-num-common = %d Common Item
eg-num-common-pl = %d Common Items
```

When translating this text, you would define as many keys as are needed for the number of plural forms in the language. For example, a Japanese translation would only use the singular form key `eg-num-common` because word forms do not vary based on the number of objects in that language. On the other hand, a Russian translation would need to define both `eg-num-common-pl` and `eg-num-common-pl2`, since that language uses three different word forms.

In languages with three or more forms, it may not be clear which key to use when (`-pl` or `-pl2`?). The general rule is to start at the form for the number 1 (which uses the singular key), and then count upward and use the next key name whenever you reach a number where a new word form is used. For example, Czech uses a singular form for *n* = 1, one plural form for *n* = 2 to *n* = 4, and a second plural form for all other cases. So, you would use `-pl` for the *n* ≤ 4 form and `-pl2` for the *n* > 4 form (since you switch to it at 5, which comes after 2).

To help you remember, the translation editor in Strange Eons will display a blue tip icon that shows a summary of the rules for the language you are editing. This can be found near the bottom of the translation editor. 

## Adding plural rules for new languages

Strange Eons includes plural rule support for dozens or languages. If your language isn’t one of them, you can [request it](https://cgjennings.ca/contact.html). Alternatively, you can add support yourself; see the documentation for [`ca.cgjennings.i18n.IntegerPluralizer`](https://cgjennings.github.io/se3docs/assets/javadoc/ca/cgjennings/i18n/IntegerPluralizer.html).

To verify whether a language is supported, **Run** the following code in the Quickscript tool (replace `XX` in the third line with the relevant language code): 

```js
println(
    !ca.cgjennings.i18n.IntegerPluralizer.create(
        new java.util.Locale('XX')
    ).isFallbackPluralizer()
);
```

If this prints `true` in the script console, then your language is already supported. 