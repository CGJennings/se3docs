# Add spelling support for a new language

A number of steps are required to add spelling support for a new language. However, if it is done carefully then it only needs to be done once. It is fairly easy to find or make a list of correctly spelled words for a basic dictionary. The more difficult part is providing the information needed to help the spelling system to quickly generate good suggestions for misspelled words. For that you‘ll need to gather the following:

1. A list of all of the words that you want the checker to accept.
2. A list of the most frequently *misspelled* words in your language.
3. A table of equivalent spellings (this is described in detail below).
4. Several writing samples from a variety of sources (called a corpus).
5. A good description of the pronunciation rules for the language.
6. A diagram of how a typical keyboard is laid out for the language (if different from your keyboard).

Before starting, you should read this article over a few times. For the best results, the different elements you are creating must work well together. You may also need to think a bit about how the particular language works in order to organize things in the most efficient way. Being familiar with how everything fit together will help.

The two main files you will want to create are the main spelling word list and a set of phonetic hashing rules. The word list will contain a list of correctly spelled words, but it will ideally also contain statistical data that can be used to improve the quality of spelling suggestions. This information will be derived from some of the other things in the above list. The phonetic hashing rules will let the spelling checker know when two words sound similar even if they are spelled differently. This is not so important for languages with a highly phonemic orthography, but very important for less strict languages like English.

## Creating a Word List

The basic requirement for adding spelling support is a list of correctly spelled words. You can probably find a such a list ready-made to use as a starting point (but check that the license will allow you to use, modify, and distribute the file freely). To work well with Strange Eons, you will want your list to meet the following requirements:

- It should list one word per line in lexicographic (basically, alphabetical) order.
- You should include all valid forms of each word as a separate entry (for example: fish, fished, fishing, and so on).
- Avoid starting any line with a digit `0`-`9` or `*` (these would usually be ignored by the checker as non-words anyway). If you need to do so, mark the line by prefixing an `*` to the start.
- Use lower case unless upper case is required for the spelling to be correct; if both upper and lower case spellings are correct under different circumstances, only include the lower case version.

The [code editor](dm-code-editor.md) can help you create your word lists. Use **Source/Sort** to get the words in lexicographic order and remove duplicates. When working with the word list as a text file, use the file extension `.utf8`.

### Importing the word list

Once you have a text file that lists your words and is saved with the UTF-8 encoding, you can start to work with it as a word list in Strange Eons. Close the file in your text editor. If you have not already done so, [create a plug-in task folder for a library plug-in](um-proj-plugin-task.md) and copy your file into it in its task folder. Then rename your file to use the extension `.cpl` (in the Rename dialog, click the extension to make it editable).

Your file is now in one of the two spelling list formats supported by Strange Eons. This format lists the words one per line in sorted order, but also supports a simple but effective compression scheme: each word starts with a digit indicating how many letters it has in common with the start of the previous word. (For example, if `angry` was listed after `anger` it could be listed as `3ry`.)

The second word list format uses the extension `.3tree`. This format reorganizes the word data in a special way that makes it faster to search through. It can also include additional data that improves the quality of spelling suggestions.

## Editing word lists

Once you have collected one or more word lists, you can begin putting them together in different ways to assemble your final list. Double clicking a list will open a simple spelling list editor that will let you test the list, combine it with other lists, and (for `.3tree` files only) mix in additional statistical data.

### Combining lists

The contents of one word list can be modified using another word list using set operations. Open the first list, switch to the **Modify List** tab, drag and drop the second list into the file field, then choose the operation you wish to perform:

**Merge**  
All of the words in the second list will be added to the first list.

**Exclude**  
All of the words in the second list will be removed from the first list.

**Intersect**  
Only words that appear in both lists will be retained by the first list.

> Whenever you modify a list with one of these operations, any statistical information is lost. Therefore you should always wait until the final list is assembled and only add word use data as a final step before saving the finished file.

### Removing case duplicates

Words in the list that only use lower case letters will match against spellings that use upper case letters as well. For example, `robin` will also match `Robin`. As a result, including both versions of this word would waste space. Choosing **Remove Case Duplicates** will find and remove the superfluous words automatically.

