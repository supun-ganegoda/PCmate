import express from "express";
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAllProducts).post(protect, admin, createProduct);
router.route("/:id").get(getProduct).put(protect, admin, updateProduct);

export default router;
