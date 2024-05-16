import Contact from "../db/models/Contact.js";

export const listContacts = (filter = {}) => Contact.find(filter);
export const getContactById = (id) => Contact.findById(id);
export const removeContact = (id) => Contact.findByIdAndDelete(id);
export const addContact = (data) => Contact.create(data);
export const updateByIdContact = (id, data) =>
  Contact.findByIdAndUpdate(id, data);
export const toggleFavoriteByIdContact = (id, favorite) =>
  Contact.findByIdAndUpdate(id, favorite);
