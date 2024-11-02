import { validate } from "express-validation";

const emailSchema = {
    body: Joi.object({
        email: Joi.string().email().required().trim().messages({
        "any.required": "Email is required",
        "string.email": "Please provide a valid email address",
        "string.empty": "Email cannot be empty",
        }),
    })
}

export const validateEmail = validate(emailSchema, {}, {});