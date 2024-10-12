import { Router } from "express";
import {
  registerUser,
  signInUser,
  signOutUser,
} from "../controllers/user.controller.js";
import { verifyUserJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/signIn").post(signInUser);
router.route("/signOut").post(verifyUserJWT, signOutUser);

export default router;
