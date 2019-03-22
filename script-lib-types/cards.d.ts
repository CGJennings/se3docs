/**
 * # cards library
 * 
 * Defines the CardDeck class, which can be used to simulate a deck of cards.
 * It supports operations typical of a deck of cards, such as shuffling, drawing from,
 * and being discarded to.
 * 
 * Include this library by adding `useLibrary("cards")` to your script.
 */
declare module cards {
    /**
     * A CardDeck simulates a deck of cards.
     */
    class CardDeck {
        /**
         * Creates a new, empty deck.
         */
        constructor();

        /**
         * Shuffles the cards in a deck into a random order.
         */
        shuffle(): void;

        /**
         * Removes and returns the first card from the deck. To return the card
         * to the bottom of the deck, [[discard]] it. If the deck is empty,
         * returns null.
         * 
         * @returns the top card, which is removed from the deck, or null if the
         *     deck is empty
         */
        draw(): any;

        /**
         * Searches the deck for the first card matched by the specified function.
         * If found, it removes it from the deck and returns it. If no matching card
         * is found, returns null.
         * 
         * @param matchFunction a function that takes a card and returns true if
         *     it is the type of card that should be drawn
         * @returns the first matching card, which is removed from the deck
         */
        drawFirst(matchFunction: (any) => boolean): any;

        /**
         * Adds a card to the bottom of the deck.
         * It is not required that the card have previously been drawn from
         * the deck. If `copies` is defined, then that many copies are added,
         * all identical.
         * 
         * @param card the card to add to the deck
         * @param copies the optional number of copies to add to the deck (default is 1)
         */
        discard(card: any, copies: number): void;

        /**
         * Returns a card from the deck without removing it. If `index`
         * is not defined, then the card at the top of the deck is returned.
         * Otherwise, if `index` is 0 or positive, then the card at position
         * `index` is returned, where a position of 0 is the top of the deck,
         * 1 is the next card from the top, and so on. If `index` is negative,
         * then the cards are counted from the bottom of the deck:
         * -1 is the last card, -2 is the penultimate card, and so on.
         * 
         * @param index the position of the card to peek at within the deck
         * @returns the card at the index, or the card at index `size() + index` if the index is negative
         * @throws if the index is invalid
         */
        peek(index: number): any;

        /**
         * Pulls a card from the deck from any position. The card at the requested position
         * is removed from the deck and returned. As with [[peek]],
         * a negative index may be used to count from the bottom of the deck.
         * If called without an `index` argument, this method is equivalent to
         * [[draw]].
         * 
         * @param index the optional position of the card to remove from the deck
         * @returns the removed card
         * @throws if the index is invalid
         */
        pull(index: number): any;

        /**
         * Returns the number of cards currently in this deck.
         */
        size(): number;

        /**
         * Creates a new deck, using items from an array to populate it.
         *
         * @param arrayLikeObject an array or array-like object to copy cards from
         * @returns a card deck consisting of objects copied from the argument
         */
        static createFromArray(arrayLikeObject: ArrayLike<any>): CardDeck;


        /**
         * Returns a string consisting of a comma separated
         * list of the cards in this card deck.
         */
        toString(): string;

    }
}