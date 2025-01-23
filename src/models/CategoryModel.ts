import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
  title: {
    require: true,
    type: String,
  },
  parentId: String,
  slug: {
    type: String,
  },
  description: String,
  createAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: Date.now(),
  },
});

const CategoryModel = mongoose.model("category", categorySchema);
export default CategoryModel;
