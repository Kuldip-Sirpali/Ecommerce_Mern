import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getCategorizedProducts,
  getProduct,
  searchProduct,
} from "../controllers/product.controller.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import { verifyAdminJWT } from "../middlewares/admin.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyUserJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/create-product").post(verifyAdminJWT, verifyAdmin, upload.single("image"), createProduct);
router.route("/get-products").get(getAllProducts);
router.route("/get-product").get(verifyUserJWT, getProduct);
router.route("/get-categorized-products").get(getCategorizedProducts);
router.route("/search-product").get(searchProduct);

export default router;
