import mongoose, { Schema } from "mongoose";

const billProductSchema = new Schema(
  {
    productId: {
      type: String,
      require: true,
    },
    size: String,
    color: String,
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    discount: Number,
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    images: [String],
  },
  { timestamps: true }
);

const BillProductModel = mongoose.model("billProduct", billProductSchema);
export default BillProductModel;
