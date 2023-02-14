import express from "express";
import { createUser,updatePassword,updateUser } from "../controllers/user_controller.js";
import { ProfilePictureStorage } from "../middlewares/image_handler.js";
import multer from "multer";
import { LoginRequired } from "../middlewares/login_required.js";

const user_router = express.Router();
const profile_pic_upload = multer({storage:ProfilePictureStorage});

//user create route
user_router.post("/api/createUser",profile_pic_upload.single("profile_image"),createUser);

//user update route
user_router.put("/api/updateUser",LoginRequired,updateUser);

//update password
user_router.put("/api/updatePassword",LoginRequired,updatePassword)

export default user_router;