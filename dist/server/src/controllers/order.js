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
exports.updateOrder = exports.removeOrder = exports.getOrder = exports.getForm = exports.getExportOrder = exports.createOrder = void 0;
const order_1 = require("../form/order");
const OrderModel_1 = __importDefault(require("../models/OrderModel"));
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pageSize, page } = req.query;
    try {
        const skip = (page - 1) * pageSize;
        const items = yield OrderModel_1.default.find().skip(skip).limit(pageSize);
        const total = yield OrderModel_1.default.countDocuments();
        res.status(200).json({
            message: "order",
            data: { total, items },
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.getOrder = getOrder;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const newOrder = new OrderModel_1.default(body);
        newOrder.save();
        res.status(200).json({
            message: "Add new order successfully!",
            data: newOrder,
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.createOrder = createOrder;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { id } = req.query;
    try {
        yield OrderModel_1.default.findByIdAndUpdate(id, body);
        res.status(200).json({
            message: "Update order successfully!",
            data: [],
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.updateOrder = updateOrder;
const removeOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        yield OrderModel_1.default.findByIdAndDelete(id);
        res.status(200).json({
            message: "Remove order successfully!",
            data: [],
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.removeOrder = removeOrder;
const getForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const form = {
            title: "Order",
            layout: "horizontal",
            labelCol: 6,
            wrapperCol: 18,
            formItem: order_1.orderForm,
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
const getExportOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const items = yield OrderModel_1.default.find(filter);
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
            message: "Order",
            data: data,
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.getExportOrder = getExportOrder;
//# sourceMappingURL=order.js.map