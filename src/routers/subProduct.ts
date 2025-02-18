import { Router } from "express";
import { createSubProduct, filterProduct } from "../controllers/subProduct";

const router = Router();

router.post("/create", createSubProduct);
router.get("/filter", filterProduct);

export default router;
