// Interactive To-Do List
// Demonstrates DOM manipulation, events, and local storage

console.log("📝 To-Do List App Starting...");

// DOM Elements - Getting references to HTML elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const emptyState = document.getElementById('empty-state');
const clearCompletedBtn = document.getElementById('clear-completed');

// Stats elements
const totalTasksEl = document.getElementById('total-tasks');
const completedTasksEl = document.getElementById('completed-tasks');
const remainingTasksEl = document.getElementById('remaining-tasks');

// Array to store all tasks
let tasks = [];

// Load tasks from localStorage when page loads
function loadTasks() {
    const savedTasks = localStorage.getItem('todoTasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        console.log(`📂 Loaded ${tasks.length} tasks from storage`);
    }
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
    console.log(`💾 Saved ${tasks.length} tasks to storage`);
}

// Generate unique ID for each task
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Create a new task object
function createTask(text) {
    return {
        id: generateId(),
        text: text,
        completed: false,
        createdAt: new Date().toLocaleTimeString()
    };
}

// Add new task
function addTask(text) {
    const task = createTask(text);
    tasks.push(task);
    console.log(`➕ Added task: "${text}"`);
    
    saveTasks();
    renderTasks();
    updateStats();
}

// Toggle task completion
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        console.log(`✅ Toggled task: "${task.text}" - ${task.completed ? 'completed' : 'pending'}`);
        
        saveTasks();
        renderTasks();
        updateStats();
    }
}

// Delete task
function deleteTask(id) {
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex > -1) {
        const deletedTask = tasks.splice(taskIndex, 1)[0];
        console.log(`🗑️ Deleted task: "${deletedTask.text}"`);
        
        saveTasks();
        renderTasks();
        updateStats();
    }
}

// Clear all completed tasks
function clearCompleted() {
    const completedCount = tasks.filter(t => t.completed).length;
    tasks = tasks.filter(t => !t.completed);
    console.log(`🧹 Cleared ${completedCount} completed tasks`);
    
    saveTasks();
    renderTasks();
    updateStats();
}

// Create HTML for a single task
function createTaskHTML(task) {
    return `
        <li class="task-item ${task.completed ? 'completed' : ''} fade-in" data-id="${task.id}">
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <span class="task-text">${task.text}</span>
            <span class="task-time">${task.createdAt}</span>
            <button class="delete-btn">🗑️</button>
        </li>
    `;
}

// Render all tasks to the DOM
function renderTasks() {
    // Clear the task list
    taskList.innerHTML = '';
    
    if (tasks.length === 0) {
        emptyState.style.display = 'block';
        clearCompletedBtn.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        
        // Show/hide clear completed button
        const hasCompleted = tasks.some(t => t.completed);
        clearCompletedBtn.style.display = hasCompleted ? 'block' : 'none';
        
        // Render each task
        tasks.forEach(task => {
            taskList.innerHTML += createTaskHTML(task);
        });
        
        // Add event listeners to the newly created elements
        addTaskEventListeners();
    }
}

// Add event listeners to task elements
function addTaskEventListeners() {
    // Checkbox event listeners
    const checkboxes = document.querySelectorAll('.task-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const taskId = e.target.closest('.task-item').dataset.id;
            toggleTask(taskId);
        });
    });
    
    // Delete button event listeners
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const taskId = e.target.closest('.task-item').dataset.id;
            deleteTask(taskId);
        });
    });
}

// Update statistics
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const remaining = total - completed;
    
    totalTasksEl.textContent = total;
    completedTasksEl.textContent = completed;
    remainingTasksEl.textContent = remaining;
    
    console.log(`📊 Stats - Total: ${total}, Completed: ${completed}, Remaining: ${remaining}`);
}

// Event Listeners
taskForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form from submitting normally
    
    const text = taskInput.value.trim();
    if (text) {
        addTask(text);
        taskInput.value = ''; // Clear the input
        taskInput.focus(); // Keep focus on input for easy adding
    }
});

clearCompletedBtn.addEventListener('click', clearCompleted);

// Initialize the app
function init() {
    console.log("🚀 Initializing To-Do List App...");
    loadTasks();
    renderTasks();
    updateStats();
    taskInput.focus(); // Focus on input when page loads
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Demo: Add some sample tasks if none exist
setTimeout(() => {
    if (tasks.length === 0) {
        console.log("📝 Adding demo tasks...");
        addTask("Learn JavaScript fundamentals");
        addTask("Build a to-do list app");
        addTask("Practice DOM manipulation");
        
        // Mark first task as completed for demo
        if (tasks.length > 0) {
            toggleTask(tasks[0].id);
        }
    }
}, 1000);
