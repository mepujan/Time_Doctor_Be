import express from 'express';
import { rescheduleEvent } from '../controllers/calendarController.js';
import { getScheduledData,saveSchedule,getAllSurgeryTypes,createNewSurgeryType } from '../controllers/scheduleController.js';
import { LoginRequired } from '../middlewares/login_required.js';

const scheduleRouter = express.Router();

scheduleRouter.get("/api/getScheduleData",LoginRequired,getScheduledData);
scheduleRouter.post("/api/addSchedule",LoginRequired,saveSchedule);
scheduleRouter.patch("/api/reschedule",LoginRequired,rescheduleEvent);
scheduleRouter.get("/api/surgeryType",LoginRequired,getAllSurgeryTypes)
scheduleRouter.post("/api/surgeryType",createNewSurgeryType);

export default scheduleRouter;