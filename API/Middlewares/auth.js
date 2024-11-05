

import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";

export const Authenticated = async (req, res, next) => {
  // Get token from 'Authorization' header
  const authHeader = req.header("Authorization");

  if (!authHeader) return res.status(401).json({ message: "Login first" });

  // Check for 'Bearer ' prefix
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Invalid token format" });

  try {
    // Verify the token
    const decoded = jwt.verify(token, "!@#$%^&*()");
    const id = decoded.userId;

    // Find the user by decoded id
    let user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not exist" });

    req.user = user; // Assign the entire user object to req.user
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token is not valid" });
  }
};
