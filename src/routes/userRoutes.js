const router = require("express").Router();
const protect = require("../middleware/protect");
const authorize = require("../middleware/authorize");
const user = require("../controllers/userController");

router.use(protect); // all user routes need login

router.put("/me", user.updateMe);
router.delete("/me", user.deleteMe);

// admin only
router.get("/", authorize("admin"), user.getAllUsers);
router.delete("/:id", authorize("admin"), user.deleteUser);

module.exports = router;