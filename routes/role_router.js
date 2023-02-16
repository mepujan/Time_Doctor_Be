import express from 'express';
import { createRole, getRole } from '../controllers/role_controller.js';

const router = express.Router();

// creating new role router
router.post("/api/createRole",createRole);
router.get("/api/roles",getRole);
export default router;