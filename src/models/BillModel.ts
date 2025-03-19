import mongoose, { Schema } from "mongoose";

const billSchema = new Schema({
  createdBy: {
    type: String,
    require: true,
  },
  total: {
    type: Number,
    require: true,
  },
});

const BillModel = mongoose.model("bill", billSchema);
export default BillModel;
