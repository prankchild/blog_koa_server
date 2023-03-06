const { DataTypes } = require("sequelize");
import sequelize from "src/utils/sequelize/index";
import { DEFAULT_AVATAR } from "../../../config";
// 创建模型
// defaultValue 默认值 allowNull是否为空 unique是否唯一
const ArticleAndLabelModule = sequelize.define("blog_article_and_label", {
  articleLabelId: {
    field: "article_label_id",
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "文章标签ID",
  },
  articleId: {
    field: "article_id",
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "文章ID",
  },
});
//  如果表不存在，则创建该表，如果已存在，则不执行操作
ArticleAndLabelModule.sync();

export default ArticleAndLabelModule;
