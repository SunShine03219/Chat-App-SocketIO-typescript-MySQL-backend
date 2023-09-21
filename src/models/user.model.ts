import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelize";

class User extends Model {
    public id!: number;
    public username!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "user",
    },
);

export default User;
