const AppError = require("../utils/AppError");

module.exports = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    throw new AppError("You do not have permission", 403);
  }
  next();
};