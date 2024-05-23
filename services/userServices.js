import User from "../db/models/User.js";

export const signup = (data) => User.create(data);
export const login = (data) => User.findOne(data);
