import { Result } from "src/app/result";
import userService from "./user.service";

// const userService = new UserService();

class UserController {
  async register(ctx, next) {
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
