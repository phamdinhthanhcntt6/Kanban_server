import { Router } from "express";
import {
  getCategories,
  getProducts,
  login,
  loginWithGoogle,
  refreshToken,
  register,
  checkCustomer,
  resetPassword,
} from "../controllers/customer";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google-login", loginWithGoogle);
router.get("/refresh-token", refreshToken);
router.get("/get-products", getProducts);
router.get("/get-categories", getCategories);
router.post("/check-account", checkCustomer);
router.put("/reset-password", resetPassword);

export default router;
