import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateByIdContact,
  toggleFavoriteByIdContact,
} from "../services/contactsServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await listContacts({ owner });
  res.status(200).json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await getContactById(id);
  if (!result || String(result.owner) !== String(owner)) {
    throw HttpError(404, "Contact not found");
  }
  res.status(200).json(result);
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await addContact({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const contact = await getContactById(id);
  if (!contact || String(contact.owner) !== String(owner)) {
    throw HttpError(404, "Contact not found");
  }
  await removeContact(id);
  res.status(200).json({ message: "Contact deleted" });
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const contact = await getContactById(id);
  if (!contact || String(contact.owner) !== String(owner)) {
    throw HttpError(404, "Contact not found");
  }
  const result = await updateByIdContact(id, req.body);
  res.status(200).json(result);
};

const toggleFavoriteContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const contact = await getContactById(id);
  if (!contact || String(contact.owner) !== String(owner)) {
    throw HttpError(404, "Contact not found");
  }
  const result = await toggleFavoriteByIdContact(id, req.body);
  res.status(200).json(result);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  toggleFavoriteContact: ctrlWrapper(toggleFavoriteContact),
};
