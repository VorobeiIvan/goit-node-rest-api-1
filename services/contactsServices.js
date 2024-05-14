import Contact from "../models/Contact.js";

export const listContacts = (search = {}) => {
  const { filter = {} } = search;
  return Contact.find(filter);
};

export const getContactById = async (_id) => {
  const result = await Contact.findById(_id);
  return result;
};

export const removeContact = (contactId) => {
  Contact.findOneAndDelete(contactId);
};

export const addContact = (data) => Contact.create(data);

export const updateByIdContact = (contactId, data) =>
  Contact.findByIdAndUpdate(contactId, data);

export const toggleFavoriteByIdContact = (contactId, favorite) =>
  Contact.findOneAndUpdate(contactId, favorite);
