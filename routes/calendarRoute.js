import express from 'express';
import { getEvents,addEvents } from "../controllers/calendarController.js";
import { LoginRequired } from '../middlewares/login_required.js';
import multer from 'multer';
import { ProfilePictureStorage } from '../middlewares/image_handler.js';

const calendarRoute = express.Router();
const csv_upload = multer({storage:ProfilePictureStorage});
calendarRoute.get("/api/events",LoginRequired,getEvents);
calendarRoute.post("/api/setEvent",LoginRequired,addEvents);
// calendarRoute.post("/api/createFromCSV",csv_upload.single("test"),updateEventFromFile);

export default calendarRoute;