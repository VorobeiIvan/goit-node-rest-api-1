import Contact from "../models/contact";
export const getAllContacts = (search = {}) => {
  const { filter = {} } = search;
  return Contact.find(filter);
};

export const getContactById = async (_id) => {
  const result = await Contact.findById(_id);
  return result;
};

export const addContact = (data) => Contact.create(data);

export const updateContactById = (id, data) =>
  Contact.findByIdAndUpdate(id, data);

export const deleteContactById = (id) => Contact.findByIdAndDelete(id);
