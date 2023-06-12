const { Schema, model } = require('mongoose');

const crimesSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    default: '',
  },
});

module.exports = model('Crimes', crimesSchema);