const authService = require("../services/authService");

exports.register = async (req, res) => {
  const result = await authService.register(req.body);
  res.status(201).json(result);
};

exports.login = async (req, res) => {
  res.json(await authService.login(req.body));
};

exports.getMe = async (req, res) => {
  res.json(await authService.getMe(req.user.id));
};

exports.changePassword = async (req, res) => {
  const result = await authService.changePassword(req.user.id, req.body);
  res.json({ message: "Password changed", ...result });
};