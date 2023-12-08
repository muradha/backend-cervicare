import Joi from 'joi';

const storeArticleValidation = Joi.object({
  title: Joi.string().max(80).required(),
  content: Joi.string().max(2000).required(),
});

const updateArticleValidation = Joi.object({
  title: Joi.string().max(80).required(),
  content: Joi.string().max(2000).required(),
});

export {
  storeArticleValidation,
  updateArticleValidation,
};
