import { validate } from "express-validation";
import Joi from "joi";

const testimonySchema = {
  body: Joi.object({
    testimony: Joi.string().required().trim().messages({
      "any.required": "Testimony is required",
      "string.empty": "Testimony cannot be empty",
    }),
    email: Joi.string().email().required().trim().messages({
      "any.required": "Email is required",
      "string.email": "Please provide a valid email address",
      "string.empty": "Email cannot be empty",
    }),
    verified: Joi.string().required().trim().messages({
      "any.required": "Verified status is required",
      "string.empty": "Verified status cannot be empty",
    }),
  }),
};

export const validateTestimony = validate(testimonySchema, {}, {});
