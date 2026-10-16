const userService = require("../services/userService");

exports.updateMe = async (req, res) => {
  res.json(await userService.updateProfile(req.user.id, req.body));
};

exports.deleteMe = async (req, res) => {
  await userService.deleteAccount(req.user.id);
  res.json({ message: "Account deleted" });
};

exports.getAllUsers = async (req, res) => {
  res.json(await userService.getAllUsers());
};

exports.deleteUser = async (req, res) => {
  await userService.deleteUserById(req.user.id, req.params.id);
  res.json({ message: "User deleted" });
};