import { Result } from "src/app/result";
import ArticleModule from "../articles.module";
import ArticleLabelModule from "./article.label.module";
import ArticleAndLabelModule from "../articleAndLabel/article.and.label.module";
import { instanceToPlain, plainToInstance } from "class-transformer";
import errorCode from "src/app/error-code";
import errorMessage from "src/app/error-message";
import { UpdateOptions } from "sequelize/types/model";
import { resultDataValues } from "src/utils/formatResult";
class ArticleLabelService {
  async create(articleLabelName: string): Promise<Result> {
    const result = await ArticleLabelModule.create({
      articleLabelName,
    });
    return Result.success(resultDataValues(result), "新增成功");
  }
  async delete(id: number) {
    const result = await ArticleLabelModule.destroy({ where: { id } });
    return Result.success(result, "删除成功");
  }

  async update(id: number, articleLabelName: string) {
    const result = await ArticleLabelModule.update(
      {
        articleLabelName,
      },
      {
        where: { id },
        returning: true,
      }
    );
    return Result.success(result, "修改成功");
  }
  async find() {
    const result = await ArticleLabelModule.findAll({
      include: [{ model: ArticleAndLabelModule }],
    });
    // console.log(result, "result");
    // resultDataValues(result)
    return Result.success(result, "查询成功");
  }
}

export default new ArticleLabelService();
