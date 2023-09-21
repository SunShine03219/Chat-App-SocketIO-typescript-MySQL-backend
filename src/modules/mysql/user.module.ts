import { FindOptions } from "sequelize";
import User from "../../models/user.model";

// Create a User
const createUser = async (userData: Omit<User, "id">) => {
    try {
        const user = await User.create(userData);
        return user;
    } catch (error) {
        console.error(error);
    }
};

// Get a User
const getUser = async (filter: FindOptions) => {
    try {
        const user = await User.findOne(filter);
        return user;
    } catch (error) {
        console.error(error);
    }
};

const userDbModule = {
    createUser,
    getUser,
};

export default userDbModule;
