import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title:{
    type : String,
    required: true
  },
  price:{
    type: Number,
    required : true
  },
  description:{
    type: String,
    required : true
  },
  imageUrl:{
    type: String,
    required : true
  },
  variants: [String],
  sizes: [String],
  inventory: Number,
});

export default mongoose.model('Product', productSchema);