import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema({
  products: {
    type: [Object],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: String,
  createAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: Date.now(),
  },
  payment: {
    type: String,
    default: "cod",
  },
  status: {
    type: String,
    default: "pending",
  },
  address: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
});

const OrderModel = mongoose.model("orders", OrderSchema);
export default OrderModel;
