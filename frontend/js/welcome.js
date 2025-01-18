// Check if user is logged in
const username = localStorage.getItem('username');
const token = localStorage.getItem('token');

if (!username || !token) {
    window.location.href = 'login.html';
}

// Display username
document.getElementById('username').textContent = username;

// Logout function
function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}
