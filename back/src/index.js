import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { categoryRouter } from "./routes/category.js";
import { foodRouter } from "./routes/food.js";
import { userRouter } from "./routes/user.js";
import { orderRouter } from "./routes/order.js";
import "dotenv/config";
import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const port = 8000;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/category", categoryRouter);
app.use("/food", foodRouter);
app.use("/user", userRouter);
app.use("/order", orderRouter);

mongoose.connect(process.env.MONGODB_URI).then(() => console.log("Connected"));
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
