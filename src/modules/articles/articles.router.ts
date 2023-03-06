import * as Router from "koa-router";
import ArticleLabelController from "./articleLabel/article.label.controller";
import ArticleController from "./articles.controller";

const articleController = new ArticleController();
const articleLabelController = new ArticleLabelController();
const router = new Router({ prefix: "/article" });

// 文章的增删改查
router.post("/createArticle", articleController.create);
router.post("/deleteArticle", articleController.delete);
router.post("/updateArticle", articleController.update);
router.post("/findArticle", articleController.find);
// 标签的增删改查
router.post("/createArticleLabel", articleLabelController.createArticleLabel);
router.post("/deleteArticleLabel", articleLabelController.deleteArticleLabel);
router.post("/updateArticleLabel", articleLabelController.updateArticleLabel);
router.get("/findArticleLabel", articleLabelController.findArticleLabel);

export default router;
