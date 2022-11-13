const { Schema, model } = require('mongoose');

const newsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
    },
    url: {
      type: String,
      required: [true, 'url is required'],
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'description is required'],
      unique: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: false, timestamps: true }
);

const News = model('news', newsSchema);

module.exports = News;
