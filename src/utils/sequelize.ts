import { Sequelize } from "sequelize";

import {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PWD,
  MYSQL_DB,
} from "../config";

const sequelize = new Sequelize(
  MYSQL_DB, // 数据库名称
  MYSQL_USER, // 数据库用户名
  MYSQL_PWD, // 数据库密码
  {
    host: MYSQL_HOST,
    timezone: "+8:00",
    dialectOptions: {
      charset: "utf8mb4",
      dateStrings: true,
      typeCast: true,
    },
    dialect: "mysql",
    logging: true, //日志输
  }
);
sequelize
  .authenticate()
  .then()
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

export default sequelize;
