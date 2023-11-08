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

// @create image
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample product",
    price: 0,
    user: req.user._id,
    image: "/images/cpu.jpg",
    brand: "sample brand",
    category: "sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createProduct = await product.save();
  res.status(201).json(createProduct);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updateProduct = await product.save();
    res.status(200).json(updateProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    const x = await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product delete successful" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
