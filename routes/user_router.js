import express from "express";
import { createUser,updateUser } from "../controllers/user_controller.js";

const user_router = express.Router();

user_router.post("/createUser",createUser);
user_router.put("/updateUser/:id",updateUser);

export default user_router;