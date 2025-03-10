"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderForm = void 0;
exports.orderForm = [
    {
        key: "name",
        value: "name",
        label: "Order name",
        placeholder: "Enter supplier name",
        type: "default",
        required: true,
        message: "Enter supplier name",
        default_value: "",
        displayLength: 400,
    },
    {
        key: "email",
        value: "email",
        label: "Order email",
        placeholder: "Enter supplier Email",
        type: "default",
        default_value: "",
        displayLength: 150,
    },
    {
        key: "active",
        value: "active",
        label: "Order active",
        placeholder: "Enter supplier active",
        type: "number",
        default_value: "",
        displayLength: 150,
    },
    {
        key: "product",
        value: "product",
        label: "Order product",
        placeholder: "Entersupplier product",
        type: "default",
        message: "Enter supplier product",
        default_value: "",
        displayLength: 150,
    },
    {
        key: "categories",
        value: "categories",
        label: "Categories",
        placeholder: "Select product category",
        default_value: [],
        type: "select",
        lookup_items: [],
        message: "",
        displayLength: 150,
    },
    {
        key: "price",
        value: "price",
        label: "Buying price",
        placeholder: "Enter buying price",
        type: "number",
        message: "",
        default_value: "",
        displayLength: 150,
    },
    {
        key: "contact",
        value: "contact",
        label: "Contact Number",
        placeholder: "Enter supplier contact number",
        type: "tel",
        message: "",
        default_value: "",
        displayLength: 150,
    },
    {
        key: "type",
        value: "isTaking",
        label: "Talking",
        placeholder: "",
        type: "checkbox",
        message: "",
        default_value: null,
        displayLength: 150,
    },
];
//# sourceMappingURL=order.js.map