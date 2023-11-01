import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const port = process.env.PORT;

connectDB();

const app = express();
//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is up");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);
app.use(notFound);

app.listen(port, () => {
  console.log("Server is running on port:", port);
});
