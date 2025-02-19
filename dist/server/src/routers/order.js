"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_1 = require("../controllers/order");
const router = (0, express_1.Router)();
router.get("/", order_1.getOrder);
router.post("/get-export-data", order_1.getExportOrder);
router.post("/create", order_1.createOrder);
router.put("/update", order_1.updateOrder);
router.delete("/remove", order_1.removeOrder);
router.get("/get-form", order_1.getForm);
exports.default = router;
//# sourceMappingURL=order.js.map