// import homeController from './controller/home-controller';
import UserRouter from "./modules/basicInformation/user/user.router";
const Router = require("koa-router");
const router = new Router();

router.use(UserRouter.routes());

export default router;
