const { DataTypes } = require("sequelize");
const seq = require("../db/seq");
const { DEFAULT_AVATAR } = require("../config/config.default");
// 创建模型
// defaultValue 默认值 allowNull是否为空 unique是否唯一
const User = seq.define("blog_user", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: "邮箱(唯一)",
  },
  name: { type: DataTypes.STRING, comment: "用户名称", allowNull: false },
  phone: { type: DataTypes.INTEGER, comment: "用户手机号", unique: true },
  wx_key: { type: DataTypes.INTEGER, comment: "用户微信", unique: true },
  wx_app_key: { type: DataTypes.INTEGER, comment: "用户小程序", unique: true },
  wb_app_key: { type: DataTypes.INTEGER, comment: "用户微博", unique: true },
  qq_app_key: { type: DataTypes.INTEGER, comment: "用户QQ", unique: true },
  password: { type: DataTypes.CHAR(64), allowNull: false, comment: "用户密码" },
  introduce: { type: DataTypes.STRING, comment: "用户介绍" },
  avatar: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "用户头像",
    defaultValue: DEFAULT_AVATAR,
    comment: "用户头像",
  },
  role_code: { type: DataTypes.STRING, allowNull: false, comment: "用户角色" },
  status: { type: DataTypes.INTEGER, allowNull: false, comment: "用户状态" },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: "是否管理员",
  },
});
//  如果表不存在，则创建该表，如果已存在，则不执行操作
// User.sync()

export default User;
