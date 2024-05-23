import express from "express";
import authControllers from "../controllers/userControllers.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import authenticate from "../middlewares/authenticate.js";
import validateBody from "../decorators/validateBody.js";
import { loginSchema, registrationSchema } from "../schemas/userSchemas.js";

const authRouter = express.Router();

authRouter.post(
  "/users/register",
  isEmptyBody,
  validateBody(registrationSchema),
  authControllers.signUp
);

authRouter.post(
  "/users/login",
  isEmptyBody,
  validateBody(loginSchema),
  authControllers.signIn
);

authRouter.get("/current", authenticate, authControllers.getCurrent);
authRouter.post("/logout", authenticate, authControllers.logout);

export default authRouter;
