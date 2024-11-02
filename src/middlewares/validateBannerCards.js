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

const bannerCardSchema = {
  body: Joi.object({
    title: Joi.string().required().trim().messages({
      'any.required': 'Title is required',
      'string.empty': 'Title cannot be empty',
    }),
    description: Joi.string().required().trim().messages({
      'any.required': 'Description is required',
      'string.empty': 'Description cannot be empty',
    }),
    imageUrl: Joi.string().uri().required().trim().messages({
      'any.required': 'Image URL is required',
      'string.uri': 'Please provide a valid URL',
      'string.empty': 'Image URL cannot be empty',
    }),
    link: Joi.string().uri().optional().trim().messages({
      'string.uri': 'Please provide a valid URL',
      'string.empty': 'Link cannot be empty',
    }),
    order: Joi.number().integer().required().messages({
      'any.required': 'Order is required',
      'number.base': 'Order must be a number',
      'number.integer': 'Order must be an integer',
    }),
  }),
};

export const validateBannerCard = validate(bannerCardSchema, {}, {});