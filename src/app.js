const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Allow the React UI to call this API from another origin (port 5173)
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Task Manager API is running" });
});



// Routes will be added here in Phase 3
app.use("/api", require("./routes"));

// 404: route not found
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler (must be LAST)
app.use(errorHandler);

module.exports = app;