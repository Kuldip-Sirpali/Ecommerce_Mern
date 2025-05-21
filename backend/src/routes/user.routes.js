import { Router } from "express";
import {
  googleOAuth,
  refreshAccessToken,
  registerUser,
  signInUser,
  signOutUser,
  verifyCode,
} from "../controllers/user.controller.js";
import { verifyUserJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/verify-code").post(verifyCode);
router.route("/signIn").post(signInUser);
router.route("/signOut").post( signOutUser);
router.route("/google").get(googleOAuth);
router.route("/refresh-token").post(refreshAccessToken);

export default router;
