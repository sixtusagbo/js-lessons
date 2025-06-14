// Weather App - Demonstrates API calls, async/await, and error handling
console.log("🌤️ Weather App Starting...");

// DOM Elements
const weatherForm = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const weatherDisplay = document.getElementById('weather-display');
const errorMessage = document.getElementById('error-message');
const retryBtn = document.getElementById('retry-btn');
const searchAgainBtn = document.getElementById('search-again');

// Weather display elements
const cityName = document.getElementById('city-name');
const weatherDate = document.getElementById('weather-date');
const tempValue = document.getElementById('temp-value');
const weatherEmoji = document.getElementById('weather-emoji');
const weatherDesc = document.getElementById('weather-desc');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const pressure = document.getElementById('pressure');

// Demo buttons
const demoLondon = document.getElementById('demo-london');
const demoTokyo = document.getElementById('demo-tokyo');
const demoError = document.getElementById('demo-error');

// Mock weather data for demonstration (since we don't have a real API key)
const mockWeatherData = {
    london: {
        name: "London",
        main: {
            temp: 15,
            feels_like: 13,
            humidity: 78,
            pressure: 1013
        },
        weather: [{
            main: "Clouds",
            description: "overcast clouds"
        }],
        wind: {
            speed: 3.2
        }
    },
    tokyo: {
        name: "Tokyo",
        main: {
            temp: 22,
            feels_like: 24,
            humidity: 65,
            pressure: 1020
        },
        weather: [{
            main: "Clear",
            description: "clear sky"
        }],
        wind: {
            speed: 2.1
        }
    },
    "new york": {
        name: "New York",
        main: {
            temp: 18,
            feels_like: 16,
            humidity: 72,
            pressure: 1015
        },
        weather: [{
            main: "Rain",
            description: "light rain"
        }],
        wind: {
            speed: 4.5
        }
    }
};

// Weather emoji mapping
const weatherEmojis = {
    "Clear": "☀️",
    "Clouds": "☁️",
    "Rain": "🌧️",
    "Drizzle": "🌦️",
    "Thunderstorm": "⛈️",
    "Snow": "❄️",
    "Mist": "🌫️",
    "Fog": "🌫️"
};

// Show different states
function showLoading() {
    hideAllStates();
    loading.style.display = 'block';
    console.log("🔄 Showing loading state");
}

function showError(message) {
    hideAllStates();
    error.style.display = 'block';
    errorMessage.textContent = message;
    console.log(`❌ Showing error: ${message}`);
}

function showWeather() {
    hideAllStates();
    weatherDisplay.style.display = 'block';
    console.log("✅ Showing weather data");
}

function hideAllStates() {
    loading.style.display = 'none';
    error.style.display = 'none';
    weatherDisplay.style.display = 'none';
}

// Simulate API call with mock data
async function fetchWeatherData(city) {
    console.log(`🌐 Fetching weather for: ${city}`);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const cityKey = city.toLowerCase();
    
    // Check if we have mock data for this city
    if (mockWeatherData[cityKey]) {
        console.log(`📦 Found mock data for ${city}`);
        return mockWeatherData[cityKey];
    }
    
    // Simulate API error for unknown cities
    throw new Error(`Weather data not available for "${city}". Try London, Tokyo, or New York.`);
}

// Real API call function (commented out - would need API key)
/*
async function fetchWeatherDataReal(city) {
    const API_KEY = 'your-openweathermap-api-key';
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}
*/

// Display weather data
function displayWeather(data) {
    console.log("🎨 Displaying weather data:", data);
    
    // Update city and date
    cityName.textContent = data.name;
    weatherDate.textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Update temperature
    tempValue.textContent = Math.round(data.main.temp);
    
    // Update weather icon and description
    const weatherMain = data.weather[0].main;
    weatherEmoji.textContent = weatherEmojis[weatherMain] || "🌤️";
    weatherDesc.textContent = data.weather[0].description;
    
    // Update details
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} m/s`;
    pressure.textContent = `${data.main.pressure} hPa`;
    
    showWeather();
}

// Handle weather search
async function handleWeatherSearch(city) {
    if (!city || city.trim() === '') {
        showError('Please enter a city name');
        return;
    }
    
    try {
        showLoading();
        const weatherData = await fetchWeatherData(city.trim());
        displayWeather(weatherData);
    } catch (error) {
        console.error('Weather fetch error:', error);
        showError(error.message || 'Failed to fetch weather data. Please try again.');
    }
}

// Event Listeners
weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = cityInput.value;
    await handleWeatherSearch(city);
});

retryBtn.addEventListener('click', async () => {
    const city = cityInput.value;
    await handleWeatherSearch(city);
});

searchAgainBtn.addEventListener('click', () => {
    hideAllStates();
    cityInput.value = '';
    cityInput.focus();
});

// Demo button event listeners
demoLondon.addEventListener('click', async () => {
    cityInput.value = 'London';
    await handleWeatherSearch('London');
});

demoTokyo.addEventListener('click', async () => {
    cityInput.value = 'Tokyo';
    await handleWeatherSearch('Tokyo');
});

demoError.addEventListener('click', async () => {
    cityInput.value = 'InvalidCity';
    await handleWeatherSearch('InvalidCity');
});

// Initialize app
function initWeatherApp() {
    console.log("🚀 Initializing Weather App...");
    cityInput.focus();
    
    // Show a demo on load
    setTimeout(() => {
        console.log("🎬 Running demo...");
        handleWeatherSearch('London');
    }, 2000);
}

// Start the app
document.addEventListener('DOMContentLoaded', initWeatherApp);

// Educational logging for demonstration
console.log(`
🎓 Weather App Educational Notes:

1. Async/Await: We use async/await to handle asynchronous API calls
2. Error Handling: Try-catch blocks handle network and API errors
3. Loading States: Users see feedback while data is being fetched
4. JSON Parsing: API responses are automatically parsed as JSON
5. DOM Manipulation: Weather data dynamically updates the UI

Try the demo buttons to see different scenarios!
`);
