import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value: any) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value: any) {
      if (!validator.isMobilePhone(value)) {
        throw new Error("invalid phone");
      }
    },
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
