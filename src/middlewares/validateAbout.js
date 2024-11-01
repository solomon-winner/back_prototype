import { validate } from 'express-validation';
import Joi from 'joi';

const generalInfoSchema = {
  body: Joi.object({
    bannerInfo: Joi.string().required().trim().messages({
      'any.required': 'Banner information is required',
      'string.empty': 'Banner information cannot be empty',
    }),
    subscribers: Joi.array().items(Joi.string().email().messages({
      'string.email': 'Please provide a valid email address',
    })).messages({
      'array.base': 'Subscribers must be an array of email addresses',
    }),
    contactInfo: Joi.object({
      email: Joi.string().email().required().trim().messages({
        'any.required': 'Contact email is required',
        'string.email': 'Please provide a valid email address',
        'string.empty': 'Contact email cannot be empty',
      }),
      phone: Joi.string().required().trim().messages({
        'any.required': 'Contact phone is required',
        'string.empty': 'Contact phone cannot be empty',
      }),
    }).required().messages({
      'any.required': 'Contact information is required',
    }),
    address: Joi.string().required().trim().messages({
      'any.required': 'Address is required',
      'string.empty': 'Address cannot be empty',
    }),
  }),
};

export const validateGeneralInfo = validate(generalInfoSchema, {}, {});