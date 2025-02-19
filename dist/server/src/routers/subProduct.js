"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subProduct_1 = require("../controllers/subProduct");
const router = (0, express_1.Router)();
router.post("/create", subProduct_1.createSubProduct);
router.get("/filter", subProduct_1.filterProduct);
router.delete("/remove", subProduct_1.removeSubProduct);
router.put("/update", subProduct_1.updateSubProduct);
exports.default = router;
//# sourceMappingURL=subProduct.js.map