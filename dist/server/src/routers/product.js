"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("../controllers/product");
const router = (0, express_1.Router)();
router.get("/", product_1.getProducts);
router.post("/create", product_1.createProduct);
router.put("/update", product_1.updateProduct);
router.delete("/remove", product_1.removeProduct);
router.get("/detail", product_1.getProductDetail);
router.post("/filter", product_1.filterProduct);
exports.default = router;
//# sourceMappingURL=product.js.map