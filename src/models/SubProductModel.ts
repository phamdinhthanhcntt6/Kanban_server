import mongoose, { Schema } from "mongoose";

const subProductSchema = new Schema(
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
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    images: [String],
  },
  { timestamps: true }
);

const SubProductModel = mongoose.model("subProducts", subProductSchema);
export default SubProductModel;
