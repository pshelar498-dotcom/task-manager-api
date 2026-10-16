const router = require("express").Router();
const protect = require("../middleware/protect");
const auth = require("../controllers/authController");

// Public routes (no login needed)
router.post("/register", auth.register);
router.post("/login", auth.login);

// Protected routes (login needed)
router.get("/me", protect, auth.getMe);
router.put("/change-password", protect, auth.changePassword);

module.exports = router;