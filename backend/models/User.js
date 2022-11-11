const { Schema, model } = require('mongoose');
const Joi = require('joi');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // eslint-disable-line
const phoneRegexp = /^\+380\d{9}$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, 'Email is required'],
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    phone: {
      type: String,
      match: phoneRegexp,
      required: [true, 'Phone is required'],
    },
    location: {
      type: String,
      required: [true, 'Location is required. Format `city, region`'],
    },
    // default Date ??
    birthday: {
      type: Date,
      required: false,
    },
    avatarURL: {
      type: String,
      default: '',
    },
    pets: {
      type: [Schema.Types.ObjectId],
      ref: 'pet',
      required: false,
      // default: [],
    },
    favorites: {
      type: [Schema.Types.ObjectId],
      ref: 'notice',
      required: false,
      // default: [],
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model('user', userSchema);

const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  name: Joi.string().required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  location: Joi.string().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const schemasJoiUser = {
  registerSchema,
  loginSchema,
};

module.exports = {
  User,
  schemasJoiUser,
};
