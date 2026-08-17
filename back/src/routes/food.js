import express from "express";
import { get } from "mongoose";
import { getFood } from "../resolvers/food/get-food.js";
import { createFood } from "../resolvers/food/create-food.js";
import { deletedFood } from "../resolvers/food/delete-food.js";
import { updateFood } from "../resolvers/food/update-food.js";
import { getFoodByCategoryId } from "../resolvers/food/get-food-by-categoryId.js";

export const foodRouter = express.Router();

foodRouter.get("/", getFood);
foodRouter.post("/", createFood);
foodRouter.delete("/", deletedFood);
foodRouter.put("/", updateFood);
foodRouter.get("/:id", getFoodByCategoryId);
