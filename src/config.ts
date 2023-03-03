import * as dotenv from "dotenv";

dotenv.config();

export const {
  PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PWD,
  MYSQL_DB,
  DEFAULT_AVATAR,
} = process.env;
