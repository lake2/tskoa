<img src="https://user-images.githubusercontent.com/6293752/86509520-18577280-be1b-11ea-9f37-f5a3c71ba491.png" alt="logo" height="150" align="right" />

# Tskoa

> 一个轻量级的koa开发框架，用于快速搭建restful api。

### 开始

创建一个简单的项目结构：

```
├── package.json
├── src
│   ├── controllers
│   │   └── home.controller.ts
│   └── index.ts
└── tsconfig.json
```

安装依赖：

```
npm install tskoa --save
```

推荐使用typescript：

```
npm install typescript -g
```

配置tsconfig.json：

```json
{
    "compilerOptions": {
        "target": "ESNext",
        "module": "CommonJS",
        "sourceMap": true,
        "outDir": "./run",
        "noEmit": false,
        "moduleResolution": "node",
        "experimentalDecorators": true,
        "skipLibCheck": true,
        "pretty": true,
        "strict": true,
        "typeRoots": [
            "./node_modules/@types"
        ]
    },
    "include": [
        "./src/**/*",
    ]
}
```

在`src/controller/home.controller.ts`创建一个`Controller`：

```ts
import { Controller, Get, Route } from "tskoa";

@Route
export class HomeController extends Controller {
    
    @Get
    public index() {
        return "Hello world";
    }
}
```

在`src/index.ts`启动项目：

```ts
import { Tskoa } from "tskoa";

import { HomeController } from "./controllers/home.controller";

const app = new Tskoa({
    controllers: [
        HomeController
    ]
});

app.listen(3001);
```

编译：

```shell
tsc -p tsconfig.json  --watch
```

执行：

```shell
node run
```

结果：

```shell
curl http://127.0.0.1:3001/home/index
```

```
Hello world
```

### Content-Type

`content-type`是根据`Controller`的方法返回值确定的，比如上面的例子，`index`返回了一个字符串，那么`response`为：

```
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8
Content-Length: 11
Date: Sat, 04 Jul 2020 06:08:00 GMT
Connection: keep-alive

Hello world
```

你可以返回一个`json`或者`array`：

```ts
@Route
export class HomeController extends Controller {
    
    @Get
    public index() {
        return ["Hello world"];
    }
}
```

结果：

### 路由

默认情况下，路由是根据`Controller`类和方法的名称匹配的，例如：

```ts
// 匹配 Get /home/index
@Route
export class HomeController extends Controller {
    
    @Get
    public index() {
        return "Hello world";
    }
}
```

当然，你可以在装饰器内传递一个字符串，改变这一情况：

```ts
// 匹配 Get /foo/bar
@Route("/foo")
export class HomeController extends Controller {
    
    @Get("/bar")
    public async index() {
        return "Hello world";
    }
}
```

目前有下面几个常用的请求方法装饰器：

- @Get
- @Post
- @Delete
- @Put
- @Patch

一个url同时支持多个请求方法是允许的：

```ts
// 匹配 Get  /home/index
// 匹配 Post /home/index
@Route
export class HomeController extends Controller {
    
    @Get
    @Post
    public index() {
        return "Hello world";
    }
}
```

### 路由参数

目前有下面几个常用的路由参数装饰器：

- @Params
- @Query
- @Body

命名路由可以通过`@Params`获得

```ts
class User { id: string; }

@Route
export class UserController extends Controller {
    
    @Get("/info/:id")
    public async getInfoById(@Params params: User) {
        return { code: 200, data: { id: params.id } };
    }
}
```

请求`get /user/info/1`返回：

```json
{
    "code": 200,
    "data": {
        "id": "1"
    }
}
```

可以使用`class-validator`，给`@Params`传递一个参数，进行数据验证：

```ts
import { IsNumberString } from "class-validator";

class User {
    @IsNumberString()
    id: string;
}

@Route
export class UserController extends Controller {
    
    @Get("/info/:id")
    public async getInfoById(@Params(User) params: User) {
        return { code: 200, data: { id: params.id } };
    }
}
```

请求`get /user/info/abc`返回：

```json
{
    "code": -1,
    "message": "id must be a number string"
}
```

`@Query`可以获得查询参数，`@Body`可以获得`post body`：

```ts
class User {
    @IsNumberString()
    id: string;
}

class Type {
    @IsString()
    type: string
}

class Content {
    @IsString()
    search: string
}

@Route
export class UserController extends Controller {
    
    @Post("/info/:id")
    public async getInfoById(@Params(User) params: User, @Query(Type) query: Type, @Body(Content) body: Content) {
        return {
            code: 200,
            data: {
                id: params.id,
                type: query.type,
                search: body.search
            }
        };
    }
}
```

发送请求`post /user/info/1?type=abc`:

```
POST http://127.0.0.1:3000/user/info/1?type=abc HTTP/1.1
Content-Type: application/json
Accept: */*
Host: 127.0.0.1:3000
Content-Length: 24

{ "search" : "key" }
```

返回：

```json
{
    "code": 200,
    "data": {
        "id": "1",
        "type": "abc",
        "search": "key"
    }
}
```

### 权限验证

开启JTW验证：

```ts

```

### 日志

```ts
import path from "path";
import { Logger } from 'tskoa';

const logger = new Logger({
    console: true,                                // 是否在控制台显示
    dirname: path.resolve(__dirname, "../logs"),  // 日志存放目录
    filename: 'logs'                              // 日志文件名
});

logger.info("info 123");
logger.warn("warn 456");
logger.error("error 789");
```

### License

MIT

