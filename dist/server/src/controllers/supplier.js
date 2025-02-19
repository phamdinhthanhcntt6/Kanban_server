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
exports.updateSupplier = exports.removeSupplier = exports.getSuppliers = exports.getSupplierDetail = exports.getForm = exports.getExportSupplier = exports.createSupplier = void 0;
const supplier_1 = require("../form/supplier");
const SupplierModel_1 = __importDefault(require("../models/SupplierModel"));
const getSuppliers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pageSize, page } = req.query;
    try {
        const skip = (page - 1) * pageSize;
        const items = yield SupplierModel_1.default.find().skip(skip).limit(pageSize);
        const total = yield SupplierModel_1.default.countDocuments();
        res.status(200).json({
            message: "Suppliers",
            data: { total, items },
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.getSuppliers = getSuppliers;
const createSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const newSupplier = new SupplierModel_1.default(body);
        newSupplier.save();
        res.status(200).json({
            message: "Add new supplier successfully!",
            data: newSupplier,
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.createSupplier = createSupplier;
const updateSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { id } = req.query;
    try {
        yield SupplierModel_1.default.findByIdAndUpdate(id, body);
        res.status(200).json({
            message: "Update supplier successfully!",
            data: [],
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.updateSupplier = updateSupplier;
const removeSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        yield SupplierModel_1.default.findByIdAndDelete(id);
        res.status(200).json({
            message: "Remove supplier successfully!",
            data: [],
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.removeSupplier = removeSupplier;
const getForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const form = {
            title: "Supplier",
            layout: "horizontal",
            labelCol: 6,
            wrapperCol: 18,
            formItem: supplier_1.supplierForm,
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
const getExportSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { start, end } = req.query;
    const filter = {};
    if (start && end) {
        filter.createAt = {
            $lte: end,
            $gte: start,
        };
    }
    try {
        const items = yield SupplierModel_1.default.find(filter);
        const data = [];
        if (items.length > 0) {
            items.forEach((item) => {
                const values = {};
                body.forEach((key) => {
                    var _a;
                    values[`${key}`] = `${(_a = item._doc[`${key}`]) !== null && _a !== void 0 ? _a : ""}`;
                });
                data.push(values);
            });
        }
        res.status(200).json({
            message: "Suppliers",
            data: data,
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.getExportSupplier = getExportSupplier;
const getSupplierDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const detail = yield SupplierModel_1.default.findById(id);
    try {
        res.status(200).json({
            message: "",
            data: detail,
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
});
exports.getSupplierDetail = getSupplierDetail;
//# sourceMappingURL=supplier.js.map