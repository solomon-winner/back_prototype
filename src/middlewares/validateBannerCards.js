import { validate } from "express-validation";
import Joi from "joi";
import mongoose from "mongoose";

const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message("Invalid MongoDB ID");
  }
  return value;
}, "MongoDB ObjectId Validation");

const bannerCardSchema = {
  body: Joi.object({
    title: Joi.string().required().trim().messages({
      "any.required": "Title is required",
      "string.empty": "Title cannot be empty",
    }),
    description: Joi.string().required().trim().messages({
      "any.required": "Description is required",
      "string.empty": "Description cannot be empty",
    }),
  }),
};

export const validateBannerCard = validate(bannerCardSchema, {}, {});
