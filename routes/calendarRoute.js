import express from 'express';
import { getEvents,addEvents,updateEventFromFile } from "../controllers/calendarController.js";
import { LoginRequired } from '../middlewares/login_required.js';
import multer from 'multer';
import { ProfilePictureStorage,CSVFileStorage } from '../middlewares/image_handler.js';

const calendarRoute = express.Router();
const csv_upload = multer({storage:CSVFileStorage});
calendarRoute.get("/api/events",LoginRequired,getEvents);
calendarRoute.post("/api/setEvent",LoginRequired,addEvents);
calendarRoute.post("/api/createFromCSV",csv_upload.single("csv"),updateEventFromFile);

export default calendarRoute;