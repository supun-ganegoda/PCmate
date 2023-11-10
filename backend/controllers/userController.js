import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

// @desc AUTH user
// @route POST /api/users/login
// @access public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
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
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User is already registered");
  }

  const user = await User.create({
    name,
    email,
    password, //password is automatically hashed before saving in pre method
  });
  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Fail to register the user");
  }
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

// @desc get user profile
// @route GET /api/users/profile
// @access private/admin
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc update user
// @route PUT /api/users/
// @access private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc get all user
// @route GET /api/users/
// @access privat/admin
export const getUsers = asyncHandler(async (req, res) => {
  const pageSize = 2;
  const page = Number(req.query.pageNumber) || 1;
  const count = await User.countDocuments();

  const users = await User.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.status(200).json({ users, page, pages: Math.ceil(count / pageSize) });
});

// @desc delete user
// @route POST /api/users/:id
// @access private/admin
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin user");
    } else {
      await User.deleteOne({ _id: user._id });
      res.status(200).json({ message: "User delete successful" });
    }
  } else {
    res.status(404);
    throw new Error("No such user");
  }
});

// @desc get user by id
// @route GET /api/users/:id
// @access private/admin
export const getUserByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) res.status(200).json(user);
  else {
    res.status(404);
    throw new Error("no such user");
  }
});

// @desc resgister user
// @route PUT /api/users/:id
// @access private/admin
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin || user.isAdmin);

    const updateUser = await user.save();
    res.status(200).json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("no such user");
  }
});
