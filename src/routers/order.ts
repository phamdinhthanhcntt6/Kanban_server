import { Router } from "express";
import {
  createOrder,
  getOrders,
  getOrderDetail,
  removeOrder,
  updateOrder,
  getOrderByUid,
} from "../controllers/order";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.get("/", getOrders);

router.use(verifyToken);

router.post("/create", createOrder);
router.put("/update", updateOrder);
router.delete("/remove", removeOrder);
router.get("/detail", getOrderDetail);
router.get("/get-by-uid", getOrderByUid);

export default router;
