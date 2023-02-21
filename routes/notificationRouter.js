import express from 'express';
import { sendNotificationAsRole } from '../controllers/notificationController.js';

const notificationRouter = express.Router();

notificationRouter.post("/getUsers/:role",sendNotificationAsRole);

export default notificationRouter;