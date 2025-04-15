import { Router } from "express";
import {
  createAddress,
  getAddressesByUid,
  getDefaultAddressDetail,
  removeAddress,
  setDefaultAddress,
  updateAddress,
} from "../controllers/address";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.get("/", getAddressesByUid);

router.use(verifyToken);

router.post("/create", createAddress);
router.post("/set-default", setDefaultAddress);
router.delete("/remove", removeAddress);
router.put("/update", updateAddress);
router.get("/detail", getDefaultAddressDetail);

export default router;
