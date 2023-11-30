import Joi from 'joi';

const registerUserValidation = Joi.object({
  email: Joi.string().email(/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/).max(200).required(),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).max(191).required(),
  name: Joi.string().max(160).required(),
});

const storeUserValidation = Joi.object({
  name: Joi.string().max(160).required(),
  email: Joi.string().email(/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/).max(200).required(),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).max(191).required(),
  gender: Joi.string().valid('MALE', 'FEMALE').optional(),
  birth_date: Joi.date().required(),
  // profile_picture: Joi.
});

const loginUserValidation = Joi.object({
  email: Joi.string().email(/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/).max(200).required(),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).max(191).required(),
});

const updateUserValidation = Joi.object({
  name: Joi.string().max(160).optional(),
  email: Joi.string().email().pattern(/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/).max(200)
    .optional(),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).max(191).optional(),
  birth_date: Joi.date().optional(),
  gender: Joi.string().valid('MALE', 'FEMALE').optional(),
  phone: Joi.number().optional(),
});

export {
  registerUserValidation,
  storeUserValidation,
  loginUserValidation,
  updateUserValidation,
};
