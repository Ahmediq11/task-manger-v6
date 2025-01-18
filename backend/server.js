const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend')));

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Update JWT secret to use environment variable
const JWT_SECRET = process.env.JWT_SECRET;

// JWT Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

// API Routes
app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, redirect: "/dashboard.html" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Task routes
app.get("/api/tasks", authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId }).sort({
      created_at: -1,
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

app.post("/api/tasks", authenticateToken, async (req, res) => {
  try {
    const { title } = req.body;
    const taskCount = await Task.countDocuments({ userId: req.user.userId });

    if (taskCount >= 10) {
      return res.status(400).json({ message: "Task limit reached (max 10)" });
    }

    const task = new Task({
      userId: req.user.userId,
      title,
    });

    await task.save();
    res.status(201).json({
      id: task._id,
      message: "Task created",
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
});

app.patch("/api/tasks/:id", authenticateToken, async (req, res) => {
  try {
    const { completed } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { completed },
      { new: true }
    );

    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }

    res.json({ message: "Task updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
});

app.delete("/api/tasks/:id", authenticateToken, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
});

// Serve index.html for root route

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/public/index.html"));
// });
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
