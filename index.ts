import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import { verifyToken } from "./src/middleware/verifyToken";
import addressRouter from "./src/routers/address";
import cartRouter from "./src/routers/cart";
import categoryRouter from "./src/routers/category";
import customerRouter from "./src/routers/customer";
import orderRouter from "./src/routers/order";
import productRouter from "./src/routers/product";
import promotionRouter from "./src/routers/promotion";
import storageRouter from "./src/routers/storage";
import subProductRouter from "./src/routers/subProduct";
import supplierRouter from "./src/routers/supplier";
import userRouter from "./src/routers/user";
import wishlistRouter from "./src/routers/wishlist";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;

const dbURL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@thanh236.zg7id.mongodb.net/?retryWrites=true&w=majority&appName=Thanh236`;

app.use(express.json());
app.use(cors({}));

app.use("/auth", userRouter);
app.use("/customer", customerRouter);
app.use("/promotion", promotionRouter);
app.use("/address", addressRouter);
app.use("/order", orderRouter);
app.use("/wishlist", wishlistRouter);

app.use(verifyToken);
app.use("/storage", storageRouter);
app.use("/supplier", supplierRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/sub-product", subProductRouter);
app.use("/cart", cartRouter);

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("Connect to DB successfully");
  } catch (error) {
    console.log(`Cannot connect to DB ${error}`);
  }
};

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is starting at https://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
