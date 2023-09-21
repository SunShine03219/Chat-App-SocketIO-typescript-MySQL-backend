import { Request, Response } from "express";
import roomDbModule from "../modules/mysql/room.module";
import Room from "../models/room.model";

/**
 *
 * @param {*} req
 * @param {*} res
 */
const createRoom = async (req: Request, res: Response) => {
    try {
        const roomData: Room = req.body;

        // create room
        const rooms = await roomDbModule.createRoom(roomData);

        res.status(200).send({
            status: "success",
            message: "Created a room successfully!",
            rooms,
        });
    } catch (err) {
        res.status(500).send({
            status: "error",
            message: "500 Server error",
            error: (err as Error)?.message,
        });
    }
};

const getRooms = async (req: Request, res: Response) => {
    try {
        // get rooms
        const rooms = await roomDbModule.getRooms();

        res.status(200).send({
            status: "success",
            message: "Got room list successfully!",
            rooms,
        });
    } catch (err) {
        res.status(500).send({
            status: "error",
            message: "500 Server error",
            error: (err as Error)?.message,
        });
    }
};

const removeRoom = async (req: Request, res: Response) => {
    try {
        const roomData: Room = req.body;

        // create room
        const rooms = await roomDbModule.removeRoom(roomData);

        res.status(200).send({
            status: "success",
            message: "Deleted a room successfully!",
            rooms,
        });
    } catch (err) {
        res.status(500).send({
            status: "error",
            message: "500 Server error",
            error: (err as Error)?.message,
        });
    }
};

const updateRoom = async (req: Request, res: Response) => {
    try {
        const roomData: Room = req.body;

        // create room
        const rooms = await roomDbModule.updateRoom(roomData);

        res.status(200).send({
            status: "success",
            message: "Updated a room successfully!",
            rooms,
        });
    } catch (err) {
        res.status(500).send({
            status: "error",
            message: "500 Server error",
            error: (err as Error)?.message,
        });
    }
};

const roomController = {
    createRoom,
    updateRoom,
    getRooms,
    removeRoom,
};

export default roomController;
