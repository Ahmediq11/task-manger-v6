// frontend/js/login.js

// API base URL - this points to your backend API
const API_BASE_URL = "/api";
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username);
      window.location.href = "/dashboard.html";
    } else {
      alert(data.message || "Login failed");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred during login");
  }
});
