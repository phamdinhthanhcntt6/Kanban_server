import { Router } from "express";
import {
  createCategory,
  getCategories,
  getForm,
  removeCategory,
  updateCategory,
} from "../controllers/category";

const router = Router();

router.post("/create", createCategory);
router.get("/", getCategories);
router.post("/update", updateCategory);
router.delete("/remove", removeCategory);
router.get("/get-form", getForm);

export default router;
