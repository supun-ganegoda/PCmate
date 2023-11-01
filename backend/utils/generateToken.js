import jwt from "jsonwebtoken";

export const generateToken = (res, userID) => {
  const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  //set JWT as HTTP_only_cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 7 * 24 * 3600 * 1000, // 7 days in miliseconds
  });
};
