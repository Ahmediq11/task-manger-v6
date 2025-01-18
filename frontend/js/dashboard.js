// frontend/js/dashboard.js

const API_BASE_URL = window.location.origin + '/api';

// Check if user is logged in
const token = localStorage.getItem('token');
if (!token) {
    window.location.href = '/public/login.html';
}

// Load tasks
async function loadTasks() {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const tasks = await response.json();
            // Update your UI with tasks
        } else {
            window.location.href = '/public/login.html';
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/public/login.html';
}
