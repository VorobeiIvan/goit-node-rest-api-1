import * as contactsServices from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

const getAll = async (_, res) => {
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
  res.json({
    message: "Delete success",
  });
};
const add = async (req, res) => {
  const { name, email, phone } = req.body;
  const result = await contactsServices.addContact(name, email, phone);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const result = await contactsServices.updateContactById(
    id,
    name,
    email,
    phone
  );
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
};
