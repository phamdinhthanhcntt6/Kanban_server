import { Router } from "express";
import {
  createProduct,
  getProductDetail,
  getProducts,
  removeProduct,
  updateProduct,
} from "../controllers/product";

const router = Router();

router.get("/", getProducts);
router.post("/create", createProduct);
router.put("/update", updateProduct);
router.delete("/remove", removeProduct);
router.get("/detail", getProductDetail);

export default router;
