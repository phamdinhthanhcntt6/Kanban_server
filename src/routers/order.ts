import { Router } from "express";
import {
  createOrder,
  getExportOrder,
  getOrder,
  getOrderDetail,
  removeOrder,
  updateOrder,
} from "../controllers/order";

const router = Router();

router.get("/", getOrder);
router.post("/get-export-data", getExportOrder);
router.post("/create", createOrder);
router.put("/update", updateOrder);
router.delete("/remove", removeOrder);
router.get("/detail", getOrderDetail);

export default router;
