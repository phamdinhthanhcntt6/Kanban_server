"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supplier_1 = require("../controllers/supplier");
const router = (0, express_1.Router)();
router.get("/", supplier_1.getSuppliers);
router.post("/get-export-data", supplier_1.getExportSupplier);
router.post("/create", supplier_1.createSupplier);
router.put("/update", supplier_1.updateSupplier);
router.delete("/remove", supplier_1.removeSupplier);
router.get("/get-form", supplier_1.getForm);
router.get("/detail", supplier_1.getSupplierDetail);
exports.default = router;
//# sourceMappingURL=supplier.js.map