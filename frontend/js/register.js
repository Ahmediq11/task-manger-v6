// Constants
const API_BASE_URL = "/api";

// Form validation
function validateForm(username, email, password) {
    if (!username || username.length < 3) {
        return "Username must be at least 3 characters long";
    }
    if (!email || !email.includes('@')) {
        return "Please enter a valid email address";
    }
    if (!password || password.length < 6) {
        return "Password must be at least 6 characters long";
    }
    return null;
}

// Clear previous error messages
function clearErrors() {
    const existingErrors = document.querySelectorAll('.alert');
    existingErrors.forEach(error => error.remove());
}

// Show error message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.textContent = message;
    document.getElementById("registerForm").prepend(errorDiv);
}

// Show success message
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success';
    successDiv.textContent = message;
    document.getElementById("registerForm").prepend(successDiv);
}

// Main registration handler
document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Clear any existing error messages
    clearErrors();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Validate form
    const validationError = validateForm(username, email, password);
    if (validationError) {
        showError(validationError);
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            showSuccess("Registration successful! Redirecting to login...");
            // Redirect to login page after a short delay
            setTimeout(() => {
                window.location.href = "/login.html";
            }, 2000);
        } else {
            showError(data.message || "Registration failed");
        }
    } catch (error) {
        console.error("Error:", error);
        showError("An error occurred during registration");
    }
});
