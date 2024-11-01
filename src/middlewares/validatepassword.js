import { validate } from 'express-validation';
import Joi from 'joi';

const passwordSchema = {
    body: Joi.object({
        password: Joi.string().min(6).required().messages({
            'any.required': 'Password is required',
            'string.min': 'Password must be at least 6 characters long',
        }),
    }),
};

export const validatePassword = validate(passwordSchema, {}, {});
