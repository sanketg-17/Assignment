import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  order: {
    title: { type: String, required: true },
    selectedVariant: { type: String, required: true },
    selectedSize: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    date: { type: Date, default: Date.now }
  },
  status: {
    type: String,
    enum: ['approved', 'declined', 'error'],
    required: true
  }
});

export default mongoose.model('Order', orderSchema);
