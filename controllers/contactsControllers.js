import * as contactsServices from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAll = async (req, res) => {
  const result = await contactsServices.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsServices.getContactById(id);
  if (!result) {
    throw HttpError(404, `Not found`);
  }

  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsServices.removeContact(id);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.status(200).json(result);
};
const add = async (req, res) => {
  const result = await contactsServices.addContact(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsServices.updateContactById(id, req.body);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

const toggleFavorite = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const result = await updateStatusContact(id, { favorite });
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  toggleFavorite: ctrlWrapper(toggleFavorite),
};
