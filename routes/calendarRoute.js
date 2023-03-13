import express from 'express';
import { getEvents,addEvents } from "../controllers/calendarController.js";
import { LoginRequired } from '../middlewares/login_required.js';

const calendarRoute = express.Router();

calendarRoute.get("/api/events",LoginRequired,getEvents);
calendarRoute.post("/api/setEvent",LoginRequired,addEvents);

export default calendarRoute;