const router = require("express").Router();
const protect = require("../middleware/protect");
const task = require("../controllers/taskController");

router.use(protect); // all task routes need login

router.route("/").get(task.getTasks).post(task.createTask);
router.route("/:id").get(task.getTask).put(task.updateTask).delete(task.deleteTask);

module.exports = router;