const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    birthday: {
      type: Date,
      default: Date.now(),
    },
    breed: {
      type: String,
      default: 'no breed',
    },
    photoURL: {
      type: String,
      default: '',
    },
    photoId: {
      type: String,
      default: '',
    },
    comments: {
      type: String,
      default: '',
    },
    owner: {
      type: ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Pet = model('pet', petSchema);

module.exports = Pet;
