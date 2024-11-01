import { validate } from 'express-validation';
import Joi from 'joi';

const objectId = Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('Invalid MongoDB ID');
    }
    return value;
}, 'MongoDB ObjectId Validation');

const productSchema = {
    body: Joi.object({
        exporterId: objectId.required().messages({
            'any.required': 'Exporter ID is required',
        }),
        processedDate: Joi.date().iso().required().messages({
            'any.required': 'Processed date is required',
            'date.format': 'Processed date must be a valid date',
        }),
        shipmentDate: Joi.date().iso().required().messages({
            'any.required': 'Shipment date is required',
            'date.format': 'Shipment date must be a valid date',
        }),
        output: Joi.number().required().messages({
            'any.required': 'Output is required',
            'number.base': 'Output must be a number',
        }),
        types: Joi.array().items(Joi.string()).min(1).required().messages({
            'array.base': 'Types must be an array with at least one type',
            'array.min': 'Types must be an array with at least one type',
            'string.base': 'Each type must be a string',
        }),
        farmProducts: Joi.array().items(objectId).required().messages({
            'array.base': 'Farm products must be an array',
            'string.pattern.base': 'Each farm product ID must be a valid MongoDB ID',
        }),
    }),
};

export const validateProduct = validate(productSchema, {}, {});
