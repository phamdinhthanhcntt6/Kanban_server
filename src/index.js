import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import categoryRouter from "./routers/category";
import orderRouter from "./routers/order";
import productRouter from "./routers/product";
import storageRouter from "./routers/storage";
import supplierRouter from "./routers/supplier";
import userRouter from "./routers/user";
import subProductRouter from "./routers/subProduct";
import customerRouter from "./routers/customer";
import { verifyToken } from "../../client/src/middleware/verifyToken";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;

const dbURL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@thanh236.zg7id.mongodb.net/?retryWrites=true&w=majority&appName=Thanh236`;

app.use(express.json());
app.use(cors({}));

app.use("/auth", userRouter);
app.use("/customer", customerRouter);

app.use(verifyToken);
app.use("/storage", storageRouter);
app.use("/supplier", supplierRouter);
app.use("/order", orderRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/sub-product", subProductRouter);

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
