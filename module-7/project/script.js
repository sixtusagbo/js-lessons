// Simple Blog Reader - Demonstrates API integration with JSONPlaceholder
console.log("📝 Simple Blog Reader Starting...");

// DOM Elements
const loadPostsBtn = document.getElementById('load-posts-btn');
const clearPostsBtn = document.getElementById('clear-posts-btn');
const postsContainer = document.getElementById('posts-container');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const errorMessage = document.getElementById('error-message');
const retryBtn = document.getElementById('retry-btn');

// API Configuration
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';
const POSTS_ENDPOINT = `${API_BASE_URL}/posts`;

// State management
let posts = [];
let isLoading = false;

// Show different UI states
function showLoading() {
    loading.style.display = 'block';
    error.style.display = 'none';
    postsContainer.innerHTML = '';
    console.log("🔄 Showing loading state");
}

function showError(message) {
    loading.style.display = 'none';
    error.style.display = 'block';
    postsContainer.innerHTML = '';
    errorMessage.textContent = message;
    console.log(`❌ Showing error: ${message}`);
}

function showPosts() {
    loading.style.display = 'none';
    error.style.display = 'none';
    console.log("✅ Showing posts");
}

// Fetch posts from JSONPlaceholder API
async function fetchPosts() {
    console.log("🌐 Fetching posts from JSONPlaceholder...");
    
    try {
        // Make the API request
        const response = await fetch(POSTS_ENDPOINT);
        
        // Check if the response is ok
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Parse the JSON data
        const data = await response.json();
        
        console.log(`📦 Received ${data.length} posts from API`);
        return data;
        
    } catch (error) {
        console.error('❌ Error fetching posts:', error);
        
        // Provide user-friendly error messages
        if (error.message.includes('fetch')) {
            throw new Error('Unable to connect to the server. Please check your internet connection.');
        } else if (error.message.includes('HTTP error')) {
            throw new Error('Server error. Please try again later.');
        } else {
            throw new Error('Something went wrong. Please try again.');
        }
    }
}

// Create HTML for a single post
function createPostHTML(post) {
    return `
        <div class="post-card fade-in">
            <div class="post-header">
                <span class="post-id">#${post.id}</span>
                <span class="post-user">User ${post.userId}</span>
            </div>
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
        </div>
    `;
}

// Display posts in the UI
function displayPosts(postsData) {
    console.log(`🎨 Displaying ${postsData.length} posts`);
    
    // Clear existing content
    postsContainer.innerHTML = '';
    
    // Limit to first 10 posts for better performance and UX
    const postsToShow = postsData.slice(0, 10);
    
    // Create and add each post
    postsToShow.forEach(post => {
        postsContainer.innerHTML += createPostHTML(post);
    });
    
    // Show the clear button
    clearPostsBtn.style.display = 'inline-block';
    
    // Update button text
    loadPostsBtn.textContent = 'Reload Posts';
    
    showPosts();
}

// Clear all posts
function clearPosts() {
    console.log("🗑️ Clearing all posts");
    
    postsContainer.innerHTML = '';
    clearPostsBtn.style.display = 'none';
    loadPostsBtn.textContent = 'Load Blog Posts';
    posts = [];
}

// Main function to load and display posts
async function loadPosts() {
    if (isLoading) return; // Prevent multiple simultaneous requests
    
    isLoading = true;
    loadPostsBtn.disabled = true;
    
    try {
        showLoading();
        
        // Fetch posts from API
        const postsData = await fetchPosts();
        
        // Store posts in our state
        posts = postsData;
        
        // Display the posts
        displayPosts(posts);
        
    } catch (error) {
        console.error('Failed to load posts:', error);
        showError(error.message);
        
    } finally {
        isLoading = false;
        loadPostsBtn.disabled = false;
    }
}

// Event Listeners
loadPostsBtn.addEventListener('click', loadPosts);
clearPostsBtn.addEventListener('click', clearPosts);
retryBtn.addEventListener('click', loadPosts);

// Initialize the app
function initBlogReader() {
    console.log("🚀 Initializing Simple Blog Reader...");
    console.log("📡 Ready to fetch data from JSONPlaceholder API");
    console.log("🎯 Click 'Load Blog Posts' to see real API data!");
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initBlogReader);

// Educational logging for demonstration
console.log(`
🎓 Simple Blog Reader Educational Notes:

1. Real API Integration: Uses JSONPlaceholder, a real REST API
2. Async/Await: Clean, readable asynchronous code
3. Error Handling: Network errors, HTTP errors, and user feedback
4. Loading States: Users see feedback while data loads
5. JSON Parsing: API response automatically parsed as JSON
6. DOM Manipulation: Dynamic content creation and updates

API Endpoint: ${POSTS_ENDPOINT}
Try opening this URL in your browser to see the raw JSON data!
`);

// Bonus: Demonstrate the fetch process step by step
async function demonstrateFetchProcess() {
    console.log("\n🔍 Let's break down the fetch process:");
    console.log("1. fetch(url) - Makes HTTP request");
    console.log("2. response.ok - Checks if request succeeded");
    console.log("3. response.json() - Parses JSON data");
    console.log("4. Display data - Updates the UI");
    console.log("\nClick 'Load Blog Posts' to see this in action!");
}

// Run the demonstration
setTimeout(demonstrateFetchProcess, 2000);
