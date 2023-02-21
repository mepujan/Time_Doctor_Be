import express from 'express';
import { sendNotificationAsRole } from '../controllers/notificationController.js';

const notificationRouter = express.Router();

notificationRouter.post("/sendNotification",sendNotificationAsRole);

export default notificationRouter;