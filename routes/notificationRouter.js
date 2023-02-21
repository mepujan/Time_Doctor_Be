import express from 'express';
import { sendNotificationAsRole } from '../controllers/notificationController.js';

const notificationRouter = express.Router();

notificationRouter.get("/getUsers/:role",sendNotificationAsRole);

export default notificationRouter;