import express from 'express';
import { sendNotificationAsRole } from '../controllers/notificationController.js';
import { LoginRequired } from '../middlewares/login_required.js';

const notificationRouter = express.Router();

notificationRouter.post("/api/sendNotification",LoginRequired,sendNotificationAsRole);

export default notificationRouter;