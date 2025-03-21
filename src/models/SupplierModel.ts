import mongoose, { Schema } from "mongoose";

const SupplierScheme = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: String,
  product: String,
  categories: {
    type: [String],
  },
  price: Number,
  email: String,
  active: Number,
  contact: String,
  isTaking: {
    type: Number,
    default: 0,
    enum: [0, 1],
  },
  photoUrl: String,
  createAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: Date.now(),
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const SupplierModel = mongoose.model("suppliers", SupplierScheme);
export default SupplierModel;
