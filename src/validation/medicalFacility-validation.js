import Joi from 'joi';

const storeMedicalFacilityValidation = Joi.object({
  name: Joi.string().max(100).required(),
});

const updateMedicalFacilityValidation = Joi.object({
  name: Joi.string().max(100).required(),
});

export {
  storeMedicalFacilityValidation,
  updateMedicalFacilityValidation,
};
