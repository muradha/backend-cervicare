import Joi from 'joi';

const storeDoctorRatingValidation = Joi.object({
  doctor_id: Joi.string().uuid({ version: 'uuidv4' }).message('Invalid doctor id').required('Doctor id is required'),
  rating: Joi.number().required(),
});

export {
  storeDoctorRatingValidation,
};
