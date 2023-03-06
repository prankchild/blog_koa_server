import { Result } from "src/app/result";
import articleLabelService from "./article.label.service";
import errorCode from "src/app/error-code";
import errorMessage from "src/app/error-message";
import { MissingParameter } from "src/utils/error/result";
// const userService = new UserService();

class ArticleLabelController {
  async createArticleLabel(ctx, next): Promise<Result> {
    const { articleLabelName } = ctx.request.body;
    if (!articleLabelName) {
      return MissingParameter(ctx, "标签名称");
    }
    const result = await articleLabelService.create(articleLabelName);
    return (ctx.body = result);
  }
  async deleteArticleLabel(ctx, next): Promise<Result> {
    const { id } = ctx.request.body;
    if (!id) {
      return MissingParameter(ctx, "标签ID");
    }
    const result = await articleLabelService.delete(id);
    return (ctx.body = result);
  }
  async updateArticleLabel(ctx, next) {
    const { id, articleLabelName } = ctx.request.body;
    if (!id || !articleLabelName) {
      return MissingParameter(ctx, "标签ID或标签名称");
    }
    const result = await articleLabelService.update(id, articleLabelName);
    return (ctx.body = result);
  }
  async findArticleLabel(ctx, next) {
    const result = await articleLabelService.find();
    return (ctx.body = result);
  }
}

export default ArticleLabelController;
