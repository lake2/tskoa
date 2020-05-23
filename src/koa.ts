import Koa from 'koa';

import Router from '@koa/router';

const koa = new Koa();
const router = new Router();

router.get('/123', (ctx, next) => {
    // ctx.router available
    ctx.body = "12";
    ctx.querystring;
});

koa.use(router.routes()).use(router.allowedMethods());
