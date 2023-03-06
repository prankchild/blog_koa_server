// import homeController from './controller/home-controller';
import UserRouter from "./modules/basicInformation/user/user.router";
import ArticleRouter from "./modules/articles/articles.router";
const Router = require("koa-router");
const router = new Router();

router.use(UserRouter.routes());
router.use(ArticleRouter.routes());
export default router;
