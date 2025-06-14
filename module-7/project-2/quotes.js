// Inspirational Quote Generator
// Demonstrates API calls, data transformation, and local storage

console.log("✨ Quote Generator Starting...");

// DOM Elements
const newQuoteBtn = document.getElementById('new-quote-btn');
const quoteText = document.getElementById('quote-text');
const authorName = document.getElementById('author-name');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const quoteDisplay = document.getElementById('quote-display');
const errorMessage = document.getElementById('error-message');
const retryBtn = document.getElementById('retry-btn');

// Action buttons
const copyBtn = document.getElementById('copy-btn');
const tweetBtn = document.getElementById('tweet-btn');
const favoriteBtn = document.getElementById('favorite-btn');

// Category buttons
const categoryButtons = document.querySelectorAll('.category-btn');

// Favorites
const favoritesList = document.getElementById('favorites-list');
const clearFavoritesBtn = document.getElementById('clear-favorites');

// Current state
let currentQuote = null;
let currentCategory = 'all';
let favorites = [];

// Mock quotes database (simulating API responses)
const quotesDatabase = {
    motivational: [
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
        { text: "Your limitation—it's only your imagination.", author: "Unknown" },
        { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown" }
    ],
    wisdom: [
        { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
        { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
        { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
        { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" }
    ],
    success: [
        { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
        { text: "The road to success and the road to failure are almost exactly the same.", author: "Colin R. Davis" },
        { text: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
        { text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller" }
    ],
    life: [
        { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
        { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
        { text: "Life is 10% what happens to you and 90% how you react to it.", author: "Charles R. Swindoll" },
        { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", author: "Martin Luther King Jr." }
    ]
};

// Get all quotes for 'all' category
function getAllQuotes() {
    return Object.values(quotesDatabase).flat();
}

// Show different states
function showLoading() {
    loading.style.display = 'flex';
    quoteDisplay.style.display = 'none';
    error.style.display = 'none';
    console.log("🔄 Showing loading state");
}

function showError(message) {
    loading.style.display = 'none';
    quoteDisplay.style.display = 'none';
    error.style.display = 'flex';
    errorMessage.textContent = message;
    console.log(`❌ Showing error: ${message}`);
}

function showQuote() {
    loading.style.display = 'none';
    quoteDisplay.style.display = 'block';
    error.style.display = 'none';
    console.log("✅ Showing quote");
}

// Simulate API call
async function fetchQuote(category = 'all') {
    console.log(`🌐 Fetching quote from category: ${category}`);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate occasional network errors (10% chance)
    if (Math.random() < 0.1) {
        throw new Error('Network error: Unable to fetch quote. Please try again.');
    }
    
    // Get quotes from selected category
    let quotes;
    if (category === 'all') {
        quotes = getAllQuotes();
    } else {
        quotes = quotesDatabase[category] || [];
    }
    
    if (quotes.length === 0) {
        throw new Error(`No quotes available for category: ${category}`);
    }
    
    // Return random quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    
    console.log(`📦 Fetched quote: "${quote.text}" - ${quote.author}`);
    return quote;
}

// Display quote
function displayQuote(quote) {
    currentQuote = quote;
    quoteText.textContent = quote.text;
    authorName.textContent = `— ${quote.author}`;
    
    // Update favorite button state
    updateFavoriteButton();
    
    showQuote();
    console.log("🎨 Quote displayed");
}

// Handle new quote request
async function getNewQuote() {
    try {
        showLoading();
        const quote = await fetchQuote(currentCategory);
        displayQuote(quote);
    } catch (error) {
        console.error('Quote fetch error:', error);
        showError(error.message);
    }
}

// Copy quote to clipboard
async function copyQuote() {
    if (!currentQuote) return;
    
    const text = `"${currentQuote.text}" — ${currentQuote.author}`;
    
    try {
        await navigator.clipboard.writeText(text);
        copyBtn.textContent = '✅';
        setTimeout(() => {
            copyBtn.textContent = '📋';
        }, 2000);
        console.log("📋 Quote copied to clipboard");
    } catch (error) {
        console.error('Copy failed:', error);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        copyBtn.textContent = '✅';
        setTimeout(() => {
            copyBtn.textContent = '📋';
        }, 2000);
    }
}

// Share on Twitter
function shareOnTwitter() {
    if (!currentQuote) return;
    
    const text = `"${currentQuote.text}" — ${currentQuote.author}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    console.log("🐦 Opening Twitter share");
}

// Favorites management
function loadFavorites() {
    const saved = localStorage.getItem('favoriteQuotes');
    if (saved) {
        favorites = JSON.parse(saved);
        console.log(`💖 Loaded ${favorites.length} favorites`);
    }
}

function saveFavorites() {
    localStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
    console.log(`💾 Saved ${favorites.length} favorites`);
}

function toggleFavorite() {
    if (!currentQuote) return;
    
    const quoteId = `${currentQuote.text}-${currentQuote.author}`;
    const existingIndex = favorites.findIndex(fav => 
        fav.text === currentQuote.text && fav.author === currentQuote.author
    );
    
    if (existingIndex > -1) {
        // Remove from favorites
        favorites.splice(existingIndex, 1);
        console.log("💔 Removed from favorites");
    } else {
        // Add to favorites
        favorites.push({
            text: currentQuote.text,
            author: currentQuote.author,
            addedAt: new Date().toISOString()
        });
        console.log("💖 Added to favorites");
    }
    
    saveFavorites();
    updateFavoriteButton();
    renderFavorites();
}

function updateFavoriteButton() {
    if (!currentQuote) return;
    
    const isFavorite = favorites.some(fav => 
        fav.text === currentQuote.text && fav.author === currentQuote.author
    );
    
    favoriteBtn.classList.toggle('active', isFavorite);
}

function renderFavorites() {
    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p class="no-favorites">No favorites yet. Click the ❤️ button to save quotes!</p>';
        clearFavoritesBtn.style.display = 'none';
    } else {
        favoritesList.innerHTML = favorites.map(fav => `
            <div class="favorite-item">
                <div class="favorite-quote">"${fav.text}"</div>
                <div class="favorite-author">— ${fav.author}</div>
            </div>
        `).join('');
        clearFavoritesBtn.style.display = 'block';
    }
}

function clearAllFavorites() {
    if (confirm('Are you sure you want to clear all favorites?')) {
        favorites = [];
        saveFavorites();
        renderFavorites();
        updateFavoriteButton();
        console.log("🗑️ Cleared all favorites");
    }
}

// Category selection
function selectCategory(category) {
    currentCategory = category;
    
    // Update active button
    categoryButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });
    
    console.log(`📂 Selected category: ${category}`);
    getNewQuote();
}

// Event Listeners
newQuoteBtn.addEventListener('click', getNewQuote);
retryBtn.addEventListener('click', getNewQuote);
copyBtn.addEventListener('click', copyQuote);
tweetBtn.addEventListener('click', shareOnTwitter);
favoriteBtn.addEventListener('click', toggleFavorite);
clearFavoritesBtn.addEventListener('click', clearAllFavorites);

// Category button listeners
categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        selectCategory(btn.dataset.category);
    });
});

// Initialize app
function initQuoteApp() {
    console.log("🚀 Initializing Quote Generator...");
    loadFavorites();
    renderFavorites();
    
    // Load first quote
    setTimeout(() => {
        getNewQuote();
    }, 500);
}

// Start the app
document.addEventListener('DOMContentLoaded', initQuoteApp);

// Educational logging
console.log(`
🎓 Quote Generator Educational Notes:

1. Fetch API: Simulated API calls with async/await
2. Error Handling: Network errors and empty responses
3. Local Storage: Persistent favorites across sessions
4. Data Transformation: Processing and displaying API data
5. User Feedback: Loading states and success indicators

Features to explore:
- Try different categories
- Add quotes to favorites
- Copy quotes to clipboard
- Share on social media
`);
