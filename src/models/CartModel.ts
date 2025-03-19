import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
  subProductId: {
    type: String,
    require: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  count: Number,
  image: [String],
  size: String,
  color: String,
  price: Number,
  quantity: Number,
  productId: String,
  title: String,
});

const CartModel = mongoose.model("carts", cartSchema);

export default CartModel;
