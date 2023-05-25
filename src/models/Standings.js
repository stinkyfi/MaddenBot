const { Schema, model } = require('mongoose');

const standingsSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  wins: {
    type: Number,
    default: 0,
  },
  loss: {
    type: Number,
    default: 0,
  },
  draw: {
    type: Number,
    default: 0,
  },
  championships: {
    type: Number,
    default: 0,
  },
});

module.exports = model('Standings', standingsSchema);