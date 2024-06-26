import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "./hooks.js";
import { emailRegexp } from "../../constants/user-constants.js";

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegexp,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: function () {
        const gravatar = require("gravatar");
        return gravatar.url(this.email, { s: "200", r: "pg", d: "mm" });
      },
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);
userSchema.pre("findByIdAndUpdate", setUpdateSettings);
userSchema.post("findByIdAndUpdate", handleSaveError);

const User = model("User", userSchema);

export default User;
