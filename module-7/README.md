# Module 7: Working with APIs & Fetching Dynamic Data

## Intro

"In this module, we'll learn how to connect your site to the outside world. You'll use JavaScript to fetch data from APIs, work with JSON, and display dynamic content on your pages."

## Learning Objectives

By the end of this module, students will be able to:

- Understand what APIs are and how they work
- Use the Fetch API to make HTTP requests
- Handle JSON data and parse responses
- Display dynamic content from external sources
- Handle loading states and errors gracefully
- Work with asynchronous JavaScript (Promises and async/await)

## Topics Covered

### 1. APIs and HTTP Requests (8 minutes)

- What are APIs and why they're important
- HTTP methods (GET, POST, etc.)
- The Fetch API and making requests
- Handling responses and JSON data
- Error handling and status codes

### 2. Asynchronous JavaScript (7 minutes)

- Understanding Promises
- Using async/await syntax
- Loading states and user feedback
- Error handling best practices

## Project

### Simple Blog Reader

**Location**: `./project/`
**Time**: 10 minutes
**Concepts**: Real API integration, Fetch API, JSON handling, async/await, error handling, loading states

A clean blog reader that fetches real posts from JSONPlaceholder API and displays them with proper loading states and error handling. This project demonstrates the complete API workflow from request to display.

## Key Teaching Points

1. **APIs are everywhere** - Show real-world examples (weather, social media, etc.)
2. **Asynchronous nature** - Explain why we need to wait for data
3. **Error handling** - Always plan for things to go wrong
4. **User experience** - Show loading states and provide feedback
5. **JSON structure** - Demonstrate how to navigate API responses

## Live Demonstrations

- **Network tab**: Show actual HTTP requests in browser dev tools
- **API testing**: Use browser console to test fetch requests
- **Error simulation**: Disconnect internet to show error handling
- **JSON exploration**: Examine API response structure

## Common Mistakes to Address

- Forgetting to handle errors and loading states
- Not understanding asynchronous code execution
- Hardcoding API responses instead of handling dynamic data
- Not checking if API responses have the expected structure
- CORS issues when testing locally

## API Resources Used

- **OpenWeatherMap API**: For weather data (requires free API key)
- **Quotable API**: For inspirational quotes (no key required)
- **JSONPlaceholder**: For testing and demonstrations

## Security Considerations

- Never expose API keys in client-side code
- Understand CORS and same-origin policy
- Validate and sanitize data from external sources
- Rate limiting and API usage best practices

## Outro

"You just built a dynamic, data-driven web app! Now let's wrap up with mini projects that put everything you've learned into action."
