import { Router } from "express";
import {
  createProduct,
  getProductForm,
  getProducts,
  removeProduct,
  updateProduct,
} from "../controllers/product";

const router = Router();

router.get("/", getProducts);
router.get("/get-form", getProductForm);
router.post("/create", createProduct);
router.put("/update", updateProduct);
router.delete("/remove", removeProduct);

export default router;
