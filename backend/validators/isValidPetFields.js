const Joi = require('joi');

const addPetValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .pattern(/^([А-Яа-яЁёЇїІіЄєҐґ'\s]+|[a-zA-Z\s]+){2,}$/)
      .max(30)
      .trim()
      .required()
      .messages({
        'string.pattern.base': 'Name must contain only letters and spaces',
        'string.empty': 'Name is required',
        'string.max': 'Name must be less than 30 characters',
      }),
    birthday: Joi.date().messages({
      'date.base': 'Birthday must be a date',
    }),
    breed: Joi.string()
      .pattern(/^([А-Яа-яЁёЇїІіЄєҐґ'\s]+|[a-zA-Z\s]+){2,}$/)
      .max(30)
      .trim()
      .messages({
        'string.pattern.base': 'Breed must contain only letters and spaces',
        'string.max': 'Breed must be less than 30 characters',
      }),
    comments: Joi.string(),
    photoURL: Joi.string().uri().messages({
      'string.uri': 'Avatar URL must be a valid URL',
    }),
    photoId: Joi.string().min(0),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json(validationResult.error.details[0].message);
  }

  next();
};

module.exports = addPetValidation;
