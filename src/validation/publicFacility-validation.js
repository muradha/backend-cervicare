import Joi from 'joi';

const storePublicFacilityValidation = Joi.object({
  name: Joi.string().max(100).required(),
});

const updatePublicFacilityValidation = Joi.object({
  name: Joi.string().max(100).required(),
});

export {
  storePublicFacilityValidation,
  updatePublicFacilityValidation,
};
