import express from 'express';
import { createRole, getRole } from '../controllers/role_controller.js';
import { LoginRequired } from '../middlewares/login_required.js';

const router = express.Router();

// creating new role router
router.post("/api/createRole",LoginRequired,createRole);
router.get("/api/roles",LoginRequired,getRole);
export default router;