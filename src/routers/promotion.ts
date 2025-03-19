import { Router } from "express";
import {
  createPromotion,
  getPromotions,
  removePromotion,
  updatePromotion,
} from "../controllers/promotion";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.get("/", getPromotions);

router.use(verifyToken);

router.post("/create", createPromotion);
router.put("/update", updatePromotion);
router.delete("/remove", removePromotion);

export default router;
