import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// @desc AUTH user
// @route POST /api/users/login
// @access public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    //set JWT as HTTP_only_cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 7 * 24 * 3600 * 1000, // 7 days in miliseconds
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc resgister user
// @route POST /api/users/
// @access public
export const registerUser = asyncHandler(async (req, res) => {
  res.send("register user");
});

// @desc logout user
// @route POST /api/users/logout
// @access private
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out success" });
});

// @desc resgister user
// @route GET /api/users/
// @access public
export const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get profile user");
});

// @desc update user
// @route PUT /api/users/
// @access private
export const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update profile user");
});

// @desc get all user
// @route GET /api/users/
// @access privat/admin
export const getUsers = asyncHandler(async (req, res) => {
  res.send("get all users");
});

// @desc delete user
// @route POST /api/users/:id
// @access private/admin
export const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

// @desc get user by id
// @route GET /api/users/:id
// @access private/admin
export const getUserByID = asyncHandler(async (req, res) => {
  res.send("get user by id");
});

// @desc resgister user
// @route PUT /api/users/:id
// @access private/admin
export const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});
