import Room from "../../models/room.model";

// Create a Room
const createRoom = async (roomData: Omit<Room, "id">) => {
    try {
        await Room.create(roomData);
        return await getRooms();
    } catch (error) {
        console.error(error);
    }
};

// Update a room
const updateRoom = async (roomData: Omit<Room, "id">) => {
    try {
        await Room.update(
            {
                attends: roomData.attends,
            },
            {
                where: { room: roomData.room, owner: roomData.owner },
            },
        );
        return await getRooms();
    } catch (error) {
        console.error(error);
    }
};

// Remove a room
const removeRoom = async (roomData: Omit<Room, "id">) => {
    try {
        await Room.destroy({
            where: { room: roomData.room, owner: roomData.owner },
        });
        return await getRooms();
    } catch (error) {
        console.error(error);
    }
};

// Get a User
const getRooms = async () => {
    try {
        const rooms = await Room.findAll();
        return rooms;
    } catch (error) {
        console.error(error);
    }
};

const roomDbModule = {
    createRoom,
    updateRoom,
    removeRoom,
    getRooms,
};

export default roomDbModule;
