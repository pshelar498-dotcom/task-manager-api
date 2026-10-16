const userRepository = require("../repositories/userRepository");
const taskRepository = require("../repositories/taskRepository");
const AppError = require("../utils/AppError");

class UserService {
  async updateProfile(userId, { name, email } = {}) {
    // only name and email can change here (not password, not role)
    const data = {};
    if (name) data.name = name;
    if (email) data.email = email;
    if (Object.keys(data).length === 0) {
      throw new AppError("Nothing to update", 400);
    }

    const user = await userRepository.update(userId, data);
    if (!user) throw new AppError("User not found", 404);
    return user;
  }

  async deleteAccount(userId) {
    await taskRepository.deleteAllByUser(userId); // remove their tasks too
    await userRepository.delete(userId);
  }

  // ----- Admin -----
  getAllUsers() {
    return userRepository.findAll();
  }

  async deleteUserById(adminId, userId) {
    if (adminId === userId) {
      throw new AppError("Admins cannot delete themselves here", 400);
    }
    const user = await userRepository.findById(userId);
    if (!user) throw new AppError("User not found", 404);
    await this.deleteAccount(userId);
  }
}

module.exports = new UserService();