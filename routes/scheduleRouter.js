import express from 'express';
import { getScheduledData,saveSchedule } from '../controllers/scheduleController.js';
import { LoginRequired } from '../middlewares/login_required.js';

const scheduleRouter = express.Router();

scheduleRouter.get("/api/getScheduleData",LoginRequired,getScheduledData);
scheduleRouter.post("/api/addSchedule",LoginRequired,saveSchedule)

export default scheduleRouter;