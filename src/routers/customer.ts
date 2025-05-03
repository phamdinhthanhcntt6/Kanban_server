import { Router } from "express";
import {
  checkCustomer,
  getBestSellerProduct,
  getCategories,
  getProductDetail,
  getProducts,
  login,
  loginWithGoogle,
  refreshToken,
  register,
  resetPassword,
  updateCustomer,
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
router.get("/best-seller", getBestSellerProduct);
router.get("/product/detail", getProductDetail);
router.put("/update", updateCustomer);

export default router;
