# Factory task

A **Factory** task is used to create game component (`.eon`) files automatically. They can be used to manage translations of a game into multiple languages, to reduce the monotony of creating components that follow a regular pattern, or to create components using data from an external source.

> Because they both deal with groups of components, factories support many of the same actions as **Deck** tasks. If you have not already done so, you should [read that page](um-proj-deck-task.md) first.

## Types of factories

Factory tasks come in different flavours depending on exactly how they create components. Here are two of the most common types:

### CSV Factory

This factory produces components by reading data from a CSV data table.  It is not built in, but added by installing a plug-in. It is described in detail in its own [manual page](um-proj-csv-factory.md).

### ⚠️ Scripted Factory

This factory type is built into Strange Eons. It is extremely flexible, but requires the most effort to use. Scripted factories include a script file, `make.js`, that creates the desired components when run. A sample script is provided as a starting point.

To *run the script and build your components*, right click the task folder and choose **Make**. (Or run the script directly.)

To *delete the current set of `.eon` files*, right click the task folder and choose **Clean**.

To *lay out a deck of components automatically*, right click the task folder and choose **Make Deck**.

To *test a deck of cards without printing them*, right click the task folder and choose **Virtual Deck**.

> The [Gilman Memorial Exhibit](http://cgjennings.ca/eons/samples/gilman.html) is a sample project that implements an expansion for the Arkham Horror board game. It uses scripted factories to create French and Spanish translations of the original English cards and might be a useful reference for using this factory type.