import { validate } from 'express-validation';
import Joi from 'joi';

const songSchema = {
  body: Joi.object({
    title: Joi.string().required().trim().messages({
      'any.required': 'Title is required',
      'string.empty': 'Title cannot be empty',
    }),
    link: Joi.string().uri().required().trim().messages({
      'any.required': 'Link is required',
      'string.uri': 'Please provide a valid URL',
      'string.empty': 'Link cannot be empty',
    }),
    img: Joi.string().uri().required().trim().messages({
      'any.required': 'Image URL is required',
      'string.uri': 'Please provide a valid URL',
      'string.empty': 'Image URL cannot be empty',
    }),
    albums: Joi.array().items(Joi.string().trim().messages({
      'string.empty': 'Album name cannot be empty',
    })).messages({
      'array.base': 'Albums must be an array of strings',
    }),
  }),
};

export const validateSong = validate(songSchema, {}, {});