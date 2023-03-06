import { Result } from "src/app/result";
import ArticleService from "./articles.service";
import errorCode from "src/app/error-code";
import errorMessage from "src/app/error-message";
import { MissingParameter } from "src/utils/error/result";
import { isExist } from "src/utils/utils";
import ArticleModule from "./articles.module";
// const userService = new UserService();

class ArticleController {
  async create(ctx, next): Promise<Result> {
    const {
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
    } = ctx.request.body;

    if (
      !articleTitle ||
      !articleContent ||
      !articleAbstract ||
      !articleLabel ||
      !articleType ||
      !isExist(articleVisibility) ||
      !isExist(articleDraft) ||
      !isExist(articleStatus)
    ) {
      return MissingParameter(ctx);
    }
    const result = await ArticleService.create({
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
    });
    return (ctx.body = result);
  }
  async delete(ctx, next): Promise<Result> {
    const { id } = ctx.request.body;
    const result = await ArticleService.delete(id);
    return (ctx.body = result);
  }
  async update(ctx: any, next: Function): Promise<Result> {
    const {
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
    } = ctx.request.body;
    const result = await ArticleService.update({
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
    });
    return (ctx.body = result);
  }
  async find(ctx, next): Promise<Result> {
    const {
      pageSize,
      pageNo,
      articleTitle,
      articleType,
      articleDraft,
      articleVisibility,
      articleStatus,
    } = ctx.request.body;
    if (!pageSize || !pageNo) {
      return MissingParameter(ctx);
    }
    const result = await ArticleService.find({
      pageSize,
      pageNo,
      articleTitle,
      articleType,
      articleDraft,
      articleVisibility,
      articleStatus,
    });

    return (ctx.body = result);
  }
}

export default ArticleController;
