const { Schema, model } = require('mongoose');
const Joi = require('joi');

const noticeSchema = new Schema(
  {
    category: {
      type: String,
      enum: {
        values: ['sell', 'lost-found', 'for-free'],
        message: '{VALUE} must be one of [`sell`, `lost-found`, `for-free`]',
      },
      required: [true, 'Category is required'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    name: {
      type: String,
      default: '',
    },
    // default Date ??
    birthday: {
      type: Date,
      default: Date.now(),
    },
    breed: {
      type: String,
      default: '',
    },
    sex: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message: '{VALUE} must be one of [`male`,`female`]',
      },
      required: [true, 'Sex is required'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    photo: {
      type: String,
      default: '',
    },
    comments: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      default: 0,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Owner is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

const Notice = model('notice', noticeSchema);

const addSchema = Joi.object({
  category: Joi.string().allow('sell', 'lost-found', 'for-free').required(),
  title: Joi.string().allow('male', 'female').required(),
  sex: Joi.string().required(),
  location: Joi.string().required(),
});

const schemasJoiNotice = {
  addSchema,
};

module.exports = {
  Notice,
  schemasJoiNotice,
};
