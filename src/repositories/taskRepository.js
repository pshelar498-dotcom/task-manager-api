const Task = require("../models/Task");

class TaskRepository {
  create(data) {
    return Task.create(data);
  }

  findAllByUser(userId, filter = {}) {
    return Task.find({ user: userId, ...filter }).sort({ createdAt: -1 });
  }

  findByIdAndUser(id, userId) {
    return Task.findOne({ _id: id, user: userId });
  }

  update(id, userId, data) {
    return Task.findOneAndUpdate({ _id: id, user: userId }, data, {
      new: true,
      runValidators: true,
    });
  }

  delete(id, userId) {
    return Task.findOneAndDelete({ _id: id, user: userId });
  }

  deleteAllByUser(userId) {
    return Task.deleteMany({ user: userId });
  }
}

module.exports = new TaskRepository();