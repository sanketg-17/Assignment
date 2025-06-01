import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
  cardNumber: {
    type: String,
    required: true,
    match: /^[0-9]{16}$/
  },
  expiryDate: {
    type: String, 
    required: true
  },
  cvv: {
    type: String,
    required: true,
    match: /^[0-9]{3}$/
  }
});

export default mongoose.model('User', userSchema);