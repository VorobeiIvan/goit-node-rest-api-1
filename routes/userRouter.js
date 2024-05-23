import express from "express";

import userControllers from "../controllers/userControllers.js";

import isEmptyBody from "../middlewares/isEmptyBody.js";
import authenticate from "../middlewares/authenticate.js";

import validateBody from "../decorators/validateBody.js";

import { loginSchema, registrationSchema } from "../schemas/userSchemas.js";

const userRouter = express.Router();

userRouter.post(
  "/users/register",
  isEmptyBody,
  validateBody(registrationSchema),
  userControllers.signUp
);

userRouter.post(
  "/users/login",
  isEmptyBody,
  validateBody(loginSchema),
  userControllers.signIn
);

userRouter.get("/current", authenticate, userControllers.getCurrent);

userRouter.post("/logout", authenticate, authControllers.signOut);

export default userRouter;
