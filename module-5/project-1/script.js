// Personal Info Calculator
// This project demonstrates variables, data types, and basic operations

console.log("🧮 Personal Info Calculator Starting...");

// Variables and Data Types
const firstName = "Alex";
const lastName = "Johnson";
let age = 25;
const birthYear = 1999;
const currentYear = 2024;

// Numbers and calculations
const height = 175; // cm
const weight = 70; // kg
const isStudent = true;

// Template literals (modern string formatting)
const fullName = `${firstName} ${lastName}`;
console.log(`Hello! My name is ${fullName}`);

// Age calculation
const calculatedAge = currentYear - birthYear;
console.log(`Born in ${birthYear}, so you are ${calculatedAge} years old`);

// BMI calculation (Body Mass Index)
const heightInMeters = height / 100;
const bmi = weight / (heightInMeters * heightInMeters);
const roundedBMI = Math.round(bmi * 10) / 10; // Round to 1 decimal place

console.log(`Height: ${height}cm, Weight: ${weight}kg`);
console.log(`Your BMI is: ${roundedBMI}`);

// Arrays - storing multiple values
const hobbies = ["reading", "coding", "gaming", "cooking"];
const numberOfHobbies = hobbies.length;

console.log(`You have ${numberOfHobbies} hobbies: ${hobbies.join(", ")}`);

// Objects - storing related data together
const person = {
    name: fullName,
    age: age,
    height: height,
    weight: weight,
    bmi: roundedBMI,
    isStudent: isStudent,
    hobbies: hobbies
};

console.log("Complete person info:", person);

// Display results on the webpage
const outputDiv = document.getElementById('output');
outputDiv.innerHTML = `
    <div class="output">
        <h3>📊 Your Personal Info</h3>
        <p><strong>Name:</strong> ${person.name}</p>
        <p><strong>Age:</strong> ${person.age} years old</p>
        <p><strong>BMI:</strong> ${person.bmi}</p>
        <p><strong>Student:</strong> ${person.isStudent ? 'Yes' : 'No'}</p>
        <p><strong>Hobbies:</strong> ${person.hobbies.join(', ')}</p>
    </div>
`;

// Challenge for students: Try changing the values above and refresh the page!
console.log("💡 Try changing the values at the top of script.js and refresh to see different results!");
