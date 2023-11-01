import express from "express";
import * as controller from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(controller.registerUser)
  .get(protect, admin, controller.getUsers);

router.post("/logout", controller.logoutUser);

router.post("/auth", controller.authUser);

router
  .route("/profile")
  .get(protect, controller.getUserProfile)
  .put(protect, controller.updateUserProfile);

router
  .route("/:id")
  .get(protect, admin, controller.getUserByID)
  .delete(protect, admin, controller.deleteUser)
  .put(protect, admin, controller.updateUser);

export default router;
