import express from "express";
import * as controllers from "../controllers/contactsControllers.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import validateBody from "../decorators/validateBody.js";
import isValidId from "../middlewares/isValidId.js";
import * as schemas from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", controllers.getAllContacts);

contactsRouter.get("/:id", isValidId, controllers.getOneContact);

contactsRouter.delete("/:id", isValidId, controllers.deleteContact);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(schemas.createContactSchema),
  controllers.createContact
);

contactsRouter.put("/:id", isValidId, isEmptyBody, controllers.updateContact);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.toggleFavoriteContactSchema),
  controllers.toggleFavoriteContact
);

export default contactsRouter;
