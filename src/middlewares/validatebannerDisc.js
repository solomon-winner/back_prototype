import { validate } from "express-validation";
import Joi from "joi";
import mongoose from "mongoose";

const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message("Invalid MongoDB ID");
  }
  return value;
}, "MongoDB ObjectId Validation");

const farmerSchema = {
  body: Joi.object({
    farmerName: Joi.string().required().messages({
      "any.required": "Farmer name is required",
    }),
    phoneNo: Joi.string()
      .required()
      .pattern(/^[0-9]{10,15}$/)
      .messages({
        "any.required": "Phone number is required",
        "string.pattern.base": "Please provide a valid phone number",
      }),
    altPhoneNo: Joi.string()
      .optional()
      .pattern(/^[0-9]{10,15}$/)
      .messages({
        "string.pattern.base": "Please provide a valid alternate phone number",
      }),
    farms: Joi.array().items(objectId).optional().messages({
      "array.base": "Farms must be an array",
      "string.pattern.base": "Each farm ID must be a valid MongoDB ID",
    }),
  }),
};

export const validateFarmer = validate(farmerSchema, {}, {});
