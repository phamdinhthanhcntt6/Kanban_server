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
exports.updateProduct = exports.removeProduct = exports.getProducts = exports.getProductDetail = exports.filterProduct = exports.createProduct = void 0;
const CategoryModel_1 = __importDefault(require("../models/CategoryModel"));
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const SubProductModel_1 = __importDefault(require("../models/SubProductModel"));
const SupplierModel_1 = __importDefault(require("../models/SupplierModel"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, pageSize, title } = req.query;
    const filter = {};
    if (title) {
        filter.slug = { $regex: title };
    }
    try {
        const skip = (page - 1) * pageSize;
        const products = yield ProductModel_1.default.find(filter).skip(skip).limit(pageSize);
        const count = yield ProductModel_1.default.find(filter);
        const total = yield ProductModel_1.default.countDocuments();
        const items = [];
        if (products.length > 0) {
            products.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
                const children = yield SubProductModel_1.default.find({ productId: item._id });
                const categoriesName = yield CategoryModel_1.default.find({
                    _id: { $in: item.categories },
                });
                const supplier = yield SupplierModel_1.default.findById(item.supplier);
                items.push(Object.assign(Object.assign({}, item._doc), { categoriesName: categoriesName, supplierName: supplier, subItems: children }));
                items.length === products.length &&
                    res.status(200).json({
                        message: "Products",
                        data: { items, total, count },
                    });
            }));
        }
        else {
            res.status(200).json({
                message: "Products",
                data: [],
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.getProducts = getProducts;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const newProduct = new ProductModel_1.default(body);
        yield newProduct.save();
        res.status(200).json({
            message: "Create product successfully!",
            data: newProduct,
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { id } = req.query;
    try {
        yield ProductModel_1.default.findByIdAndUpdate(id, body);
        res.status(200).json({
            message: "Update product successfully!",
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.updateProduct = updateProduct;
const removeProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        const subItems = yield SubProductModel_1.default.find({ productId: id });
        if (subItems.length > 0) {
            yield handleRemoveSubProduct(subItems);
        }
        yield ProductModel_1.default.findByIdAndDelete(id);
        res.status(200).json({
            message: "Remove product successfully!",
            data: [],
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.removeProduct = removeProduct;
const handleRemoveSubProduct = (items) => __awaiter(void 0, void 0, void 0, function* () {
    items.forEach((item) => __awaiter(void 0, void 0, void 0, function* () { return yield SubProductModel_1.default.findByIdAndDelete(item.id); }));
});
const getProductDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const detail = yield ProductModel_1.default.findById(id);
    const subProduct = yield SubProductModel_1.default.find({ productId: id });
    try {
        res.status(200).json({
            message: "",
            data: {
                items: detail,
                subProduct,
            },
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
});
exports.getProductDetail = getProductDetail;
const filterProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { color, size, price, category } = body;
    const filter = {};
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
        const subProduct = yield SubProductModel_1.default.find(filter);
        const productIds = [];
        const products = [];
        if (subProduct.length > 0) {
            subProduct.forEach((item) => item.productId &&
                !productIds.includes(item.productId) &&
                productIds.push(item.productId));
            yield Promise.all(productIds.map((id) => __awaiter(void 0, void 0, void 0, function* () {
                const product = yield ProductModel_1.default.findById(id);
                const children = subProduct.filter((element) => element.productId === id);
                const items = Object.assign(Object.assign({}, product._doc), { subItems: children });
                products.push(items);
            })));
            res.status(200).json({
                data: {
                    items: products,
                    total: products.length,
                },
            });
        }
        else {
            res.status(200).json({
                message: "",
                data: [],
            });
        }
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
});
exports.filterProduct = filterProduct;
//# sourceMappingURL=product.js.map