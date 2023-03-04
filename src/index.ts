import app from "./app";
import { PORT } from "./config";
import { Logger } from "./utils/logs/log4js.util";
import Chalk from "chalk";

app.listen(PORT);

Logger.log(
  "\n",
  Chalk.green(`Koa-Server 服务启动成功 `),
  `http://localhost:${PORT}/`,
  "\n"
);
