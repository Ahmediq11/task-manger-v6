// Constants
const API_BASE_URL = "/api";
const MAX_TASKS = 10;

// Check authentication
const token = localStorage.getItem("token");
const username = localStorage.getItem("username");

if (!token || !username) {
    window.location.href = "/login.html";
}

// Set username in navbar
document.getElementById("username").textContent = username;

// Update task count
function updateTaskCount(activeCount) {
    document.getElementById("taskCount").textContent = `${activeCount}/${MAX_TASKS}`;
    if (activeCount >= MAX_TASKS) {
        document.getElementById("taskInput").disabled = true;
        showFeedback("You've reached the maximum number of tasks (10)", "warning");
    } else {
        document.getElementById("taskInput").disabled = false;
    }
}

// Show feedback message
function showFeedback(message, type = "success") {
    const feedbackDiv = document.getElementById("feedback");
    feedbackDiv.textContent = message;
    feedbackDiv.className = `alert alert-${type}`;
    feedbackDiv.classList.remove("d-none");
    setTimeout(() => {
        feedbackDiv.classList.add("d-none");
    }, 3000);
}

// Create task element
function createTaskElement(task) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center fade-in";
    li.setAttribute("data-id", task._id);

    const taskContent = document.createElement("div");
    taskContent.className = "d-flex align-items-center";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "form-check-input me-2";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleTaskStatus(task._id, checkbox.checked));

    const taskText = document.createElement("span");
    taskText.textContent = task.title;
    if (task.completed) {
        taskText.className = "text-muted text-decoration-line-through";
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(task._id));

    taskContent.appendChild(checkbox);
    taskContent.appendChild(taskText);
    li.appendChild(taskContent);
    li.appendChild(deleteBtn);

    return li;
}

// Load tasks
async function loadTasks() {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: 'include'
        });

        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                localStorage.removeItem("token");
                localStorage.removeItem("username");
                window.location.href = "/login.html";
                return;
            }
            throw new Error("Failed to fetch tasks");
        }

        const tasks = await response.json();
        const activeTasks = tasks.filter(task => !task.completed);
        const completedTasks = tasks.filter
