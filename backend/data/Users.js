import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("admin123", 10),
    isAdmin: true,
  },
  {
    name: "Supun",
    email: "supun@gmail.com",
    password: bcrypt.hashSync("sudeepa123", 10),
    isAdmin: false,
  },
];
export default users;
