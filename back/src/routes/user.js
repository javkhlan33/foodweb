import express from "express";
import { loginUser } from "../resolvers/user/login-user.js";
import { getUser } from "../resolvers/user/get-user.js";
import { createUser } from "../resolvers/user/create-user.js";
import { deletedUser } from "../resolvers/user/delete-user.js";
import { updateUser } from "../resolvers/user/update-user.js";


export const userRouter = express.Router();

userRouter.get("/", getUser);
userRouter.post("/", createUser);

userRouter.delete("/", deletedUser);
userRouter.put("/", updateUser);
userRouter.post("/login", loginUser);