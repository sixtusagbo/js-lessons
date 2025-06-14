// Number Guessing Game
// This project demonstrates functions, conditionals, loops, and arrays

// Custom console.log that also displays on the webpage
function gameLog(message) {
    console.log(message);
    const output = document.getElementById('console-output');
    output.innerHTML += `<div>${message}</div>`;
    output.scrollTop = output.scrollHeight;
}

gameLog("🎯 Welcome to the Number Guessing Game!");
gameLog("=" .repeat(40));

// Function to generate random number between min and max (inclusive)
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to check if a guess is correct, too high, or too low
function checkGuess(guess, target) {
    if (guess === target) {
        return "correct";
    } else if (guess < target) {
        return "too low";
    } else {
        return "too high";
    }
}

// Function to provide feedback based on the result
function giveFeedback(result, guess, attempts) {
    if (result === "correct") {
        return `🎉 Congratulations! ${guess} is correct! You won in ${attempts} attempts!`;
    } else if (result === "too low") {
        return `📈 ${guess} is too low. Try a higher number!`;
    } else {
        return `📉 ${guess} is too high. Try a lower number!`;
    }
}

// Main game logic
function playGame() {
    // Game setup
    const minNumber = 1;
    const maxNumber = 10;
    const secretNumber = getRandomNumber(minNumber, maxNumber);
    const maxAttempts = 4;
    
    gameLog(`🎲 I'm thinking of a number between ${minNumber} and ${maxNumber}`);
    gameLog(`🎯 You have ${maxAttempts} attempts to guess it!`);
    gameLog("");
    
    // Array to store all guesses
    const allGuesses = [];
    
    // Simulate player guesses (in a real game, these would come from user input)
    const playerGuesses = [3, 7, 5, secretNumber]; // Last guess is always correct for demo
    
    // Game loop
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        const currentGuess = playerGuesses[attempt - 1] || getRandomNumber(minNumber, maxNumber);
        
        gameLog(`Attempt ${attempt}: Guessing ${currentGuess}...`);
        
        // Add guess to our array
        allGuesses.push(currentGuess);
        
        // Check the guess
        const result = checkGuess(currentGuess, secretNumber);
        const feedback = giveFeedback(result, currentGuess, attempt);
        
        gameLog(feedback);
        
        // If correct, end the game
        if (result === "correct") {
            gameLog("");
            gameLog("🏆 Game Over - You Won!");
            gameLog(`📊 Your guesses: [${allGuesses.join(", ")}]`);
            return; // Exit the function early
        }
        
        gameLog(""); // Empty line for readability
    }
    
    // If we get here, player ran out of attempts
    gameLog("💔 Game Over - You ran out of attempts!");
    gameLog(`🔍 The secret number was: ${secretNumber}`);
    gameLog(`📊 Your guesses: [${allGuesses.join(", ")}]`);
}

// Function to demonstrate different data types and operations
function demonstrateBasics() {
    gameLog("");
    gameLog("📚 Let's review some JavaScript basics:");
    gameLog("-".repeat(35));
    
    // Variables and data types
    const gameTitle = "Number Guessing Game";
    const version = 1.0;
    const isActive = true;
    const features = ["random numbers", "feedback", "attempt tracking"];
    
    gameLog(`Game: ${gameTitle} v${version}`);
    gameLog(`Active: ${isActive}`);
    gameLog(`Features: ${features.join(", ")}`);
    
    // Conditional logic
    const difficulty = "easy";
    let maxRange;
    
    if (difficulty === "easy") {
        maxRange = 10;
    } else if (difficulty === "medium") {
        maxRange = 50;
    } else {
        maxRange = 100;
    }
    
    gameLog(`Difficulty: ${difficulty} (1-${maxRange})`);
    
    // Loop example
    gameLog("Counting down: ");
    let countdown = "";
    for (let i = 5; i >= 1; i--) {
        countdown += i + "... ";
    }
    countdown += "Go! 🚀";
    gameLog(countdown);
}

// Start the game
gameLog("🎮 Starting game simulation...");
gameLog("");

playGame();
demonstrateBasics();

gameLog("");
gameLog("💡 Try modifying the playerGuesses array in game.js to test different scenarios!");
gameLog("🔄 Refresh the page to see the game run again with a new random number!");
