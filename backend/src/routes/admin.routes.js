import { Router } from "express";
import {
  deleteProduct,
  deleteUser,
  getAllProducts,
  getAllUsers,
  logInAdmin,
  logOutAdmin,
  registerAdmin,
} from "../controllers/admin.controller.js";
import {
  verifyAdmin,
  verifyAdminJWT,
} from "../middlewares/admin.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();
router.route("/register").post(upload.single("image"), registerAdmin);
router.route("/logIn").post(logInAdmin);
router.route("/logOut").post(verifyAdminJWT, logOutAdmin);
router.route("/get-all-users").get(verifyAdminJWT, verifyAdmin, getAllUsers);
router.route("/get-all-products").get(verifyAdminJWT, verifyAdmin, getAllProducts);
router.route("/delete-product").delete(verifyAdminJWT,verifyAdmin,deleteProduct);
router.route("/delete-user").delete(verifyAdminJWT,verifyAdmin,deleteUser);
export default router;
