import { Sequelize } from "sequelize";
import mysqlConfig from "../config/db.mysql";

const { database, host, port, user, password } = mysqlConfig;
const sequelize = new Sequelize(database, user, password, {
    host: host,
    port: port,
    dialect: "mysql",
});

export default sequelize;
