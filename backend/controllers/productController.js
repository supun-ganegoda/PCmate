import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc get all products
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc get single product
export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) return res.json(product);

  res.status(404);
  throw new Error("Product not found");
});