### Adding statistical data

Adding statistical data to your word lets Strange Eons prioritize suggestions based on which words are used more often. Only `.3tree` lists can include this data, so you will need to convert it first by right clicking the `.cpl` file in the project pane and choosing **Convert**.

To add statistical data, choose the **Word Use Statistics** tab and then drag and drop sample text files into the file list. Once all the desired files have been added, choose **Process All Texts** to analyze them. Any existing stats will be cleared and new stats added to the list based on the analyzed data.

You can improve the statistical data by supplying two other kinds of information:

**Equivalency table**  
This is a plain text list wherein each line consists of a list of words to be considered equivalent. The statistics for these words will then be combined in the generated file. For example, adding the line `color colour` ensures that when either of these words appears in the analyzed usage data, it counts towards both.

**Frequently misspelled word list**  
This is simply a list of words that are frequently misspelled. If you supply such a list, the statistics will include a bias in favour of these words.

### Hidden word lists

Besides your main spelling word list, you can also prepare a second list of separate *hidden* words. These are words that will be considered to be spelled correctly, but which will not be offered as spelling suggestions. You can use this to store words which may be offensive to some users, or to store rare or archaic words that are extremely unlikely to make useful suggestions.

## Word policies

A word policy is a compiled Java class that modifies the spelling checker’s default behaviour to suit specific languages. For example, the English policy will automatically accept a capitalized word that ends in ‘s if the root name is in the dictionary. As a result, the dictionary does not need to include a possessive form of each proper name. The following is the minimal code needed to create a word policy. If you can’t program in Java, you can use this instead. (You will still need to actually compile the file, though.)

```java
package ca.cgjennings.spelling.policy;

import java.util.Locale;

// IMPORTANT: Replace XX with the code for your locale
//            throughout this file.

public class Policy_XX extends LocalePolicy {
	public Policy_XX() {
		super();
	}
	public Locale getLocale() {
		return locale;
	}
	private static final Locale locale = new Locale( "XX" );
}
```

### Policy hints

Within the constructor for your word policy, you can call `setHint` to customize aspects of the checker’s behaviour:

`WordPolicy.Hint.EDIT_DISTANCE_LIMIT`   
Type: `Integer`; Default: `3`

This hint suggests how similar a word must be to a misspelled word before the spelling checker will consider listing it as a replacement suggestion. For example, *aple* can be changed to *apple* in 1 edit, and to *applet* in two edits. If this policy was set to 1, *applet* would no longer be a valid suggestion for *aple*.

`WordPolicy.Hint.ADJACENT_KEY_CAPS`   
Type: `String[]`; Default: `"QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"`

This hint returns an array of strings representing the arrangement of letter keys on a standard keyboard under this policy. Each string in the array represents one row of letter keys; the characters in each row are the capitalized key caps of the letters in that row, in the order they occur on the keyboard. 

`WordPolicy.Hint.WORD_REGEX`    
Type: `Pattern`; Default: `(\p{L}+\p{L}\'*\p{L}+)` 

This hint provides a regular expression that can be used to identify words to be checked. Group 1 of the expression must contain the text of the word. 

### Overridable methods

You can further customize the policy by overriding the following methods:

`public Object evaluate(String word)`  
Evaluate a word under this policy. The policy can return the original string, causing the word to be checked normally. Alternatively, it can return a different string as a proxy word to be checked instead of the original word. Finally, it can return one of the special values `WordPolicy.Evaluation.REJECT_WORD` or `WordPolicy.Evaluation.ACCEPT_WORD`. These cause the word to immediately be either rejected as a misspelled word or accepted as a correctly spelled word, respectively.

`public String modifySuggestion(String misspelledWord, String suggestion) `  
Allows the policy to modify a suggested replacement for a misspelled word before the suggestion is returned to the user. This can be used in combination with `evaluate()` to transparently modify the words that are queried and fetched from the dictionary. For example, if the policy strips off affixes in `evaluate()`, this method could be used to add appropriate affixes back onto suggestion words. If the policy does not wish to modify the suggestion, it should simply return the suggestion unchanged. 

