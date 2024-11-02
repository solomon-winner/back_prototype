import { validate } from 'express-validation';
import Joi from 'joi';

const messageSchema = {
  body: Joi.object({
    message: Joi.string().required().trim().messages({
      'any.required': 'Message is required',
      'string.empty': 'Message cannot be empty',
    }),
    sm: Joi.array().items(Joi.string().trim().messages({
      'string.empty': 'Sub-message cannot be empty',
    })).messages({
      'array.base': 'Sub-messages must be an array of strings',
    }),
  }),
};

export const validateMessage = validate(messageSchema, {}, {});