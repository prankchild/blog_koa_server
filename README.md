# Blog_Koa_Server

这是一个`koa`+`typescript`+`Sequelize`的一个比较简单的服务端框架

对于所需要的模块、报错信息、文件格式都已经初始化完成

后续将增加输出信息、日志保存

对于该项目 已经写了一个比较详细的例子：在 User 用户模块中已经有写出所需要的几个文件（controller、module、router、middleware、service）、具体可以在文件中查看

文件目录结构
|-- .env // 该系统的默认配置
|-- .gitignore
|-- src
| |-- config.ts // 读取.env 文件的配置
| |-- index.ts // 入口文件
| |-- routes.ts // 路由配置文件
| |-- app
| | |-- error-code.ts // 集中管理报错代码
| | |-- error-header.ts // 全局报错代码
| | |-- error-message.ts // 集中管理报错信息
| | |-- index.ts // 项目整体配置
| | |-- result.ts // 配置返回信息
| |-- modules // 模块
| | |-- basicInformation // 基础信息模块
| | | |-- user.controller.ts // 用户控制层
| | | |-- user.middleware.ts // 用户中间件
| | | |-- user.module.ts // 用户 sequelize 实体层
| | | |-- user.router.ts // 用户路由层
| | | |-- user.service.ts // 用户服务层
| |-- utils // 系统所需工具
| | |-- sequelize.ts // 系统配置 sequelize 信息
