"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategory = exports.removeCategory = exports.getForm = exports.getCategoryDetail = exports.getCategories = exports.createCategory = void 0;
const category_1 = require("../form/category");
const CategoryModel_1 = __importDefault(require("../models/CategoryModel"));
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pageSize, page } = req.query;
    try {
        const skip = (page - 1) * pageSize;
        const items = yield CategoryModel_1.default.find().skip(skip).limit(pageSize);
        const total = yield CategoryModel_1.default.countDocuments();
        res.status(200).json({
            message: "Categories",
            data: { total, items },
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.getCategories = getCategories;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { parentId, slug } = body;
    try {
        const category = yield CategoryModel_1.default.find({
            $and: [{ parentId: { $eq: parentId } }, { slug: { $eq: slug } }],
        });
        if (category.length > 0) {
            throw new Error("Category already exists!");
        }
        const newCategory = new CategoryModel_1.default(body);
        yield newCategory.save();
        res.status(200).json({
            message: "Create category successfully!",
            data: newCategory,
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.createCategory = createCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { id } = req.query;
    try {
        yield CategoryModel_1.default.findByIdAndUpdate(id, body);
        res.status(200).json({
            message: "Update category successfully!",
            data: [],
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.updateCategory = updateCategory;
const findAndRemoveCategoryInProducts = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Tìm tất cả các danh mục con có parentId bằng với id được truyền vào
    const items = yield CategoryModel_1.default.find({ parentId: id });
    // Nếu có danh mục con
    if (items.length > 0) {
        // Duyệt qua từng danh mục con
        items.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
            // Gọi đệ quy để tìm và xóa các danh mục con của danh mục con hiện tại
            yield findAndRemoveCategoryInProducts(item._id);
        }));
    }
    // Xóa danh mục hiện tại khỏi các sản phẩm
    yield handleRemoveCategoryInProducts(id);
});
const handleRemoveCategoryInProducts = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Xóa danh mục khỏi cơ sở dữ liệu bằng ID
    yield CategoryModel_1.default.findByIdAndDelete(id);
    // Tìm tất cả các sản phẩm có chứa danh mục với ID được truyền vào
    const products = yield ProductModel_1.default.find({ categories: { $all: id } });
    // Nếu có sản phẩm chứa danh mục này
    if (products && products.length > 0) {
        // Duyệt qua từng sản phẩm
        products.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
            // Lấy danh sách các danh mục của sản phẩm
            const cats = item._doc.categories;
            // Tìm vị trí của danh mục cần xóa trong danh sách
            const index = cats.indexOf((e) => e === id);
            // Nếu tìm thấy danh mục trong danh sách, xóa nó
            index !== -1 && cats.splice(index, 1);
            // Cập nhật lại sản phẩm với danh sách danh mục đã được xóa
            yield ProductModel_1.default.findByIdAndUpdate(item._id, { categories: cats });
        }));
    }
});
const removeCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, isDeleted } = req.query;
    try {
        yield findAndRemoveCategoryInProducts(id);
        if (isDeleted) {
            yield CategoryModel_1.default.findByIdAndDelete(id);
        }
        else {
            yield CategoryModel_1.default.findByIdAndUpdate(id, {
                isDeleted: false,
            });
        }
        yield res.status(200).json({
            message: "Remove category successfully!",
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.removeCategory = removeCategory;
const getForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const form = {
            title: "Category",
            layout: "horizontal",
            labelCol: 6,
            wrapperCol: 18,
            formItem: category_1.categoryForm,
        };
        res.status(200).json({
            message: "",
            data: form,
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
});
exports.getForm = getForm;
const getCategoryDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const item = yield CategoryModel_1.default.findById(id);
    try {
        res.status(200).json({
            message: "",
            data: item,
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
});
exports.getCategoryDetail = getCategoryDetail;
//# sourceMappingURL=category.js.map