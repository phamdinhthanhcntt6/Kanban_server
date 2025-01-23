import { categoryForm } from "../form/category";
import CategoryModel from "../models/CategoryModel";

const getCategories = async (req: any, res: any) => {
  const { pageSize, page } = req.query;

  try {
    const skip = (page - 1) * pageSize;
    const items = await CategoryModel.find().skip(skip).limit(pageSize);

    const total = await CategoryModel.countDocuments();

    res.status(200).json({
      message: "Categories",
      data: { total, items },
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const createCategory = async (req: any, res: any) => {
  const body = req.body;

  const { parentId, title, description, slug } = body;

  try {
    const category = await CategoryModel.find({
      $and: [{ parentId: { $eq: parentId } }, { slug: { $eq: slug } }],
    });

    if (category.length > 0) {
      throw new Error("Category already exists!");
    }

    const newCategory = new CategoryModel(body);
    await newCategory.save();

    res.status(200).json({
      message: "Create category successfully!",
      data: newCategory,
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const updateCategory = async (req: any, res: any) => {
  const body = req.body;
  const { id } = req.query;
  try {
    await CategoryModel.findByIdAndUpdate(id, body);

    res.status(200).json({
      message: "Update category successfully!",
      data: [],
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const removeCategory = async (req: any, res: any) => {
  const { id } = req.query;
  try {
    await CategoryModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Remove category successfully!",
      data: [],
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const getForm = async (req: any, res: any) => {
  try {
    const form = {
      title: "Category",
      layout: "horizontal",
      labelCol: 6,
      wrapperCol: 18,
      formItem: categoryForm,
    };

    res.status(200).json({
      message: "",
      data: form,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export {
  createCategory,
  getCategories,
  updateCategory,
  removeCategory,
  getForm,
};
