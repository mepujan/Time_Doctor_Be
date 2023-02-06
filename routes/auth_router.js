import express from 'express';
import { LoginController } from '../controllers/auth_controller.js';

const auth_router = express.Router();

//login router
auth_router.post("/api/login",LoginController)

export default auth_router;