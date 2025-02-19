import CategoryModel from "../models/CategoryModel";
import ProductModel from "../models/ProductModel";
import SubProductModel from "../models/SubProductModel";
import SupplierModel from "../models/SupplierModel";

const getProducts = async (req: any, res: any) => {
  const { page, pageSize, title } = req.query;

  const filter: any = {};

  if (title) {
    filter.slug = { $regex: title };
  }

  try {
    const skip = (page - 1) * pageSize;

    const products = await ProductModel.find(filter).skip(skip).limit(pageSize);

    const count = await ProductModel.find(filter);

    const total = await ProductModel.countDocuments();

    const items: any = [];

    if (products.length > 0) {
      products.forEach(async (item: any) => {
        const children = await SubProductModel.find({ productId: item._id });

        const categoriesName = await CategoryModel.find({
          _id: { $in: item.categories },
        });

        const supplier = await SupplierModel.findById(item.supplier);

        items.push({
          ...item._doc,
          categoriesName: categoriesName,
          supplierName: supplier,
          subItems: children,
        });

        items.length === products.length &&
          res.status(200).json({
            message: "Products",
            data: { items, total, count },
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

const filterProduct = async (req: any, res: any) => {
  const body = req.body;

  const { color, size, price, category } = body;

  const filter: any = {};

  if (color && color.length > 0) {
    filter.color = { $all: color };
  }

  if (size) {
    filter.size = { $eq: size };
  }

  if (price && Array.isArray(price) && price.length === 2) {
    filter.price = {
      $lte: price[1],
      $gte: price[0],
    };
  }

  try {
    const subProduct = await SubProductModel.find(filter);

    const productIds: string[] = [];

    const products: any[] = [];

    if (subProduct.length > 0) {
      subProduct.forEach(
        (item) =>
          item.productId &&
          !productIds.includes(item.productId) &&
          productIds.push(item.productId)
      );

      await Promise.all(
        productIds.map(async (id) => {
          const product: any = await ProductModel.findById(id);
          const children = subProduct.filter(
            (element) => element.productId === id
          );

          const items = { ...product._doc, subItems: children };

          products.push(items);
        })
      );

      res.status(200).json({
        data: {
          items: products,
          total: products.length,
        },
      });
    } else {
      res.status(200).json({
        message: "",
        data: [],
      });
    }
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export {
  createProduct,
  filterProduct,
  getProductDetail,
  getProducts,
  removeProduct,
  updateProduct,
};
