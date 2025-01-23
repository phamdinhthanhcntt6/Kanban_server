import { Router } from "express";
import {
  createSupplier,
  getExportSupplier,
  getForm,
  getSuppliers,
  removeSupplier,
  updateSupplier,
} from "../controllers/supplier";

const router = Router();

router.get("/", getSuppliers);
router.post("/get-export-data", getExportSupplier);
router.post("/create", createSupplier);
router.put("/update", updateSupplier);
router.delete("/remove", removeSupplier);
router.get("/get-form", getForm);

export default router;
