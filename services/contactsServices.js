import Contact from "../models/Contact.js";

export const getAllContacts = (filter = {}) => Contact.find(filter);

export const getContactById = (id) => Contact.findById(id);

export const addContact = (data) => Contact.create(data);

export const deleteContactById = (contactId) =>
  Contact.findOneAndDelete(contactId);

export const updateContactById = (contactId, data) =>
  Contact.findByIdAndUpdate(contactId, data);

export const updateStatusContact = (contactId, { favorite }) =>
  Contact.findOneAndUpdate(contactId, { favorite });
