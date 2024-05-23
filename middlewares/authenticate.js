import jwt from "jsonwebtoken";
import User from "../db/models/User.js";

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";

  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(decoded.id);

    if (!user || user.token !== token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};

export default authenticate;
