const { Schema, model } = require('mongoose');
const { handleSaveError } = require('../middleware');

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
    avatarURL: {
      type: String,
      default: '',
    },
    owner: {
      type: ObjectId,
      ref: 'user',
      default: '',
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleSaveError);
const Pet = model('pet', petSchema);

module.exports = Pet;
