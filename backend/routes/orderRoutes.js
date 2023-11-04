import express from "express";
import * as controller from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protect, controller.addOrderItems)
  .get(protect, admin, controller.getOrders);

router.route("/my-orders").get(protect, controller.getMyOrders);
router.route("/:id").get(protect, admin, controller.getOrderById);
router.route("/:id/pay").put(protect, controller.updateOrderToPaid);
router
  .route("/:id/delivered")
  .put(protect, admin, controller.updateToDelivered);

export default router;
