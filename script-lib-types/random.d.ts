/**
 * # random library
 * 
 * Support for random selection and random number generation.
 * 
 * Include this library by adding `useLibrary("random")` to your script.
 */

declare module random {
    /**
     * A shared global Random instance.
     */
    const random: Random;

    /**
     * A class that produces pseudorandom numbers.
     */
    class Random {
        /**
         * Creates a new Random instance.
         * 
         * @param seed an optional seed; if specified the Random instance will produce
         *     a reproducible sequence for testing purposes
         */
        constructor(seed?: number);

        /**
         * Returns a random number between 0 (inclusive) and 1 (exclusive).
         * Effectively the same as `Math.random()`, but uses the random number
         * generator of this Random object.
         * 
         * @returns a random number between 0 and 1
         */
        number(): number;

        /**
         * Returns a random integer between integers `m` and `n`, inclusive.
         * 
         * @param m one end of the number range
         * @param n the other end of the number range
         * @returns a random integer from `m` to `n` inclusive
         */
        pick(m: number, n: number): number;

        /**
         * Returns a random integer between `m` (inclusive) and `n`
         * (inclusive), but excluding the value of `excluded`.
         * 
         * @param excluded the excluded integer which is never to be returned
         * @param m one end of the range
         * @param n the other end of the range
         * @returns a random integer from `m` to `n` inclusive, but not `excluded`
         * @throws if no non-excluded choice is possible
         */
        pickOtherThan(excluded: number, m: number, n: number): number;

        /**
         * Returns the result of rolling a simulated 6-sided die.
         * Equivalent to `pick(1,6)`.
         * 
         * @returns a random number between 1 and 6
         */
        d6(): number;

        /**
         * Simulates rolling `n` dice.
         * 
         * @param n the number of dice to roll
         * @param showDice if true, an image of each die result is printed to the console
         * @returns an array of the `n` rolled numbers, in the order that they were selected
         */
        rollDice(n: number, showDice: boolean): number[];
    }

    /**
     * Extensions to the Array class.
     */
    interface Array {
        /**
         * Returns one element from the array, selected at random.
         * @returns a randomly selected array element
         * @throws if no choice is possible (because the array is empty)
         */
        pick(): any;

        /**
         * Returns one element from the array, selected at random,
         * except for the excluded value.
         * 
         * @param excluded the element to be excluded from selection
         * @returns a randomly selected array element other than excluded
         * @throws if no choice is possible (because the array is empty or has no element not excluded)
         */
        pickOtherThan(excluded: any): any;

        /** Shuffles the array elements into random order. */
        shuffle(): void;
    }
}
