import { Schema, model } from "mongoose";

import { handleSaveError, setUpdateSettings } from "./hooks.js";

const constantSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

constantSchema.post("save", handleSaveError);

constantSchema.pre("findOneAndUpdate", setUpdateSettings);

constantSchema.post("findOneAndUpdate", handleSaveError);

const Constant = model("constant", constantSchema);

export default Constant;
