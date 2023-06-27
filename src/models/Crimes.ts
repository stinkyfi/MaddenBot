import { Schema, model } from 'mongoose';

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
export default model('Crimes', crimesSchema);
