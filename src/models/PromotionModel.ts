import mongoose, { Schema } from "mongoose";

const PromotionSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: String,
    code: {
      type: String,
      require: true,
    },
    value: {
      type: Number,
      require: true,
    },
    numOfAvailable: {
      type: Number,
      default: 100,
    },
    type: {
      type: String,
      default: "discount",
    },
    startAt: {
      type: Date,
      require: true,
    },
    endAt: Date,
    images: [String],
  },
  {
    timestamps: true,
  }
);

const PromotionModel = mongoose.model("promotions", PromotionSchema);
export default PromotionModel;
