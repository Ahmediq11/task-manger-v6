// Update API endpoints
const API_BASE_URL = window.location.origin + "/api";

// Update fetch calls
async function loadTasks() {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to load tasks");
    }

    const tasks = await response.json();
    // Rest of the code remains the same
  } catch (error) {
    showFeedback(error.message, "danger");
  }
}

document.getElementById("taskForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const input = document.getElementById("taskInput");
  const title = input.value.trim();

  if (!title) return;

  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title }),
    });

    // Rest of the code remains the same
  } catch (error) {
    showFeedback(error.message, "danger");
  }
});

// Update other fetch calls similarly
