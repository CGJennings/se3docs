/*
 * guessing-game.js - version 2
 *
 * Demonstrates the use of some of the functions in the
 * common and random libraries by playing a guessing game
 * where the user must guess a number between 1 and 100
 * chosen by the script.
 */

useLibrary('random');

// The number of guesses to give the user.
// Since ceil(log2(100)) = 7, 7 attempts is sufficient
// to guarantee a win with perfect play.
const MAX_ATTEMPTS = 6;

let guess;
let message;
do {
    message = 'I am thinking of a number between 1 and 100.';
    let number = random.pick(1, 100);
    let attempt = 1;

    do {
        guess = prompt(message);
        if (guess == null) break;

        if (guess < number) {
            message = 'Too low. ';
        } else {
            message = 'Too high. ';
        }

        if (attempt == 1) {
            message += 'What\'s your second guess?';
        } else if (attempt < MAX_ATTEMPTS - 1) {
            message += 'You have ' + (MAX_ATTEMPTS - attempt) + ' more guesses.';
        } else {
            message += 'Last guess!';
        }
    } while (attempt++ < MAX_ATTEMPTS && guess != number);

    if (guess == number) {
        message = 'You got it!';
    } else {
        message = 'Close! I was thinking of ' + number + '.';
    }

} while (guess != null && confirm.yesno(message + ' Play again?'));