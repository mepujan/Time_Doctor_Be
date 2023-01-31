import express from "express";
import { createUser } from "../controllers/user_controller.js";

const user_router = express.Router();

user_router.post("/createUser",createUser);

export default user_router;