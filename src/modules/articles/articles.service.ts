import { Result } from "src/app/result";
import ArticleModule from "./articles.module";
import ArticleLabelModule from "./articleLabel/article.label.module";
import ArticleAndLabelModule from "./articleAndLabel/article.and.label.module";
import sequelize from "src/utils/sequelize";
import { instanceToPlain, plainToInstance } from "class-transformer";
import errorCode from "src/app/error-code";
import errorMessage from "src/app/error-message";
import {
  forShallowCloneAssign,
  isExist,
  shallowCloneAssign,
} from "src/utils/utils";
import { formatAttribute, resultDataValues } from "src/utils/formatResult";
import { isArray } from "lodash";
import { Op } from "sequelize";
class ArticleService {
  /** @internal */
  async create({
    articleTitle,
    articleContent,
    articleAbstract,
    articleCover,
    articleStatus,
    articleType,
    articleVisibility,
    articleDraft,
    articleTop,
    articleLabel,
  }): Promise<Result> {
    // 事务解决
    const t = await sequelize.transaction();
    try {
      const opt = {
        articleTitle,
        articleContent,
        articleAbstract,
        articleCover,
        articleStatus,
        articleType,
        articleVisibility,
        articleDraft,
        articleTop,
      };
      const createJane: any = await ArticleModule.create(opt, {
        transaction: t,
      });

      const labelList = articleLabel.map((label) => {
        return {
          articleId: createJane.id,
          articleLabelId: label,
        };
      });
      const createLabelJane = await ArticleAndLabelModule.bulkCreate(
        labelList,
        {
          transaction: t,
        }
      );
      await t.commit();
      return Result.success({ createJane, createLabelJane });
    } catch (error) {
      await t.rollback();
      return Result.fail(500, "连接数据库错误，请稍后重试");
    }
  }
  async delete(id) {
    if (!isArray(id)) {
      id = [id];
    }
    const t = await sequelize.transaction();
    try {
      const delLabelJane = await ArticleAndLabelModule.destroy({
        where: {
          articleId: {
            [Op.or]: id,
          },
        },
        transaction: t,
      });
      const deleteJane = await ArticleModule.destroy({
        where: {
          id: id,
        },
        transaction: t,
      });
      await t.commit();
      return Result.success({ delLabelJane, deleteJane }, "删除成功");
    } catch (error) {
      await t.rollback();
      return Result.fail(500, "连接数据库错误，请稍后重试");
    }
  }
  async update({
    id,
    articleTitle,
    articleContent,
    articleAbstract,
    articleCover,
    articleStatus,
    articleType,
    articleVisibility,
    articleDraft,
    articleTop,
    articleLabel,
  }) {
    // 事务解决
    const t = await sequelize.transaction();
    try {
      // 先修改再删除标签再新增标签
      const updateOpt = {};
      forShallowCloneAssign(updateOpt, {
        articleTitle: articleTitle,
        articleContent: articleContent,
        articleAbstract: articleAbstract,
        articleCover: articleCover,
        articleStatus: articleStatus,
        articleType: articleType,
        articleVisibility: articleVisibility,
        articleDraft: articleDraft,
        articleTop: articleTop,
      });
      const updateJane = await ArticleModule.update(updateOpt, {
        where: {
          id,
        },
        returning: true,
        transaction: t,
      });
      // 删除文章与标签表的数据
      await ArticleAndLabelModule.destroy({
        where: {
          articleId: id,
        },
        transaction: t,
      });
      // 处理下数据
      const labelList = articleLabel.map((label) => {
        return {
          articleId: id,
          articleLabelId: label,
        };
      });
      // 再新增文章与标签表的数据
      await ArticleAndLabelModule.bulkCreate(labelList, {
        transaction: t,
      });
      await t.commit();
      return Result.success({ updateJane }, "修改成功");
    } catch (error) {
      await t.rollback();
      console.log(error, "error");
      return Result.fail(500, "连接数据库错误，请稍后重试");
    }
  }
  async find({
    pageSize,
    pageNo,
    articleTitle,
    articleType,
    articleDraft,
    articleVisibility,
    articleStatus,
  }) {
    const whereOpt = {};
    articleTitle && Object.assign(whereOpt, { articleTitle });
    articleType && Object.assign(whereOpt, { articleType });
    isExist(articleDraft) && Object.assign(whereOpt, { articleDraft });
    isExist(articleVisibility) &&
      Object.assign(whereOpt, { articleVisibility });
    isExist(articleStatus) && Object.assign(whereOpt, { articleStatus });
    const offset = (pageNo - 1) * pageSize;
    const result = await ArticleModule.findAll({
      where: whereOpt,
      limit: pageSize || 999,
      offset: offset || 0,
      include: [
        {
          model: ArticleAndLabelModule,
          as: "labels",
          include: [{ model: ArticleLabelModule }],
        },
      ],
    });
    const newResult = formatAttribute(
      resultDataValues(result),
      "labels",
      "blog_article_label"
    );
    const total = await ArticleModule.count({
      where: whereOpt,
    });
    return Result.success({
      list: newResult,
      total,
    });
  }
}

export default new ArticleService();
