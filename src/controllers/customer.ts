import bcrypt from "bcrypt";
import dotenv from "dotenv";
import BillProductModel from "../models/BillProductModel";
import CategoryModel from "../models/CategoryModel";
import CustomerModel from "../models/CustomerModel";
import ProductModel from "../models/ProductModel";
import SubProductModel from "../models/SubProductModel";
import SupplierModel from "../models/SupplierModel";
import { generatorRandomText } from "../utils/generatorRandomText";
import { getAccesstoken } from "../utils/getAccessToken";

dotenv.config();

const register = async (req: any, res: any) => {
  const body = req.body;
  const { email, password } = body;
  try {
    const client = await CustomerModel.findOne({ email });

    if (client) {
      throw new Error(`Account is existed`);
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    body.password = hashpassword;

    const newClient: any = new CustomerModel(body);
    await newClient.save();

    delete newClient._doc.password;

    res.status(200).json({
      message: "Register",
      data: {
        ...newClient._doc,
        token: await getAccesstoken({
          _id: newClient._id,
          email: newClient.email,
          rule: 0,
        }),
      },
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const login = async (req: any, res: any) => {
  const body = req.body;
  const { email, password } = body;
  try {
    const customer: any = await CustomerModel.findOne({ email });

    if (!customer) {
      throw new Error(`Account does not exist`);
    }

    const isMatchPassword = await bcrypt.compare(password, customer.password);

    if (!isMatchPassword) {
      throw new Error("Wrong account or password");
    }

    delete customer._doc.password;

    res.status(200).json({
      message: "Login successfully",
      data: {
        ...customer._doc,
        token: await getAccesstoken({
          _id: customer._id,
          email: customer.email,
          rule: customer.rule ?? 0,
        }),
      },
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const loginWithGoogle = async (req: any, res: any) => {
  const body = req.body;
  const { email, name } = body;
  try {
    const user: any = await CustomerModel.findOne({ email });

    if (user) {
      await CustomerModel.findByIdAndUpdate(user._id, body);

      const newUser: any = await CustomerModel.findById(user._id);

      delete newUser._doc.password;

      res.status(200).json({
        message: "Login successfully!",
        data: {
          ...newUser._doc,
          token: await getAccesstoken({
            _id: newUser._id,
            email: newUser.email,
            rule: newUser.rule ?? 1,
          }),
        },
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(generatorRandomText(6), salt);

      body.password = hashpassword;

      const newUser: any = new CustomerModel(body);
      await newUser.save();

      delete newUser._doc.password;

      res.status(200).json({
        message: "Register successfully!",
        data: {
          ...newUser._doc,
          token: await getAccesstoken({
            _id: newUser._id,
            email: newUser.email,
            rule: 1,
          }),
        },
      });
    }
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const refreshToken = async (req: any, res: any) => {
  const { id } = req.query;

  try {
    const user = await CustomerModel.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    const token = await getAccesstoken({
      _id: id,
      email: user.email,
      rule: user.rule,
    });

    res.status(200).json({
      message: "refresh token",
      data: token,
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const checkCustomer = async (req: any, res: any) => {
  const body = req.body;
  const { email } = body;

  const customer: any = await CustomerModel.findOne({ email });

  try {
    if (!customer) {
      throw new Error("Account does not exist!");
    } else {
      res.status(200).json({});
    }
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const resetPassword = async (req: any, res: any) => {
  const body = req.body;
  const { email } = req.query;

  try {
    const customer = await CustomerModel.findOne({ email });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(body.password, salt);
    body.password = hashpassword;

    const updatedCustomer = await CustomerModel.findByIdAndUpdate(
      customer._id,
      body,
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({
        message: "Update failed!",
      });
    }

    res.status(200).json({
      message: "Update account successfully!",
      data: [],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

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

const getCategories = async (req: any, res: any) => {
  try {
    const category = await CategoryModel.find();

    res.status(200).json({
      message: "Categories",
      data: category,
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const getRangePrice = async (id: string) => {
  const subProduct = await SubProductModel.find({ productId: id });

  const range = subProduct.map((item) => item.price);

  const min = Math.min(...range);

  const max = Math.max(...range);

  return [min, max];
};

const getBestSellerProduct = async (req: any, res: any) => {
  try {
    const product = await BillProductModel.find();

    if (product.length > 0) {
    } else {
      const items = await ProductModel.find().limit(8);

      const data: any = [];

      items.forEach(async (item: any) => {
        data.push({ ...item._doc, price: await getRangePrice(item._id) });
        data.length === items.length &&
          res.status(200).json({
            data: data,
          });
      });
    }
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getProductDetail = async (req: any, res: any) => {
  const { id } = req.query;

  const detail = await ProductModel.findById(id);

  const subProduct = await SubProductModel.find({ productId: id });

  try {
    res.status(200).json({
      message: "",
      data: {
        items: detail,
        subProduct,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export {
  checkCustomer,
  getBestSellerProduct,
  getCategories,
  getProducts,
  login,
  loginWithGoogle,
  refreshToken,
  register,
  resetPassword,
  getProductDetail,
};
