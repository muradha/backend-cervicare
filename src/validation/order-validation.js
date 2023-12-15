import Joi from 'joi';

const storeOrderValidation = Joi.object({
  amount_paid: Joi.number().required(),
  user_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
  doctor_id: Joi.string().required(),
});

export {
  storeOrderValidation,
};
