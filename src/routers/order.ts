import { Router } from "express";
import {
  createOrder,
  getExportOrder,
  getForm,
  getOrder,
  removeOrder,
  updateOrder,
} from "../controllers/order";

const router = Router();

router.get("/", getOrder);
router.post("/get-export-data", getExportOrder);
router.post("/create", createOrder);
router.put("/update", updateOrder);
router.delete("/remove", removeOrder);
router.get("/get-form", getForm);

export default router;