## Phoneme rule sets

Strange Eons uses a special language to code sets of rules that define a *phonetic hashing algorithm*. A phonetic hashing algorithm is used to convert words into phonetic hash codes. These codes describe how a word sounds when pronounced. Similar-sounding words will have similar or identical phonetic hash codes even though they may be spelled quite differently.

### Phonetic hash codes

A phonetic hash code consists of a sequence of plain, unaccented capital Latin letters. Each letter representes a basic sound (roughly one phoneme, but some similar phonemes are mapped to the same letter). The writer of a rule set is free to define which letter represents which sound, but the rule sets used with the standard spelling dictionaries all use the same set of “sound letters” adapted from the well-known soundex and metaphone algorithms:

A B X S K J T F H L M N P R D W Y 

As used in the standard rule sets, these letters generally represent their usual sound in English, with these exceptions: A is used for any vowel; D represents “th”; X represents both “sh” and “ch”; and voiced and unvoiced versions of the same sound are generally combined (for example, both “d”and “t” are mapped to T).

A word’s phonetic hash is determined by scanning along the word one letter at a time and applying one of several different rules based on the pattern of letters found at that scanning position. The rules convert the written representation of the word into a sound alphabet like the one above. By comparing the phonetic hash of a misspelled word to the hash of possible replacements, the spelling checker can find cases where the typist knows how to say a word but not how to spell it.

The following table lists some sample words and their phonetic hash (using the standard rule set for English in Strange Eons): 

| Word                          | Phonetic Hash |
| ----------------------------- | ------------- |
| the                           | D             |
| they                          | D             |
| deceive                       | TSF           |
| decieve                       | TSF           |
| heracles                      | HRKLS         |
| hercules                      | HRKLS         |
| civilization                  | SFLSXN        |
| civilisation                  | SFLSXN        |
| hegemony                      | HJMN          |
| monkey                        | MNK           |
| McCall                        | MKKL          |
| constipation                  | KNSTPXN       |
| conversation                  | KNFRSXN       |
| shoggoth                      | XKD           |
| Cthulhu                       | KDLH          |
| antidisenstablishmentarianism | ANTTSNST      |

### Writing phonetic hashing rule sets

The phonetic hashing algorithm for a language is defined by writing a set of rules in a plain text file (UTF-8 encoding). As the hasher scans along the source word, it picks the best rule for each letter and applies it. A rule can tell the hasher to write a sound letter, or not, and it can also tell the hasher to skip some of the following letters.

#### Basic rules

A rule consists of a pattern to match at the current position and the sound letter that it generates. If no sound letter is given, or if the sound letter is `-`, then that position is silent (no sound letter is written for it in the resulting hash). The pattern is separated from the sound letter using an equals sign followed by a greater than sign `=>`. For example, the following rule would map the letter Z in a word to the sound letter S: `Z => S`

> It is important to remember that even though the same symbols are used on either side of a rule, the symbols mean different things. The letters on the left side of a rule always represent the letters in a word as it is written. The letters on the right side always represent sounds from the alphabet of sound letters. For example, in English, a written letter C (left side) may make either the “k” sound or the “s” sound (right side). 

#### Multiple patterns

Sometimes multiple patterns map to the same sound letter. When this happens, the patterns can be combined into a single rule by separating them with a `|`. The following rule maps both `Z` and `S` to the sound letter S: `Z|S => S`

#### Multi-letter patterns

A pattern can consist of more than one letter, in which case all the letters must match in order. In the standard rule files, the sound letter X represents the “sh” sound, as in the word shell. We can look for this pattern with the following rule: `SH => X`

#### Skipping letters

The above rule will match only if the hasher is positioned over a letter S and it notices that an H follows. However, the hasher will then move to the next letter (the H) and apply its rules again, possibly generating a sound letter for the H. But the SH actually represents a single sound; the X sound letter represents both written letters. We can tell the hasher this by writing the number of letters that are represented by the sound letter at the end of the rule. In this case, the X sound letter stands for two letters in the written word, so we put a `2` afterward: `SH => X 2`

