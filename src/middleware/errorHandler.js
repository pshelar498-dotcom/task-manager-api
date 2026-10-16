module.exports = (err, req, res, next) => {
  // Our own errors (AppError)
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  // Mongoose: invalid data
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(", ") });
  }
  // Mongoose: invalid ID format
  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid ID" });
  }
  // MongoDB: duplicate value (e.g. email already exists)
  if (err.code === 11000) {
    return res.status(409).json({ message: "Email already in use" });
  }
  // JWT errors
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  console.error(err);
  res.status(500).json({ message: "Something went wrong" });
};