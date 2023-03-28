import express from 'express';
import { saveRoomToDatabase, fetchAvailableRooms } from '../controllers/room_controller.js';
import { LoginRequired } from '../middlewares/login_required.js';
const roomRouter = express.Router();

roomRouter.route("/api/room").get(LoginRequired, fetchAvailableRooms)
    .post(LoginRequired, saveRoomToDatabase);

export default roomRouter;