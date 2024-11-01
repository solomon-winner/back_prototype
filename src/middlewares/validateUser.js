import { validate } from 'express-validation';
import Joi from 'joi';

const objectId = Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('Invalid MongoDB ID');
    }
    return value;
}, 'MongoDB ObjectId Validation');

const userSchema = {
    body: Joi.object({
        firstName: Joi.string().required().messages({
            'any.required': 'First name is required',
        }),
        lastName: Joi.string().required().messages({
            'any.required': 'Last name is required',
        }),
        email: Joi.string().email().required().messages({
            'any.required': 'Email is required',
            'string.email': 'Please provide a valid email address',
        }),
        company: objectId.optional().messages({
            'string.pattern.base': 'Company ID must be a valid MongoDB ID',
        }),
        password: Joi.string().min(6).required().messages({
            'any.required': 'Password is required',
            'string.min': 'Password must be at least 6 characters long',
        }),
        roles: Joi.array().items(objectId).optional().messages({
            'array.base': 'Roles must be an array',
            'string.pattern.base': 'Each role ID must be a valid MongoDB ID',
        }),
        status: Joi.string().optional().valid('active', 'inactive').messages({
            'any.only': 'Status must be either active or inactive',
        }),
        types: Joi.string().optional().valid('admin', 'system-admin', 'verifier', 'user').messages({
            'any.only': 'Type must be one of admin, system-admin, verifier, or user',
        }),
    }),
};

export const validateUser = validate(userSchema, {}, {});
