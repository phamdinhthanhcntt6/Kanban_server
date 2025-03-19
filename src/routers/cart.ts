import { Router } from "express";
import {
  addProductInCart,
  getProductInCart,
  removeProductInCart,
  updateCountProductInCart,
} from "../controllers/cart";

const router = Router();

router.get("/", getProductInCart);
router.post("/create", addProductInCart);
router.delete("/remove", removeProductInCart);
router.put("/update-count", updateCountProductInCart);

export default router;
