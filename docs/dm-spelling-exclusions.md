# Make the spelling checker ignore game terminology

Many games include specialized terminology or names which may not appear in the spelling dictionary. Rather than forcing users to add these words to their personal dictionary manually, your plug-in can submit them all at once when it loads.

## Ignoring words

To work with the spelling checker, first you will need to get a reference to it:

```js
let checker = ca.cgjennings.spelling.SpellingChecker.sharedInstance;
```

To prevent a word from being marked incorrect, you can add it to the ignore list with code like the following:

```js
checker.ignoreWord('blunderbuss');
```

To ignore a large number of words, first create a text file in an appropriate area of your plug-in’s `resources` folder. (Use the extension `.utf8` to ensure it uses the UTF-8 text encoding.) Add your words to the list, one per line. Then sort the list (**Source/Sort**), deleting any duplicates. Save the file, close the editor tab (this step is important), then rename the file to use the extension `.cpl`. If you wish to compress the list, double click the newly renamed `.cpl` file and then choose **Save** in the dialog that appears. You can then use the following function to load and ignore the list:

```js
function ignoreWordList( resource ) {
    var wordList, inStream;
    var spelling = ca.cgjennings.spelling;

    // create an empty word list that matches the file format
    if( resource.endsWith( '.cpl' ) ) {
        wordList = new spelling.dict.BucketList();
    } else if( resource.endsWith( '.3tree' ) ) {
        wordList = new spelling.dict.TernaryTreeList();
    } else {
        throw new Error( 'Unknown word list format: ' + resource );
    }

    // read in the word list
    inStream = null;
    try {
        inStream = ResourceKit.getInputStream( resource );
        wordList.read( inStream );
    } finally {
        if( inStream != null ) inStream.close();
    }
    
    // ignore the contents of the list
    spelling.SpellingChecker.sharedInstance.ignoreAll( wordList );
}
```

## Hiding words

If you want to prevent words from appearing as spelling suggestions when the user right clicks on a misspelled word, you can add it to the *hidden* list instead of the ignore list. To do that, just substitute the analogous methods `hideWord` and `hideAll` in the above code.
