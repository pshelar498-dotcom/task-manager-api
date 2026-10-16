const bcrypt = require("bcryptjs");
const userRepository = require("../repositories/userRepository");
const AppError = require("../utils/AppError");
const { signToken } = require("../utils/token");

class AuthService {
  async register({ name, email, password }) {
    if (!name || !email || !password) {
      throw new AppError("Name, email and password are required", 400);
    }
    if (await userRepository.findByEmail(email)) {
      throw new AppError("Email already registered", 409);
    }

    // role is NOT taken from the request, so nobody can register as admin
    const user = await userRepository.create({ name, email, password });
    return { user, token: signToken(user) };
  }

  async login({ email, password }) {
    if (!email || !password) {
      throw new AppError("Email and password are required", 400);
    }

    const user = await userRepository.findByEmailWithPassword(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AppError("Invalid email or password", 401);
    }
    return { user, token: signToken(user) };
  }

  async getMe(userId) {
    const user = await userRepository.findById(userId);
    if (!user) throw new AppError("User not found", 404);
    return user;
  }

  async changePassword(userId, { currentPassword, newPassword }) {
    if (!currentPassword || !newPassword) {
      throw new AppError("Current and new password are required", 400);
    }

    const user = await userRepository.findByIdWithPassword(userId);
    if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
      throw new AppError("Current password is incorrect", 401);
    }

    user.password = newPassword; // the pre-save hook hashes it
    await userRepository.save(user);
    return { token: signToken(user) };
  }
}

module.exports = new AuthService();