When a number follows the sound letter like this, the hasher will skip over that many letters while scanning the original word. Not writing a number is the same as writing the number `1`, meaning to skip the current letter and move to the immediately following one.

#### Vowels in patterns

When people speak, they are often lazy with their vowels. This can be a common source of errors when writing a word phonetically. For this and other reasons, it is often useful to treat all vowels the same. When a `:` appears in a pattern, it will match any vowel. So the following rule maps all vowels to the single sound letter A: `: => A`

#### Exceptions at the start or end of words

Sometimes a rule only applies when a pattern occurs at the start or end of a word. The `$` symbol can be used to *anchor* a pattern. If `$` comes before the first letter of a pattern, then the pattern will only apply at the start of a word. If it comes after the last letter of a pattern, then it will match only at the end of a word. For example, the following rule makes K silent when it comes at the start of a word and is followed by an N (as in KNIGHT): `$KN => - `

#### Matching previous letters

The hasher normally starts matching a pattern against the letter at the current scan position (so SH matches when the current letter is S and it is followed by H). It is sometimes useful to be able to look back at previous letters as well. You can do this by placing a `^` just before the letter that must be at the current scanning position. The following rule makes the letter B silent if it comes at the end of word and it follows an M (as in THUMB): `M^B$ => - `

Note that this could also be written as: `MB$ => M 2 `

#### Implied silence

If no pattern applies at the current scanning position, the current position will be mapped to silence (`-`).

#### Rule precedence

When more than one pattern matches at the current scanning position, the hasher must choose one rule to apply. Normally, it will choose the rule for the longest matching pattern. This is usually what you want, as longer rules encode the exceptions to shorter ones. When two matching rules have the same length, the rule that was defined earlier in the file will be used. You can override the usual precedence rules by adding one or more `*` characters to the end of a pattern (after all other symbols, including any final `$`). Rules with a `*` take priority over all of the rules that don't have one. Likewise, rules ending in `**` take priority over all rules with only one `*`, and so on.

#### Parameters

Parameters are additional values that can be set in a rule file. They are not rules, but they do change how the hashing process works. Each parameter has a special name and can be set by writing the name, an `=` (not `=>`), and the value to use for that parameter. The following parameters can be defined: 

`hash-length = NUMBER`  
Hashes generated by the algorithm should include at least this many sound codes. All hashes produced by a given rule set will be the same length; if the number of sounds for a word is less than the length, it is padded with `-` (silence) at the end. A longer hash length makes longer words more distinguishable, but also takes longer to process. Languages with a long average word length (e.g., German) may wish to increase this value.

`kept-doubles = LETTERS`   
Doubled letters are ignored unless they appear on this list. Suppose the rule set defines `kept-doubles = C`. This means that the name McCall would be processed as if it were spelled McCal (the doubled C is kept, but the doubled L is dropped). If the right hand side is empty, then *all* doubled letters will be dropped.

#### A complete example

Here is the complete, annotated phoneme rule set used for English. (Don’t be intimidated by the length, the rule sets for most languages are much simpler.)

