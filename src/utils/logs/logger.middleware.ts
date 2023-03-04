import { Logger } from "./log4js.util";

const logger = async (ctx, next) => {
  const startTime: any = new Date();
  await next();
  const endTime: any = new Date();
  const statusCode = ctx.response.status;
  const logFormat = `
---------------------------------------------------------------------------------------------
    RequestOriginal: ${ctx.originalUrl}
    Method: ${ctx.request.method}
    IP: ${ctx.request.ip}
    StatusCode: ${statusCode}
    Params: ${JSON.stringify(ctx.request.params)}
    Query: ${JSON.stringify(ctx.request.query)}
    Body: ${JSON.stringify(ctx.request.body)}
    Time: ${endTime - startTime}
---------------------------------------------------------------------------------------------
      `;
  if (statusCode >= 500) {
    Logger.error(logFormat);
  } else if (statusCode >= 400) {
    Logger.warn(logFormat);
  } else {
    Logger.access(logFormat);
    Logger.log(logFormat);
  }
};
export default logger;

//   ResultCode:${ctx.response.body.code}
//   ResultMessage: ${ctx.response.body.message}
