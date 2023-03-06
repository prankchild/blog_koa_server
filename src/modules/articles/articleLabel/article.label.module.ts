const { DataTypes } = require("sequelize");
import sequelize from "src/utils/sequelize/index";
import { DEFAULT_AVATAR } from "../../../config";
// 创建模型
// defaultValue 默认值 allowNull是否为空 unique是否唯一
const ArticleLabelModule = sequelize.define("blog_article_label", {
  articleLabelName: {
    field: "article_label_name",
    type: DataTypes.STRING,
    allowNull: false,
    comment: "文章标签名称",
  },
});
//  如果表不存在，则创建该表，如果已存在，则不执行操作
ArticleLabelModule.sync();

export default ArticleLabelModule;
