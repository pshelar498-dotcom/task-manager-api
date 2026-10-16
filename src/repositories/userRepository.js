const User = require("../models/User");

class UserRepository {
  create(data) {
    return User.create(data);
  }

  findById(id) {
    return User.findById(id);
  }

  findByIdWithPassword(id) {
    return User.findById(id).select("+password");
  }

  findByEmail(email) {
    return User.findOne({ email: email.toLowerCase() });
  }

  findByEmailWithPassword(email) {
    return User.findOne({ email: email.toLowerCase() }).select("+password");
  }

  findAll() {
    return User.find().sort({ createdAt: -1 });
  }

  update(id, data) {
    return User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  save(user) {
    return user.save();
  }

  delete(id) {
    return User.findByIdAndDelete(id);
  }
}

module.exports = new UserRepository();