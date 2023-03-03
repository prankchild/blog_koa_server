import * as Router from "koa-router";
import UserController from "./user.controller";

const userController = new UserController();

const router = new Router({ prefix: "/users" });

router.post("/register", userController.register);

export default router;
