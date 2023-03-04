import { Result } from "src/app/result";
import UserModule from "./user.module";
import { instanceToPlain, plainToInstance } from "class-transformer";
import errorCode from "src/app/error-code";
import errorMessage from "src/app/error-message";
import { genSalt, hash, compare, genSaltSync, hashSync } from "bcryptjs";
class UserService {
  async createUser(
    userEmail: string,
    userPassword: string,
    userName: string,
    userRoleCode: number = 0,
    userStatus: number = 1,
    userIntroduce?: string
  ): Promise<Result> {
    // 判断邮箱是否注册
    if (await UserModule.findOne({ where: { userEmail: userEmail } })) {
      return Result.fail(
        errorCode.User.Register.existEmail,
        errorMessage.User.Register.existEmail
      );
    }
    // 创建盐
    const userSalt = await genSalt();
    userPassword = await hash(userPassword, userSalt);
    const create = await UserModule.create({
      userEmail,
      userPassword,
      userSalt,
      userName,
      userRoleCode,
      userStatus,
      userIntroduce,
    });
    if (create) {
      return Result.success(instanceToPlain(create)["dataValues"]);
    } else {
      return Result.fail();
    }
  }
  async findUser(): Promise<Result> {
    const whereOpt = {};
    const attributes = { exclude: ["userPassword", "userSalt"] };
    const find = await UserModule.findAll({ where: whereOpt, attributes });
    return Result.success(find);
  }
}

export default new UserService();
