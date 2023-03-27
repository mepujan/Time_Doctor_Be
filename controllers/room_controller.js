import Room from '../models/room_model.js';

export const saveRoomToDatabase = async (req, res, next) => {
    try {
        const newRoom = await Room.create(req.body);
        return res.status(201).json(newRoom);
    } catch (e) {
        next(e);
    }
}


export const fetchAvailableRooms = async (req, res, next) => {
    try {
        const availableRooms = await Room.findAll({ where: { is_available: true } });
        return res.status(200).json(availableRooms ? availableRooms : []);

    } catch (e) {
        next(e);
    }
}