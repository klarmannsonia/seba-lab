import express from "express";
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/protectMiddleware.js";
import cleanCache from "../middleware/cleanCache.js";

const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, cleanCache, updateUserProfile);

export default router;
