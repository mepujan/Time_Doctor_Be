import express from 'express';
import { getScheduledData } from '../controllers/scheduleController.js';
import { LoginRequired } from '../middlewares/login_required.js';

const scheduleRouter = express.Router();

scheduleRouter.get("/api/getScheduleData",LoginRequired,getScheduledData);

export default scheduleRouter;