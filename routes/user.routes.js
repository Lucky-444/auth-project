import express from "express";
import {
  registerUser,
  verifyUser,
  login,
  getProfile,
  logoutUser,
  forgotPassword,
  resetPassword,

} from "../controller/user.controller.js";
import { IsLoggedIn } from '../middlewares/auth.middleware.js';


const router = express.Router();


router.post("/register", registerUser);
router.get("/verify/:token", verifyUser);
router.post("/login", login);

router.get("/profile", IsLoggedIn , getProfile);
router.get("/logout", IsLoggedIn , logoutUser);

router.post("/forget"  ,forgotPassword);
router.post("/reset/:token" , resetPassword);

export default router;
