import express from "express";
import authControllers from "../controllers/userControllers.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import authenticate from "../middlewares/authenticate.js";
import validateBody from "../decorators/validateBody.js";
import { loginSchema, registrationSchema } from "../schemas/userSchemas.js";
import User from "../db/models/User.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(registrationSchema),
  authControllers.signUp
);

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(loginSchema),
  authControllers.signIn
);

authRouter.get("/current", authenticate, authControllers.getCurrent);
authRouter.post("/logout", authenticate, authControllers.logout);

authRouter.get("/verify/:verificationToken", async (req, res) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.verify = true;
    user.verificationToken = null;
    await user.save();

    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default authRouter;
