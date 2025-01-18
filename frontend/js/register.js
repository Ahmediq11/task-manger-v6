// Update API endpoint
const API_BASE_URL = window.location.origin + "/api";

document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      // Rest of the code remains the same
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during registration");
    }
  });
