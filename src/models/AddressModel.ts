import mongoose, { Schema } from "mongoose";

const AddressSchema = new Schema({
  createdBy: {
    type: String,
    required: true,
  },
  name: String,
  address: {
    type: String,
    required: true,
  },
  pinCode: String,
  phone: String,
  isDefault: {
    type: Boolean,
    default: false,
  },
});

const AddressModel = mongoose.model("addresses", AddressSchema);
export default AddressModel;
