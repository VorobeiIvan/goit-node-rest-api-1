import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import gravatar from "gravatar";
import User from "../db/models/User.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const { SECRET_KEY } = process.env;

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const verificationToken = uuidv4();

  const avatarURL = gravatar.url(email, { s: "250", d: "retro" });

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "Email in use" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    email,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });
  await newUser.save();

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }
  if (!user || !user.verify) {
    return res.status(401).json({ message: "User not verified" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });
  user.token = token;
  await user.save();

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  });
};

const getCurrent = (req, res) => {
  const { email, subscription, avatarURL } = req.user;
  res.status(200).json({
    email,
    subscription,
    avatarURL,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).send();
};

export default {
  signUp: ctrlWrapper(signUp),
  signIn: ctrlWrapper(signIn),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
};
