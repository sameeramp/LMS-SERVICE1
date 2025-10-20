import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const verifyToken = (req, res, next) => {
  try {
    let token =
      req.body?.token ||
      req.query?.token ||
      req.headers?.authorization ||
      req.headers?.token;
    if (!token) {
      return res.status(403).json({ message: "Token is required for authentication" });
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7).trim();
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
