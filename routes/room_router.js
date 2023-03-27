import express from 'express';
import { saveRoomToDatabase, fetchAvailableRooms } from '../controllers/room_controller';

const roomRouter = express.Router();

roomRouter.route("/room").get(saveRoomToDatabase).post(fetchAvailableRooms);

export default roomRouter;