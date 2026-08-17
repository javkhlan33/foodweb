import express from "express";
import { get } from "mongoose";
import { getUser } from "../resolvers/user/get-user.js";
import { createUser } from "../resolvers/user/create-user.js";
import { deletedUser } from "../resolvers/user/delete-user.js";
import { updateUser } from "../resolvers/user/update-user.js";

export const userRouter = express.Router();

userRouter.get("/", getUser);
userRouter.post("/", createUser);
userRouter.delete("/", deletedUser);
userRouter.put("/", updateUser);
