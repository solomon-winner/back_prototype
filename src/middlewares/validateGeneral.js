import { validate } from "express-validation";
import Joi from "joi";
import mongoose from "mongoose";

const generalSchema = {
  body: Joi.object({
    bannerPic: Joi.string().required().trim().messages({
      "any.required": "Banner picture is required",
      "string.empty": "Banner picture cannot be empty",
    }),
    bannerInfo: Joi.string().required().trim().messages({
      "any.required": "Banner information is required",
      "string.empty": "Banner information cannot be empty",
    }),
    aboutPic: Joi.string().required().trim().messages({
      "any.required": "About picture is required",
      "string.empty": "About picture cannot be empty",
    }),
    aboutInfo: Joi.string().required().trim().messages({
      "any.required": "About information is required",
      "string.empty": "About information cannot be empty",
    })
  })
};

export const validateGeneral = validate(generalSchema, {}, {});
