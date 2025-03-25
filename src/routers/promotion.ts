import { Router } from "express";
import {
  checkPromotion,
  createPromotion,
  getPromotions,
  removePromotion,
  updatePromotion,
} from "../controllers/promotion";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.get("/", getPromotions);
router.get("/check", checkPromotion);

router.use(verifyToken);

router.post("/create", createPromotion);
router.put("/update", updatePromotion);
router.delete("/remove", removePromotion);

export default router;
