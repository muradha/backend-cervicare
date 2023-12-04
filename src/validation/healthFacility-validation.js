import Joi from 'joi';

const storeHealthFacilityValidation = Joi.object({
  name: Joi.string().max(100).required(),
  type: Joi.string().max(100).required(),
  openHour: Joi.number().required(),
  closeHour: Joi.number().required(),
  address: Joi.string().max(250).required(),
  province: Joi.string().max(100).required(),
  city: Joi.string().max(150).optional(),
  regency: Joi.string().max(160).optional(),
  district: Joi.string().max(160).optional(),
  urbanVillage: Joi.string().max(160).optional(),
  rural: Joi.string().max(160).optional(),
});

const updateHealthFacilityValidation = Joi.object({
  name: Joi.string().max(100).required(),
  type: Joi.string().max(100).required(),
  openHour: Joi.number().required(),
  closeHour: Joi.number().required(),
  address: Joi.string().max(250).required(),
  province: Joi.string().max(100).required(),
  city: Joi.string().max(150).optional(),
  regency: Joi.string().max(160).optional(),
  district: Joi.string().max(160).optional(),
  urbanVillage: Joi.string().max(160).optional(),
  rural: Joi.string().max(160).optional(),
});

export {
  storeHealthFacilityValidation,
  updateHealthFacilityValidation,
}