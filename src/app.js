const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Allow the React UI to call this API from another origin (port 5173)
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Task Manager API is running" });
});

// Liveness: "is the process alive?" (Kubernetes restarts the pod if this fails)
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Readiness: "can it handle requests?" (Kubernetes sends traffic only when this is 200)
app.get("/health/ready", (req, res) => {
  const dbConnected = mongoose.connection.readyState === 1; // 1 = connected
  res.status(dbConnected ? 200 : 503).json({
    status: dbConnected ? "ready" : "not ready",
    database: dbConnected ? "connected" : "disconnected",
  });
});

app.use("/api", require("./routes"));

// 404: route not found
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler (must be LAST)
app.use(errorHandler);

module.exports = app;