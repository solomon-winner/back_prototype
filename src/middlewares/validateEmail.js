import { validate } from 'express-validation';
import Joi from 'joi';
import mongoose from 'mongoose';

const objectId = Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('Invalid MongoDB ID');
    }
    return value;
}, 'MongoDB ObjectId Validation');

const roleSchema = {
    body: Joi.object({
        name: Joi.string().required().messages({
            'any.required': 'Name is required',
        }),
        description: Joi.string().optional().trim(),
        supplierId: objectId.optional().messages({
            'string.pattern.base': 'Supplier ID must be a valid MongoDB ID',
        }),
        permissions: Joi.array().items(objectId).min(1).required().messages({
            'array.base': 'Permissions must be an array with at least one permission ID',
            'array.min': 'Permissions must be an array with at least one permission ID',
            'string.pattern.base': 'Each permission ID must be a valid MongoDB ID',
        }),
    }),
};

export const validateRole = validate(roleSchema, {}, {});
