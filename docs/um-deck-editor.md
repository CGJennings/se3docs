# The deck editor

The deck editor is used to layout printed pages. It is most commonly used to prepare a deck of related components. It can also be used to design [custom boards](um-boards.md) when supported by a game's plug-in.

## The editor

The deck editor has three basic parts. The upper left corner lets you set basic properties of the deck, such as the paper size it will use. Below that are collections of objects that can be added to the deck, including shapes, text, game components, and game-specific tiles and decorations. On the right side is the page layout area. A tab strip allows you to add, switch between, and organize pages in the deck.

![the deck editor](images/deck-editor.png)

## Game setting

The **Deck** tab includes an option to choose the game that the deck is associated with. The default is **All Games**, which is all you need if you are creating a deck of cards. Setting a specific game is usually only relevant if you want to design a game board.

Changing the game affects which objects are available: it adds game-specific content in new tabs under the **Components** section. (Not all games add new content.) When set to **All Games**, only the **Tools** and **Faces** tabs are shown.

## Deck pages

Pages are managed from the tab strip over the design area:

![animated example of managing deck pages](images/deck-tabs.gif)

To *add a new page*, click the last tab in the list.

To *remove a page*, click the tab's remove button; if the last page is removed, a new, empty page is inserted automatically.

To *rename a page*, double click the tab label and enter the desired name.

To *reorder the pages*, drag and drop the tabs into the new sequence.

## Paper size

Every page in a deck is the same size. You can change this size using the **Deck** tab's **Paper Size** dropdown. (If you have selected a game for the deck, there may also be additional page sizes listed. These are sized for making game boards or other game-specific objects.)

You can define a new paper size by choosing **Custom**:



At the top of this dialog is a list of custom sizes (initially empty). You can add a new size with the **+** button, and delete it again with the **-** button. To define the size's properties, select it in the list and then edit the details:

The **Name** field can be anything you wish and is used to identify the size when selecting.

The rest of the fields are measurements. You can choose whether you wish to use centimetre (cm) or inch measurements from the dropdown.

The **Size** defines the width and height of the paper (or height and width, the order doesn't matter).

The **Margin** sets the size of the light blue margin drawn along the edge of each page. This is only meant as a guide and does not affect where you can place objects.

The **Grid Size** defines the spacing of the major grid lines in the deck. The minor lines (dashed) are placed at half this interval automatically.



## Adding content

Content is added by dragging it from the lists of objects on the left and dropping it onto a page. To move around a page, click any exposed paper and drag the mouse. Use the mouse wheel, or <kbd>+</kbd> and <kbd>-</kbd> keys to zoom in and out. Click objects to select them; drag to position them on the page. Using the **Deck** menu, you can flip and turn objects, change how they are layered, change their style, and perform other editing operations.

### Snapping and fold marks

Many objects use *snapping* to combine with other objects. For example if you drag one card face over another and release the mouse button, the new face will snap into place next to its neighbour. If these are the front and back of a single game component, fold marks will appear to indicate that the two faces should be folded together to create a single card.

[Learn more about adding content to decks](um-deck-adding-content.md)

