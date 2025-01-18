// frontend/js/welcome.js

// Check if user is logged in
const token = localStorage.getItem('token');
const username = localStorage.getItem('username');

if (!token || !username) {
    window.location.href = '/public/login.html';
}

// Display username
document.getElementById('username').textContent = username;

// Logout function
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/public/login.html';
}
