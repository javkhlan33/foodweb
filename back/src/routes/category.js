import express from "express";
import { get } from "mongoose";
import { getCategory } from "../resolvers/category/get-category.js";
import { CreateCategory } from "../resolvers/category/create-categoty.js";
import { deletedCategory } from "../resolvers/category/deleted-category.js";
import { updateCategory } from "../resolvers/category/update-category.js";

export const categoryRouter = express.Router();

categoryRouter.get("/", getCategory);
categoryRouter.post("/", CreateCategory);
categoryRouter.delete("/", deletedCategory);
categoryRouter.put("/", updateCategory);
