const router = require("express").Router();

router.use("/auth", require("./authRoutes"));
router.use("/users", require("./userRoutes"));   // Phase 5
router.use("/tasks", require("./taskRoutes"));   // Phase 6

module.exports = router;