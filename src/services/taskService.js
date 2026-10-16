const taskRepository = require("../repositories/taskRepository");
const AppError = require("../utils/AppError");

const VALID_STATUS = ["todo", "in-progress", "done"];

class TaskService {
  createTask(userId, { title, description, status, dueDate } = {}) {
    if (!title) throw new AppError("Title is required", 400);
    return taskRepository.create({ title, description, status, dueDate, user: userId });
  }

  getTasks(userId, status) {
    if (status && !VALID_STATUS.includes(status)) {
      throw new AppError("Invalid status", 400);
    }
    return taskRepository.findAllByUser(userId, status ? { status } : {});
  }

  async getTask(userId, id) {
    const task = await taskRepository.findByIdAndUser(id, userId);
    if (!task) throw new AppError("Task not found", 404);
    return task;
  }

  async updateTask(userId, id, { title, description, status, dueDate } = {}) {
    // only these fields can change (the owner can't be changed)
    const task = await taskRepository.update(id, userId, { title, description, status, dueDate });
    if (!task) throw new AppError("Task not found", 404);
    return task;
  }

  async deleteTask(userId, id) {
    const task = await taskRepository.delete(id, userId);
    if (!task) throw new AppError("Task not found", 404);
  }
}

module.exports = new TaskService();