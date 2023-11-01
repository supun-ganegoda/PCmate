import express from "express";
import * as controller from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(controller.registerUser).get(controller.getUsers);

router.post("/logout", controller.logoutUser);

router.post("/login", controller.authUser);

router
  .route("/profile")
  .get(controller.getUserProfile)
  .put(controller.updateUserProfile);

router
  .route("/:id")
  .get(controller.getUserByID)
  .delete(controller.deleteUser)
  .put(controller.updateUser);

export default router;
