import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import validateBody from "../decorators/validateBody.js";
import isValidId from "../middlewares/isValidId.js";
import authenticate from "../middlewares/authenticate.js";
import {
  toggleFavoriteContactSchema,
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:id", isValidId, contactsControllers.getOneContact);

contactsRouter.delete("/:id", isValidId, contactsControllers.deleteContact);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(createContactSchema),
  contactsControllers.createContact
);

contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(updateContactSchema),
  contactsControllers.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(toggleFavoriteContactSchema),
  contactsControllers.toggleFavoriteContact
);

export default contactsRouter;