```
# phoneme-rules_en : English phonetic hash rules v1.0

# C is important for names like McCloud; G is kept only to allow one specific rule
kept-doubles = CG

#
# -Vowels-
#
# Rules: - all vowels convert to 'A'
#        - vowels are only kept at start of word, otherwise they are silent
#
# Note: the rule ": => -" is implicit since silence is the default
#

$: => A

#
# -Silent initial letters-
#
# Rules: initial KN, GN, PN, AC or WR always skips first letter
#            (accomplished by using silence)
#

$KN*|$GN*|$PN*|$AC*|$WR* => -

#
# -Accented Consonants-
#
# Rules: these are converted to their nearest equivalent English
#        pronunciation.
#

Ç => S
Ñ => NY

#
# -B-
#
# Rules: B is normally B
#      -but- it is silent at the end of a word after an M ("dumb")
#

B    => B
M^B$ => -

#
# -C-
#
# Rules: C is normally K
#      -but- X (sh) if CIA or CH, except that SCH (other than SCHW [q.v.]) is K 
#            S if CI, CE or CY
#
# Note that S^CH is longest (4) so it will override CH.
#

C => K
S^CH => K 2
CIA => X
CH => X 2
CI|CE|CY => S

#
# -D-
#
# Rules: D is normally T
#      -but- J if DGE, DGY, or DGI
#

D => T
DGE|DGY|DGI => J

#
# -F-
#

F => F

#
# -G-
#
# Rules: G is normally K
#      -but- it is silent if GH and not at end
#               or before a vowel in GN or GNED
#            it is J if GI or GE or GY and not a double G
#

G => K
GH => -
GH$ => K
GN:|GNED: => -
GI|GE|GY => J
GG|GGI|GGE|GGY => K 2

#
# -H-
#
# Rules: H is normally H
#      -but- it is silent after a vowel when no vowel follows
#

H => H
:^H => -
:^H: => H

#
# -J-
#

J => J

#
# -K-
#
# Rules: K is normally K
#      -but- it is silent after a C
#

K => K
C^K => -

#
# -L M N-
#

L => L
M => M
N => N

#
# -P-
#
# Rules: P is normally P
#      -but- PH is F (phosphorous)
#            in PB, the P is made silent (Campbell, raspberry)
#

P => P
PH => F
PB => B 2

#
# -Q-
#

Q => K

#
# -R-
#
# Rules: R is normally R
#      -but- silent at the end of a word in IER (French origin, e.g. courtier) 
#            except in MEIER/MAIER
#

R => R
IE^R$ => -
MEIE^R$|MAIE^R$ => R

#
# -S-
#
# Rules: S is normally S
#      -but- it is X (sh) in SH, SIO, SIA, SCHW, or SUGAR-
#            it is silent in ISL and YSL (island, Carlysle)
#
# Note: SCHW will override the S^CH => K rule above
#       because the S will come earlier in the string
#       and that rule's offset skips the C
#

S => S
SH => X 2
SIO|SIA => X
$SUGAR => X
SCHW => X 3
I^SL|Y^SL => -

#
# -T-
#
# Rules: T is normally T
#      -but- it is D (th) in TH
#            it is X (sh) in TIA or TIO
#            it is silent in TCH
#

T => T
TH => D 2
TIA|TIO => X
TCH => -

#
# -V-
#

V => F

#
# -W-
#
# Rules: W is W before a vowel
#      -but- silent otherwise
#
# Note: the rule "W => -" is implicit since silence is the default
#

W: => W

#
# -X-
#
# Rules: X is normally KS
#      -but- it is S at the start of a word (xylophone)
#

X => KS
$X => S

#
# -Y-
#
# Rules: Y is Y before a vowel
#      -but- silent otherwise
#
# Note: the rule "Y => -" is implicit since silence is the default
#

Y: => Y

#
# -Z-
#

Z => S
```

## Putting everything together

The files for your finished word lists, policy, and hashing rules must all use specific names and be stored in specific folders in order to be found by Strange Eons when looking for spelling data for your language. Name the files according to these templates:

`main_XX.3tree`   
Main word list

`hidden_XX.3tree`  
Hidden word list (if any)

`phoneme_rules_XX`  
Phoneme rule set

`Policy_XX.class`  
Compiled Java policy class (you can also include the `.java` source for reference, but the policy must be provided in compiled form to work).

Replace the XX in the above names with the code for your locale. For example, the English dictionary would be named `main_en.3tree`.

The files must also be organized into a specific folder structure, as follows:

```
ca
|
+-- cgjennings
    |
    +-- spelling
        |
        +-- dict
        |   |
        |   +-- main_XX.3tree
        |   |
        |   +-- hidden_XX.3tree 
        |
        +-- phonetics
        |   |
        |   +-- phoneme_rules_XX
        |
        +-- policy
            |
            +-- Policy_XX.class
```

Create this folder structure in your plug-in task folder, copying your data files into it as indicated. You can then build the plug-in folder. (Make sure the bundle uses the .`.selibrary` extension.) Install the plug-in bundle and restart Strange Eons. When the game language is set to the locale you used in your file names, your spelling data will be used automatically.