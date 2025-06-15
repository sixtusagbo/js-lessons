// Personal Info Calculator
// This project demonstrates variables, data types, and basic operations


console.log("Personal Info Calculator");

// Variables
const firstName = "Sixtus";
const lastName = "Agbo";
let age = 25;
const birthYear = 1999;
const currentYear = 2025;

// Numbers
const height = 175; // in cm
const weight = 70; // in kg
const isStudent = true;

// Template literals
const fullName = `${firstName} ${lastName}`;
console.log(`Hello! My name is ${fullName}`);

// Age calculation
const calculatedAge = currentYear - birthYear;
console.log(`I was born in ${birthYear}, so I am ${calculatedAge} years old.`);

// BMI Calculation
// What is BMI?
// BMI - Body Mass Index
// BMI = weight (kg) / height^2 (m^2)
const heightInMeters = height / 100; // convert cm to meters
const bmi = weight / (heightInMeters * heightInMeters);
// Order of operations
// BODMAS - From Math class
// In programming, we also have sth similar, it's called PEMDAS
// P - Parentheses
// E - Exponents
// M - Multiplication
// D - Division
// A - Addition
// S - Subtraction
const roundedBMI = Math.round(bmi * 10) / 10; // Rounding to 1 decimal place

console.log(`Height: ${height}cm, Weight: ${weight}kg`);
console.log(`My BMI is ${roundedBMI}`);

// Arrays
const hobbies = ["basketball", "coding", "gaming", "travelling", "cooking"];
const numberOfHobbies = hobbies.length;
console.log(hobbies[4]);
console.log(hobbies[hobbies.length - 1]);
console.log(`I have ${numberOfHobbies} hobbies.`);
console.log(`Hobbies: ${hobbies.join(", ")}`);

// Objects
const person = {
    name: fullName,
    age: age,
    height: height,
    weight: weight,
    bmi: roundedBMI,
    hobbies: hobbies,
    // Objects can contain functions
    introduce: function () {
        console.log(`Hello! My name is ${this.name}`);
    },
    // It can also contain other objects
    address: {
        street: "123 Main St",
        city: "Lagos",
        state: "Lagos",
        zipCode: "10001",
    },
};

console.log('Complete person info: ', person);
console.log("My age is: ", person.age);
person.introduce();
console.log(person.address);
console.log(person.address.city);
