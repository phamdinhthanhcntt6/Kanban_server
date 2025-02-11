import { Router } from "express";
import { createSubProduct } from "../controllers/subProduct";

const router = Router();

router.post("/create", createSubProduct);

export default router;
