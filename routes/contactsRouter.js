import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import isValidId from "../middlewares/isValidId.js";
import validateBody from "../decorators/validateBody.js";
import {
  contactAddSchema,
  contactUpdateSchema,
  toggleFavoriteContactSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAll);

contactsRouter.get("/:id", contactsControllers.getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactAddSchema),
  contactsControllers.add
);

contactsRouter.put(
  "/:id",
  isEmptyBody,
  validateBody(contactUpdateSchema),
  contactsControllers.updateById
);

contactsRouter.delete("/:id", isValidId, contactsControllers.deleteById);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(toggleFavoriteContactSchema),
  contactsControllers.toggleFavorite
);

export default contactsRouter;
