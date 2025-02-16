import ProductModel from "../models/ProductModel";
import SubProductModel from "../models/SubProductModel";

const getProducts = async (req: any, res: any) => {
  const { page, pageSize } = req.query;

  try {
    const skip = (page - 1) * pageSize;

    const products = await ProductModel.find().skip(skip).limit(pageSize);

    const items: any = [];

    if (products.length > 0) {
      products.forEach(async (item: any) => {
        const children = await SubProductModel.find({ productId: item._id });

        items.push({
          ...item._doc,
          subItems: children,
        });

        items.length === products.length &&
          res.status(200).json({
            message: "Products",
            data: items,
          });
      });
    } else {
      res.status(200).json({
        message: "Products",
        data: [],
      });
    }
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
    await newProduct.save();

    res.status(200).json({
      message: "Create product successfully!",
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
    const subItems = await SubProductModel.find({ productId: id });

    if (subItems.length > 0) {
      await handleRemoveSubProduct(subItems);
    }

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

const handleRemoveSubProduct = async (items: any[]) => {
  items.forEach(
    async (item) => await SubProductModel.findByIdAndDelete(item.id)
  );
};

const getProductDetail = async (req: any, res: any) => {
  const { id } = req.query;

  const detail = await ProductModel.findById(id);

  try {
    res.status(200).json({
      message: "",
      data: detail,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export {
  getProducts,
  createProduct,
  updateProduct,
  removeProduct,
  getProductDetail,
};
