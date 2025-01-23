import { productForm } from "../form/product";
import ProductModel from "../models/ProductModel";

const getProducts = async (req: any, res: any) => {
  const { page, pageSize } = req.query;

  try {
    const skip = (page - 1) * pageSize;

    const items = await ProductModel.find().skip(skip).limit(pageSize);

    const total = await ProductModel.countDocuments();

    res.status(200).json({
      message: "Products",
      data: { total, items },
    });
  } catch (error: any) {
    console.log(error);
    res.status(404).json({
      message: error.message,
    });
  }
};

const createProduct = async (req: any, res: any) => {
  const body = req.body;

  try {
    const newProduct = new ProductModel(body);
    newProduct.save();

    res.status(200).json({
      message: "Add new product successfully!",
      data: newProduct,
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const updateProduct = async (req: any, res: any) => {
  const body = req.body;
  const { id } = req.query;

  try {
    await ProductModel.findByIdAndUpdate(id, body);
    res.status(200).json({
      message: "Update product successfully!",
      data: [],
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const removeProduct = async (req: any, res: any) => {
  const { id } = req.query;

  try {
    await ProductModel.findByIdAndDelete(id);
    res.status(200).json({
      message: "Remove product successfully!",
      data: [],
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const getProductForm = async (req: any, res: any) => {
  try {
    const form = {
      title: "Product",
      layout: "horizontal",
      labecol: 6,
      wrapperCol: 18,
      formItem: productForm,
    };

    res.status(200).json({
      message: "",
      data: form,
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export {
  getProducts,
  getProductForm,
  createProduct,
  updateProduct,
  removeProduct,
};
