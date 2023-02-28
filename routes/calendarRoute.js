import express from 'express';
import { getEvents,addEvents } from "../controllers/calendarController.js";


const calendarRoute = express.Router();

calendarRoute.get("/api/events",getEvents);
calendarRoute.get("/api/setEvent",addEvents);

export default calendarRoute;