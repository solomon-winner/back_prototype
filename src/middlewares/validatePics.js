import { validate } from "express-validation";
import Joi from "joi";
import mongoose from "mongoose";

const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message("Invalid MongoDB ID");
  }
  return value;
}, "MongoDB ObjectId Validation");

const farmSchema = {
  body: Joi.object({
    farmSize: Joi.string().required().messages({
      "any.required": "Farm size is required",
    }),
    region: Joi.string().required().messages({
      "any.required": "Region is required",
    }),
    woreda: Joi.string().required().messages({
      "any.required": "Woreda is required",
    }),
    kebele: Joi.string().required().messages({
      "any.required": "Kebele is required",
    }),
    waterShed: Joi.string().required().messages({
      "any.required": "Water shed is required",
    }),
    lastLandClassification: Joi.string().required().messages({
      "any.required": "Last land classification is required",
    }),
    currentLandClassification: Joi.string().required().messages({
      "any.required": "Current land classification is required",
    }),
    farmer: objectId.required().messages({
      "any.required": "Farmer ID is required",
    }),
    supplier: objectId.required().messages({
      "any.required": "Supplier ID is required",
    }),
  }),
};

export const validateFarm = validate(farmSchema, {}, {});
