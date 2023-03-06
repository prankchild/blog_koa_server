import { Result } from "src/app/result";
import userService from "./user.service";
import errorCode from "src/app/error-code";
import errorMessage from "src/app/error-message";
// const userService = new UserService();

class UserController {
  async register(ctx, next): Promise<Result> {
    // console.log(ctx.request.body);
    // 1.获取数据
    const {
      userEmail,
      userPassword,
      userName,
      userRoleCode,
      userStatus,
      userIntroduce,
    } = ctx.request.body;
    // 必须携带的参数
    if (
      !userEmail ||
      !userPassword ||
      !userName ||
      (!userRoleCode && Number(userRoleCode) !== 0)
    ) {
      return Result.fail(
        errorCode.User.Register.missingParameter,
        errorMessage.User.Register.missingParameter
      );
    }
    // 2.操作数据库
    const result = await userService.createUser(
      userEmail,
      userPassword,
      userName,
      userRoleCode,
      userStatus,
      userIntroduce
    );
    // 3.返回结果
    return (ctx.body = result);
  }
  async findUser(ctx, next) {
    const result = await userService.findUser();
    return (ctx.body = result);
  }
}

export default UserController;
