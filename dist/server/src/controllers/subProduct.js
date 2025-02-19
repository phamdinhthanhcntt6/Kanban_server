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
exports.updateSubProduct = exports.removeSubProduct = exports.filterProduct = exports.createSubProduct = void 0;
const SubProductModel_1 = __importDefault(require("../models/SubProductModel"));
const createSubProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const newSubProduct = new SubProductModel_1.default(body);
        yield newSubProduct.save();
        res.status(200).json({
            message: "Create sub product successfully!",
            data: newSubProduct,
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.createSubProduct = createSubProduct;
const filterProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const datas = yield SubProductModel_1.default.find();
        const colors = [];
        const sizes = [];
        const prices = [];
        if (datas.length > 0) {
            datas.forEach((item) => {
                item.color && !colors.includes(item.color) && colors.push(item.color);
                item.size && sizes.push({ label: item.size, value: item.size });
                prices.push(item.price);
            });
        }
        res.status(200).json({
            message: "fafa",
            data: {
                colors,
                prices,
                sizes,
            },
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.filterProduct = filterProduct;
const removeSubProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        yield SubProductModel_1.default.findByIdAndDelete(id);
        res.status(200).json({
            message: "Remove sub product successfully!",
            data: [],
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.removeSubProduct = removeSubProduct;
const updateSubProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { id } = req.query;
    try {
        yield SubProductModel_1.default.findByIdAndUpdate(id, body);
        res.status(200).json({
            message: "Update sub product successfully!",
            data: [],
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.updateSubProduct = updateSubProduct;
//# sourceMappingURL=subProduct.js.map