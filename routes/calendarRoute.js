import express from 'express';
import { getEvents, addEvents, updateEventFromFile, deleteSchedule } from "../controllers/calendarController.js";
import { LoginRequired } from '../middlewares/login_required.js';
import multer from 'multer';
import { CSVFileStorage } from '../middlewares/image_handler.js';

const calendarRoute = express.Router();
const csv_upload = multer({ storage: CSVFileStorage });
calendarRoute.get("/api/events", LoginRequired, getEvents);
calendarRoute.post("/api/setEvent", LoginRequired, addEvents);
calendarRoute.post("/api/createFromCSV", csv_upload.single("csv"), updateEventFromFile);
calendarRoute.post("/api/cancelSchedule", LoginRequired, deleteSchedule);
export default calendarRoute;