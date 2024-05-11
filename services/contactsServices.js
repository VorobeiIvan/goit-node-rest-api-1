import Contact from "../models/contact.js";

export const getAllContacts = (search = {}) => {
  const { filter = {} } = search;
  return Contact.find(filter);
};

export const getContactById = (id) => Contact.findById(id);

export const addContact = (data) => Contact.create(data);

export const updateContactById = (id, data) =>
  Contact.findByIdAndUpdate(id, data);

export const deleteContactById = (id) => Contact.findByIdAndDelete(id);

export const updateStatusContact = (id, { favorite }) => {
  Contact.findByIdAndUpdate(id, favorite);
};
