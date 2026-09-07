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

const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (_req, res) => {
  res.json({ message: "Foodweb API is running" });
});

app.use("/category", categoryRouter);
app.use("/food", foodRouter);
app.use("/user", userRouter);
app.use("/order", orderRouter);

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing");
  }
  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;
  console.log("Connected");
}

app.use(async (_req, _res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

if (!process.env.VERCEL) {
  connectDB()
    .then(() => {
      app.listen(port, () => {
        console.log(`Server is running on port http://localhost:${port}`);
      });
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
      process.exit(1);
    });
}

export default app;
