import express from "express";
import { get } from "mongoose";
import { getOrders } from "../resolvers/order/get-order.js";
import { createOrder } from "../resolvers/order/create-order.js";
import { deletedOrder } from "../resolvers/order/delete-order.js";
import { updateOrder } from "../resolvers/order/update-order.js";

export const orderRouter = express.Router();

orderRouter.get("/", getOrders);
orderRouter.post("/", createOrder);
orderRouter.delete("/", deletedOrder);
orderRouter.put("/", updateOrder);
