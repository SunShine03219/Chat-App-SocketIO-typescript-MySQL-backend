import sequelize from "./sequelize";
import User from "./user.model";
import Room from "./room.model";

const connect = async () => {
    await sequelize
        .authenticate()
        .then(() => {
            console.log("Connection has been established successfully.");

            sequelize
                .sync({ force: false })
                .then(() => {
                    console.log("Models synchronized with the database.");
                })
                .catch((error) => {
                    console.error(
                        "Unable to synchronize models with the database:",
                        error,
                    );
                });
        })
        .catch((error) => {
            console.error("Unable to connect to the database:", error);
        });
};

const Model = {
    User,
    Room,
    connect,
};

export default Model;
