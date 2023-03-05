import jwt from "jsonwebtoken";

export const authGuard = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json("You are not authenticated");

  try {
    const decoded = jwt.verify(token, "mySecretKey");
    req.user = decoded;
    next();
  } catch (e) {
    res.status(404).json("Invalid token");
  }
};
