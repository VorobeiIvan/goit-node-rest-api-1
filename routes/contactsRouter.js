import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAll);

contactsRouter.get("/:id", contactsControllers.getById);

contactsRouter.post("/", isEmptyBody, contactsControllers.add);

contactsRouter.put("/:id", isEmptyBody, contactsControllers.updateById);

contactsRouter.delete("/:id", contactsControllers.deleteById);

export default contactsRouter;
