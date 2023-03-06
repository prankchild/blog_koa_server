const { DataTypes } = require("sequelize");
import sequelize from "src/utils/sequelize/index";
import { DEFAULT_AVATAR } from "../../config";
// 创建模型
// defaultValue 默认值 allowNull是否为空 unique是否唯一
const ArticleModule = sequelize.define("blog_article", {
  articleTitle: {
    field: "article_title",
    type: DataTypes.STRING,
    allowNull: false,
    comment: "文章标题",
  },
  articleContent: {
    field: "article_content",
    type: DataTypes.TEXT,
    allowNull: false,
    comment: "文章内容",
  },
  articleAbstract: {
    field: "article_abstract",
    type: DataTypes.STRING(1000),
    // allowNull: false,
    comment: "文章摘要",
  },
  articleCover: {
    field: "article_cover",
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: DEFAULT_AVATAR,
    comment: "文章封面",
  },
  articleStatus: {
    field: "article_status",
    type: DataTypes.INTEGER,
    // allowNull: false,
    defaultValue: 1,
    comment: "文章状态",
  },
  articleType: {
    field: "article_type",
    type: DataTypes.INTEGER,
    // allowNull: false,
    // defaultValue: 1,
    comment: "文章类型",
  },
  articleVisibility: {
    field: "article_visibility",
    type: DataTypes.INTEGER,
    // allowNull: false,
    defaultValue: 1,
    comment: "文章可见性",
  },
  articleDraft: {
    field: "article_draft",
    type: DataTypes.INTEGER,
    // allowNull: false,
    defaultValue: 0,
    comment: "是否草稿",
  },
  articleTop: {
    field: "article_top",
    type: DataTypes.INTEGER,
    // allowNull: false,
    defaultValue: 0,
    comment: "是否置顶",
  },
});
//  如果表不存在，则创建该表，如果已存在，则不执行操作
ArticleModule.sync();

export default ArticleModule;
