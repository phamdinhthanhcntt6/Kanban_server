import mongoose, { Schema } from "mongoose";

const wishListSchema = new Schema({
  createdBy: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    require: true,
    ref: "products",
  },
});

const WishListModel = mongoose.model("wishlists", wishListSchema);
export default WishListModel;
