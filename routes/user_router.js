import express from "express";
import { createUser,updateUser } from "../controllers/user_controller.js";

const user_router = express.Router();

//user create route
user_router.post("/api/createUser",createUser);

//user update route
user_router.put("/api/updateUser/:id",updateUser);

export default user_router;