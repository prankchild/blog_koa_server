const { DataTypes } = require("sequelize");
import sequelize from "../../../utils/sequelize";
import { DEFAULT_AVATAR } from "../../../config";
// 创建模型
// defaultValue 默认值 allowNull是否为空 unique是否唯一
const UserModule = sequelize.define("blog_user", {
  userEmail: {
    field: "user_email",
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: "邮箱(唯一)",
  },
  userName: {
    field: "user_name",
    type: DataTypes.STRING,
    comment: "用户名称",
    allowNull: false,
  },
  userPhone: {
    field: "user_phone",
    type: DataTypes.INTEGER,
    comment: "用户手机号",
    unique: true,
  },
  userWxKey: {
    field: "user_wx_key",
    type: DataTypes.INTEGER,
    comment: "用户微信",
    unique: true,
  },
  userWxAppKey: {
    field: "user_wx_app_key",
    type: DataTypes.INTEGER,
    comment: "用户小程序",
    unique: true,
  },
  userWbAppKey: {
    field: "user_wb_app_key",
    type: DataTypes.INTEGER,
    comment: "用户微博",
    unique: true,
  },
  userQQAppKey: {
    field: "user_qq_app_key",
    type: DataTypes.INTEGER,
    comment: "用户QQ",
    unique: true,
  },
  userPassword: {
    field: "user_password",
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: "用户密码",
  },
  userSalt: {
    field: "user_salt",
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: "用户加密盐",
  },
  userIntroduce: {
    field: "user_introduce",
    type: DataTypes.STRING,
    comment: "用户介绍",
  },
  userAvatar: {
    key: "user_avatar",
    type: DataTypes.STRING,
    allowNull: false,
    comment: "用户头像",
    defaultValue: DEFAULT_AVATAR,
  },
  userRoleCode: {
    field: "user_role_code",
    type: DataTypes.STRING,
    allowNull: false,
    comment: "用户角色",
  },
  userStatus: {
    field: "user_status",
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "用户状态",
  },
});
//  如果表不存在，则创建该表，如果已存在，则不执行操作
// UserModule.sync();

export default UserModule;
