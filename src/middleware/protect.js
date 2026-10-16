const { verifyToken } = require("../utils/token");
const userRepository = require("../repositories/userRepository");
const AppError = require("../utils/AppError");

module.exports = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    throw new AppError("Not logged in", 401);
  }

  const decoded = verifyToken(header.split(" ")[1]);

  // make sure the user still exists (they may have deleted their account)
  const user = await userRepository.findById(decoded.id);
  if (!user) throw new AppError("User no longer exists", 401);

  req.user = { id: user._id.toString(), role: user.role };
  next();
};