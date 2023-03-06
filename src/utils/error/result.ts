import { Result } from "src/app/result";
import errorCode from "src/app/error-code";
import errorMessage from "src/app/error-message";
export const MissingParameter = (ctx: any, value?: string) => {
  console.log(ctx.app.emit("error"), "ctx.app.emit");

  return ctx.app.emit(
    "error",
    Result.fail(
      errorCode.Global.missingParameter,
      errorMessage.Global.missingParameter(value)
    ),
    ctx
  );
};
