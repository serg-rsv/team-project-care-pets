const { Schema, SchemaTypes, model } = require('mongoose');
require('mongoose-type-url');

const subSchema = new Schema(
  {
    isOpen: {
      type: Boolean,
      default: false,
    },
    from: {
      type: String,
      default: '00:00',
    },
    to: {
      type: String,
      default: '00:00',
    },
  },
  { _id: false }
);
const friendSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    url: {
      type: SchemaTypes.Url,
      default: '',
    },
    addressUrl: {
      type: SchemaTypes.Url,
      default: '',
    },
    photoUrl: {
      type: SchemaTypes.Url,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
    workDays: {
      type: [subSchema],
    },
    phone: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true }
);

const Friend = model('friend', friendSchema);

module.exports = Friend;
