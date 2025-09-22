const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Middleware function
const protect = async (req, res, next) => {
  let token;

  // 1. Check if request has Authorization header and starts with "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // 2. Extract token
      token = req.headers.authorization.split(" ")[1];

      // 3. Verify token using JWT secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Find the user linked to this token and attach to req.user
      req.user = await User.findById(decoded.id).select("-password");

      // 5. Call next() → move to controller
      next();
    } catch (error) {
      // If token is invalid or expired
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // 6. If no token at all
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
