import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  id: String,
  title: {
    type: String,
    required: true,
  },
  slug: String,
  description: String,
  categories: [String],
  supplier: {
    require: true,
    type: String,
  },
  images: {
    type: [String],
  },
  expiryDate: {
    type: Date,
    default: Date.now(),
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: Date.now(),
  },
  content: String,
  rating: Number,
});

const ProductModel = mongoose.model("products", productSchema);
export default ProductModel;
