import Joi from 'joi';

const storeDoctorValidation = Joi.object({
  user_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
  registration_certificate: Joi.string().required(),
  work_lifetime: Joi.number().required(),
  alumnus: Joi.string().required(),
  practice_location: Joi.string().required(),
});

export {
  storeDoctorValidation,
};
