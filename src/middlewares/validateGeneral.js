import { validate } from 'express-validation';
import Joi from 'joi';
import mongoose from 'mongoose';

// Custom validation for MongoDB ObjectId using regular expression
const objectId = Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('Invalid MongoDB ID');
    }
    return value;
}, 'MongoDB ObjectId Validation');

const generalSchema = {
  body: Joi.object({
    bannerPic: Joi.string().required().trim().messages({
      'any.required': 'Banner picture is required',
      'string.empty': 'Banner picture cannot be empty',
    }),
    bannerInfo: Joi.string().required().trim().messages({
      'any.required': 'Banner information is required',
      'string.empty': 'Banner information cannot be empty',
    }),
    aboutPic: Joi.string().required().trim().messages({
      'any.required': 'About picture is required',
      'string.empty': 'About picture cannot be empty',
    }),
    aboutInfo: Joi.string().required().trim().messages({
      'any.required': 'About information is required',
      'string.empty': 'About information cannot be empty',
    }),
    visitors: Joi.number().required().messages({
      'any.required': 'Visitors count is required',
      'number.base': 'Visitors count must be a number',
    }),
    subscribers: Joi.array().items(Joi.string().email().messages({
      'string.email': 'Please provide a valid email address',
    })).messages({
      'array.base': 'Subscribers must be an array of email addresses',
    }),
    bannerCards: Joi.array().items(objectId).required().messages({
      'any.required': 'Banner cards are required',
      'array.base': 'Banner cards must be an array of MongoDB ObjectIds',
    }),
    email: Joi.string().email().required().trim().messages({
      'any.required': 'Email is required',
      'string.email': 'Please provide a valid email address',
      'string.empty': 'Email cannot be empty',
    }),
    password: Joi.string().required().trim().messages({
      'any.required': 'Password is required',
      'string.empty': 'Password cannot be empty',
    }),
  }),
};

export const validateGeneral = validate(generalSchema, {}, {});