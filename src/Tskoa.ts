import jsonwebtoken from 'jsonwebtoken';
import Body from 'koa-body';
import Koa, { Context as KoaContext } from 'koa';
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

import { Controller, Meta } from "./Controller";
import { Class } from './types';

import Router from '@koa/router';

interface Context extends KoaContext {
}

interface Options {
    controllers: Array<Class<Controller>>,
    jwt?: {
        secret: string,
    }
}

export class Tskoa {
    koa = new Koa();
    private router = new Router();

    constructor(options: Options) {
        options.controllers.forEach(item => {
            const controller = new item();
            if (controller instanceof Controller === false) {
                throw new Error(`Controller '${item.name}' doesn't extend from Controller class.`);
            }
            const meta = controller[Meta];
            Object.keys(meta.requests).forEach(key => {
                const request = meta.requests[key];

                const handler = async (context: Context, next: any) => {
                    const fn = (controller as any)[key];
                    const parameters: Array<any> = [];
                    if (request.parameters.length > 0) {
                        for (const param of request.parameters) {
                            if (param.decorator === "query") {
                                const query = context.request.query;
                                const valid = await dto_validate(param, context, parameters, query);
                                if (!valid) return;
                            } else if (param.decorator === "params") {
                                const params = context.params;
                                const valid = await dto_validate(param, context, parameters, params);
                                if (!valid) return;
                            } else if (param.decorator === "body") {
                                const body = context.request.body;
                                const valid = await dto_validate(param, context, parameters, body);
                                if (!valid) return;
                            } else if (param.decorator === "jwt") {
                                const authorization = context.request.header.authorization;
                                const res = /^Bearer\s(.*?)$/.exec(authorization);
                                let body: any;
                                if (res?.length === 2) {
                                    try {
                                        body = jsonwebtoken.verify(res[1], options.jwt?.secret!);
                                    } catch (e) {
                                        context.response.status = 401;
                                        return;
                                    }
                                    const valid = await dto_validate(param, context, parameters, body);
                                    if (!valid) return;
                                } else {
                                    context.response.status = 401;
                                    return;
                                }
                            } else {
                                throw new Error(`'${item.name}.${key}()' parameter has unknown decorator.`);
                            }
                        }
                    }
                    const response = await fn(...parameters);
                    context.response.body = response;
                };

                request.methods.forEach(method => {
                    this.router[method](request.path, async (context: Context, next: any) => {

                        const meta: Controller.Meta = item.prototype[Meta];
                        if (meta.authorized && !options.jwt) {
                            throw new Error(`Controller '${item.name}' is decorated by '@Authorized' but the authorize options are not set.`);
                        }
                        const local = typeof request.authorized === "undefined" ? meta.authorized : request.authorized; // 是否开启method级的jwt验证
                        if (!local) {
                            await handler(context, next);
                            return;
                        } else {
                            const authorization = context.request.header.authorization;
                            const res = /^Bearer\s(.*?)$/.exec(authorization);
                            if (res?.length === 2) {
                                try {
                                    jsonwebtoken.verify(res[1], options.jwt?.secret!);
                                } catch (e) {
                                    context.response.status = 401;
                                    return;
                                }
                                await handler(context, next);
                                return;
                            } else {
                                context.response.status = 401;
                                return;
                            }
                        }
                    });
                });
            });
        });
        this.koa.use(Body());
        this.koa.use(this.router.routes()).use(this.router.allowedMethods());
    }

    listen(port: number) {
        this.koa.listen(port);
        console.log(`server is listening on port ${port}...`);
    }
}


async function dto_validate(param: Controller.Request.Parameter, context: Context, parameters: Array<any>, obj: any) {
    if (param.dto && param.dto instanceof Object) {
        const error = await validate(plainToClass(param.dto, obj));
        let message: string | undefined;
        if (error.length > 0) {
            const constraints = error[0].constraints;
            message = constraints?.[Object.keys(constraints)[0]];
            context.response.status = 400;
            context.response.body = { code: -1, message };
            return false;
        } else {
            parameters.push(obj);
        }
    } else {
        parameters.push(obj ?? {});
    }
    return true;
}
