import { validate } from 'express-validation';
import Joi from 'joi';
import mongoose from 'mongoose';

const objectId = Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('Invalid MongoDB ID');
    }
    return value;
}, 'MongoDB ObjectId Validation');

const officerSchema = {
    body: Joi.object({
        company: objectId.required().messages({
            'any.required': 'Company ID is required',
        }),
        officer: Joi.string().required().messages({
            'any.required': 'Officer name is required',
        }),
        position: Joi.string().required().messages({
            'any.required': 'Position is required',
        }),
    }),
};

export const validateOfficer = validate(officerSchema, {}, {});
