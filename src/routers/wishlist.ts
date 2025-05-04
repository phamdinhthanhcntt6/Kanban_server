import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import {
  addProductInWidshList,
  checkProductInWishlist,
  getWishListByUid,
  removeProductInWishlist,
} from "../controllers/wishlist";

const router = Router();

router.use(verifyToken);

router.post("/add", addProductInWidshList);

router.get("/check", checkProductInWishlist);

router.delete("/remove", removeProductInWishlist);

router.get("/get-by-uid", getWishListByUid);

export default router;
