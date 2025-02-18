import { Router } from "express";
import {
  createProduct,
  filterProduct,
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
router.post("/filter", filterProduct);

export default router;
