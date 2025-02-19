"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_1 = require("../controllers/category");
const router = (0, express_1.Router)();
router.post("/create", category_1.createCategory);
router.get("/", category_1.getCategories);
router.put("/update", category_1.updateCategory);
router.delete("/remove", category_1.removeCategory);
router.get("/get-form", category_1.getForm);
router.get("/detail", category_1.getCategoryDetail);
exports.default = router;
//# sourceMappingURL=category.js.map