import { Router } from "express";
import {
  createSubProduct,
  filterProduct,
  removeSubProduct,
  updateSubProduct,
} from "../controllers/subProduct";

const router = Router();

router.post("/create", createSubProduct);
router.get("/filter", filterProduct);
router.delete("/remove", removeSubProduct);
router.put("/update", updateSubProduct);

export default router;
