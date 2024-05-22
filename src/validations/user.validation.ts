import Joi from "joi";
import { password } from "./custom.validation";

const addUser = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().email().required().messages({
      "any.required": "Email is required.",
      "string.empty": "Email cannot be empty.",
      "string.email": "Invalid email format.",
    }),
    phone: Joi.string()
      .length(10)
      .pattern(/[6-9]{1}[0-9]{9}/)
      .required()
      .messages({
        "any.required": "Phone number is required.",
        "string.empty": "Phone number cannot be empty.",
        "string.length": "Phone number must be exactly 10 digits long.",
        "string.pattern.base": "Phone number is invalid.",
      }),
    // password: Joi.string().required().custom(password),
    // confirm_password: Joi.ref("password"),
  }),
};

const deleteUser = {
  body: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const editUser = {
  body: Joi.object().keys({
    id: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required().messages({
      "any.required": "Email is required.",
      "string.empty": "Email cannot be empty.",
      "string.email": "Invalid email format.",
    }),
    phone: Joi.string()
      .length(10)
      .pattern(/[6-9]{1}[0-9]{9}/)
      .required()
      .messages({
        "any.required": "Phone number is required.",
        "string.empty": "Phone number cannot be empty.",
        "string.length": "Phone number must be exactly 10 digits long.",
        "string.pattern.base": "Phone number is invalid.",
      }),
    // password: Joi.string().required().custom(password),
    // confirm_password: Joi.ref("password"),
  }),
};

export default { addUser, deleteUser, editUser };
