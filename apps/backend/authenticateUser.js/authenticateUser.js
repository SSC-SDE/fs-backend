const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Ensure lowercase "authorization"
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    console.log("Decoded Token:", decoded);

    req.userId = decoded.userId; // Assign `userId` to request object
    next(); // Proceed to the next middleware
  } catch (error) {
    console.error("JWT Error:", error.message);
    res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};

module.exports = authenticateUser;
