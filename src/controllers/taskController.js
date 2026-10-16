const taskService = require("../services/taskService");

exports.createTask = async (req, res) => {
  res.status(201).json(await taskService.createTask(req.user.id, req.body));
};

exports.getTasks = async (req, res) => {
  res.json(await taskService.getTasks(req.user.id, req.query.status));
};

exports.getTask = async (req, res) => {
  res.json(await taskService.getTask(req.user.id, req.params.id));
};

exports.updateTask = async (req, res) => {
  res.json(await taskService.updateTask(req.user.id, req.params.id, req.body));
};

exports.deleteTask = async (req, res) => {
  await taskService.deleteTask(req.user.id, req.params.id);
  res.json({ message: "Task deleted" });
};