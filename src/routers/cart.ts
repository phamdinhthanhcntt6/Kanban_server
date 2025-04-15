import { Router } from "express";
import {
  addProductInCart,
  clearCart,
  getProductInCart,
  removeProductInCart,
  updateCountProductInCart,
} from "../controllers/cart";

const router = Router();

router.get("/", getProductInCart);
router.post("/create", addProductInCart);
router.delete("/remove", removeProductInCart);
router.put("/update-count", updateCountProductInCart);
router.delete("/clear", clearCart);

export default router;
