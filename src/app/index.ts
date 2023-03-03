import * as Koa from "koa";
import * as Router from "koa-router";
import KoaBody from "koa-body";
import * as session from "koa-generic-session";
import * as redisStore from "koa-redis";
import * as cors from "koa2-cors";

import router from "../routes";
import ErrorHeader from "./error-header";
const app = new Koa();
// const router = new Router();

app.use(
  KoaBody({
    multipart: true,
    formidable: {
      // 配置选项option 不推荐使用相对路径
      // uploadDir: path.join(__dirname, "../upload"),
      keepExtensions: true, // 保留文件扩展名
    },
  })
);
// 配置session中间件
app.keys = ["hiboluo"];
app.use(
  session({
    key: "koa",
    prefix: "koa-server",
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 30 * 60 * 1000,
    },
    store: redisStore({
      all: `127.0.0.1:9000`,
    }),
  })
);
// 配置CORS
app.use(
  cors({
    origin: function (ctx) {
      return ctx.get("Origin") || "*";
    },
    // origin: function (ctx) {
    //   //设置允许来自指定域名请求
    //   if (ctx.url === '/') {
    //     return '*' // 允许来自所有域名请求
    //   }
    //   return 'http://127.0.0.1:5173' //只允许http://localhost:8080这个域名的请求
    // },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], //设置所允许的HTTP请求方法'
    allowHeaders: ["Content-Type", "Authorization", "Accept"], //设置服务器支持的所有头信息字段
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"], //设置获取其他自定义字段
  })
);
app.use(router.routes());
app.use(router.allowedMethods());

//路由
app.use(router.routes()).use(router.allowedMethods());

// 统一的错误处理
app.on("error", ErrorHeader);

export default app;
