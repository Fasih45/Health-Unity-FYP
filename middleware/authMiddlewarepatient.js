const jwt = require("jsonwebtoken");
const key = process.env.JWT_SECRET_patient;
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, key);
    const { username } = decoded;
    req.username = username;
    if (req.params.username)
      if (req.params.username !== username) {
        return res.status(401).json({ error: "Unauthorized" });
      }

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
