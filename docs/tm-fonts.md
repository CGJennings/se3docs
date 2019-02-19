# Work around fonts that don't support the target locale

If your language requires glyphs (letter symbols) that are not present in the fonts included with a plug-in, there are a few general approaches you can take:

1. If you have the skill and the font's license allows, you can [add the missing glyphs yourself](dm-overview.md#tools). Even if you have no experience in this area, with a little patience and practice it is generally possible to achieve passable results if the change you need to make is straightforward, like adding a missing accented version of an existing glyph.
2. If you don't have the skill, you might contact either the plug-in developer or the font designer and ask if they are able to add the missing characters for you.
3. You can search for freely distributable fonts that *do* include the missing characters and have a similar design. If there is an official translation of the game for your language, they may have already chosen an appropriate font for you. As long as the font is freely distributable, contact the plug-in author and ask if they can substitute your font for the default one when your language is the active game language. Alternatively (again, if the licenses allow), use a font editor to merge the two fonts. This works best when adding glyphs for an entirely different alphabet, such as adding Cyrillic characters to a font based on the Latin alphabet. If you try mixing a missing **Â** glyph into an existing set of Latin glyphs, it will almost certainly stand out.

You can examine a font file in the [typeface viewer](dm-type-viewer.md) to check its coverage.

> If you customize a font, make sure that you change its name. For one thing, this is a requirement of many open font licenses. But more importantly, two fonts with the same name can't both be registered. If the user happens to have the same font on their system, or another plug-in has also loaded the (original) font, your version won't be used (or will only be used sometimes, namely when you supply the `Font` explicitly).

