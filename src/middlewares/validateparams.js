import { validate } from "express-validation";
import Joi from "joi";
import mongoose from "mongoose";

const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message("Invalid MongoDB ID");
  }
  return value;
}, "MongoDB ObjectId Validation");

const paramsSchema = {
  params: Joi.object({
    id: objectId.required().messages({
      "any.required": "User ID is required",
    }),
  }),
};

export const validateParams = validate(paramsSchema, {}, {});
