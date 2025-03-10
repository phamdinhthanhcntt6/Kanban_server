import { Router } from "express";
import {
  createPromotion,
  getPromotions,
  removePromotion,
  updatePromotion,
} from "../controllers/promotion";

const router = Router();

router.get("/", getPromotions);

router.post("/create", createPromotion);
router.put("/update", updatePromotion);
router.delete("/remove", removePromotion);

export default router;
