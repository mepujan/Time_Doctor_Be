import express from 'express';
import { createRole } from '../controllers/role_controller.js';

const router = express.Router();

router.post("/createRole",createRole);
export default router;