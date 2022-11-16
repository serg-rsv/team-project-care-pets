const Joi = require('joi');

const addPetValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .pattern(/^([а-яё\s]+|[a-z\s]+){2,}$/iu)
      .max(30)
      .trim()
      .required()
      .messages({
        'string.pattern.base': 'Name must contain only letters snd spaces',
        'string.empty': 'Name is required',
        'string.max': 'Name must be less than 30 characters',
      }),
    birthday: Joi.date().messages({
      'date.base': 'Birthday must be a date',
    }),
    breed: Joi.string()
      .pattern(/^([а-яё\s]+|[a-z\s]+){2,}$/iu)
      .max(30)
      .trim()
      .messages({
        'string.pattern.base': 'Breed must contain only letters snd spaces',
        'string.max': 'Breed must be less than 30 characters',
      }),
    comments: Joi.string(),
    photoURL: Joi.string().uri().messages({
      'string.uri': 'Avatar URL must be a valid URL',
    }),
    photoId: Joi.string(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json(validationResult.error.details[0].message);
  }

  next();
};

module.exports = addPetValidation;
