import { validate } from "express-validation";
import Joi from "joi";

const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message("Invalid MongoDB ID");
  }
  return value;
}, "MongoDB ObjectId Validation");

const userSchema = {
  body: Joi.object({
    firstName: Joi.string().required().messages({
      "any.required": "First name is required",
    }),
    lastName: Joi.string().required().messages({
      "any.required": "Last name is required",
    }),
    email: Joi.string().email().required().messages({
      "any.required": "Email is required",
      "string.email": "Please provide a valid email address",
    }),
    password: Joi.string().min(6).required().messages({
      "any.required": "Password is required",
      "string.min": "Password must be at least 6 characters long",
    }),
    roles: Joi.array().items(objectId).optional().messages({
      "array.base": "Roles must be an array",
      "string.pattern.base": "Each role ID must be a valid MongoDB ID",
    }),
  }),
};

export const validateUser = validate(userSchema, {}, {});
