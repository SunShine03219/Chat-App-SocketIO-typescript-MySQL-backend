import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelize";

class Room extends Model {
    public id!: number;
    public room!: string;
    public owner!: string;
    public attends!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Room.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        room: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        owner: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        attends: {
            type: DataTypes.STRING,
            allowNull: true,
            get() {
                return this.getDataValue("attends")?.split(";");
            },
            set(value: string[]) {
                this.setDataValue("attends", value?.join(";"));
            },
        },
    },
    {
        sequelize,
        tableName: "room", // You can change this to match your table name
    },
);

export default Room;
