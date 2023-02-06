import express from 'express';
import { LoginController } from '../controllers/auth_controller.js';

const auth_router = express.Router();

auth_router.post("/login",LoginController)

export default auth_router;