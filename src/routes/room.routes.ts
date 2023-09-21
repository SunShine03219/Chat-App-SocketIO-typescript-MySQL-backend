import express from "express";
import validateRequest from "../middleware/validateRequest";
import roomController from "../controllers/room.controller";

const router = express.Router();

router.post(`/room/create`, [
    validateRequest.validateRequestBody(["room", "owner"]),
    roomController.createRoom,
]);

router.delete(`/room/remove`, [
    validateRequest.validateRequestBody(["room", "owner"]),
    roomController.removeRoom,
]);

router.post(
    `/room/update`,
    [validateRequest.validateRequestBody(["room", "owner", "attends"])],
    roomController.updateRoom,
);

router.get(`/room/gets`, roomController.getRooms);

export default router;
