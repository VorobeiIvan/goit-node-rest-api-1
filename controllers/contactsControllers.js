import * as contactsServices from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";

import {
  contactAddSchema,
  contactUpdateSchema,
} from "../schemas/contactsSchemas.js";

const getAll = async (req, res, next) => {
  try {
    const result = await contactsServices.getAllContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsServices.getContactById;
    if (!result) {
      throw HttpError(404, `Movie with id=${id} not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsServices.addContact(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { error } = contactUpdateSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { id } = req.params;
    const result = await contactsServices.updateContactById(id, req.body);
    if (!result) {
      throw HttpError(404, `Movie with id=${id} not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsServices.deleteContactById(id);
    if (!result) {
      throw HttpError(404, `Movie with id=${id} not found`);
    }
    res.json({
      message: "Delete success",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
};
