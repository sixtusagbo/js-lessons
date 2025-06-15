
function gameLog(message) {
    console.log(message);
    const output = document.getElementById("console-output");
    output.innerHTML += `<div>${message}</div>`;
    output.scrollTop = output.scrollHeight;
}

gameLog('Welcome to the Number Guessing Game!');
gameLog("=".repeat(40));

// Function to generate a random number within a range
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to check if a guess is correct
function checkGuess(guess, target) {
    console.log("Check Guess called with:")
    console.log(guess, target);
    if (guess === target) {
        return "correct";
    } else if (guess < target) {
        return "low";
    } else {
        return "high";
    }
}

// Function to provide feedback based on the result
function giveFeedback(result, guess, attempts, secretNumber) {
    if (result === "correct") {
        return `🎉 Congratulations! ${guess} is correct! You won in ${attempts} attempts. Secret number: ${secretNumber}`;
    } else if (result === "low") {
        return `📉 ${guess} is too low! Try a higher number! Secret number: ${secretNumber}`;
    } else {
        return `📈 ${guess} is too high! Try a lower number! Secret number: ${secretNumber}`;
    }
}

let numberOfStudents = 300;
let numberOfChurches;
const foo = 'bar';

function hello() {
    const world = 'Earth';
    console.log("hello! I am sixtus");
    console.log(foo);
}

console.log(numberOfChurches);

hello();

numberOfChurches = 200;

console.log(numberOfChurches);

function playGame() {
    // Setup
    const minNumber = 1;
    const maxNumber = 10;
    const secretNumber = getRandomNumber(minNumber, maxNumber);
    const maxAttempts = 4;

    gameLog(`I'm thinking of a number between ${minNumber} and ${maxNumber}.`);
    gameLog(`You have ${maxAttempts} attempts to guess the number.`);

    // Array to store all guesses
    const guesses = [];

    // Use the prompt() function to get user input

    // The user can keep guessing till they get it right or they run out of attempts
    for (let attempts = 1; attempts <= maxAttempts; attempts++) {
        const guess = prompt("Enter your guess:");

        // Add the guess to the array
        guesses.push(guess);

        // Check if the guess is correct
        const result = checkGuess(guess, secretNumber);

        // Provide feedback
        const feedback = giveFeedback(result, guess, attempts, secretNumber);
        gameLog(feedback);

        // If the guess is correct, break out of the loop
        if (result === "correct") {
            gameLog("=".repeat(40));
            gameLog("You won!");
            break;
        }

        // If the user has run out of attempts, break out of the loop
        if (attempts === maxAttempts) {
            gameLog("You have run out of attempts. Game Over!");
            break;
        }
    }

    // Display feedback, the game is over...
    gameLog(`The secret number was ${secretNumber}.`);
    gameLog(`Your guesses: ${guesses.join(", ")}`);
    gameLog("=".repeat(40));
    gameLog("Game Over!");
}


