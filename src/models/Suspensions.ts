import { Schema, model } from 'mongoose';

const suspensionsSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  days: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
  },
});

module.exports = model('Suspensions', suspensionsSchema);
export default model('Suspensions', suspensionsSchema);
