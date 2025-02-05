import { Router } from "express";
import {
  createCategory,
  getCategories,
  getCategoryDetail,
  getForm,
  removeCategory,
  updateCategory,
} from "../controllers/category";

const router = Router();

router.post("/create", createCategory);
router.get("/", getCategories);
router.put("/update", updateCategory);
router.delete("/remove", removeCategory);
router.get("/get-form", getForm);
router.get("/detail", getCategoryDetail);

export default router;
