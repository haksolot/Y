const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_JWT_KEY);

    if (decoded._id !== req.params.userId && decoded.role !== "Admin") {
      return res.status(403).json({ message: "Forbidden: Not your profile" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyUser;