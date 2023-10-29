import Joi from "joi";

export const validationSchema = Joi.object({
    EMAIL_SERVICE: Joi.string()
        .required(),
    EMAIL_USER: Joi.string()
        .required(),
    EMAUL_PAD: Joi.string()
        .required(),
    EMAIL_BASE_URL: Joi.string()
        .required()
        .uri()
});