import { categoryForm } from "../form/category";
import CategoryModel from "../models/CategoryModel";
import ProductModel from "../models/ProductModel";

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

const findAndRemoveCategoryInProducts = async (id: string) => {
  // Tìm tất cả các danh mục con có parentId bằng với id được truyền vào
  const items = await CategoryModel.find({ parentId: id });

  // Nếu có danh mục con
  if (items.length > 0) {
    // Duyệt qua từng danh mục con
    items.forEach(async (item: any) => {
      // Gọi đệ quy để tìm và xóa các danh mục con của danh mục con hiện tại
      await findAndRemoveCategoryInProducts(item._id);
    });
  }

  // Xóa danh mục hiện tại khỏi các sản phẩm
  await handleRemoveCategoryInProducts(id);
};

const handleRemoveCategoryInProducts = async (id: string) => {
  // Xóa danh mục khỏi cơ sở dữ liệu bằng ID
  await CategoryModel.findByIdAndDelete(id);

  // Tìm tất cả các sản phẩm có chứa danh mục với ID được truyền vào
  const products = await ProductModel.find({ categories: { $all: id } });

  // Nếu có sản phẩm chứa danh mục này
  if (products && products.length > 0) {
    // Duyệt qua từng sản phẩm
    products.forEach(async (item: any) => {
      // Lấy danh sách các danh mục của sản phẩm
      const cats = item._doc.categories;

      // Tìm vị trí của danh mục cần xóa trong danh sách
      const index = cats.indexOf((e: string) => e === id);

      // Nếu tìm thấy danh mục trong danh sách, xóa nó
      index !== -1 && cats.splice(index, 1);

      // Cập nhật lại sản phẩm với danh sách danh mục đã được xóa
      await ProductModel.findByIdAndUpdate(item._id, { categories: cats });
    });
  }
};

const removeCategory = async (req: any, res: any) => {
  const { id, isDeleted } = req.query;

  try {
    await findAndRemoveCategoryInProducts(id);

    if (isDeleted) {
      await CategoryModel.findByIdAndDelete(id);
    } else {
      await CategoryModel.findByIdAndUpdate(id, {
        isDeleted: false,
      });
    }
    await res.status(200).json({
      message: "Remove category successfully!",
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

const getCategoryDetail = async (req: any, res: any) => {
  const { id } = req.query;

  const item = await CategoryModel.findById(id);

  try {
    res.status(200).json({
      message: "",
      data: item,
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
  getCategoryDetail,
};
