import Body from 'koa-body';
import Router from '@koa/router';
import Koa, { Context as KoaContext } from 'koa';
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

import { Controller, Meta } from "./Controller";
import { Class } from './types';

interface Context extends KoaContext {
}

export class Tskoa {
    koa = new Koa();
    private router = new Router();

    constructor(options: { controllers: Array<Class<Controller>> }) {
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
                                if (param.dto && param.dto instanceof Object) {
                                    const error = await validate(plainToClass(param.dto, query));
                                    let message: string | undefined;
                                    if (error.length > 0) {
                                        const constraints = error[0].constraints;
                                        message = constraints?.[Object.keys(constraints)[0]];
                                        context.response.status = 400;
                                        context.response.body = { code: -1, message };
                                        return;
                                    } else {
                                        parameters.push(query);
                                    }
                                } else {
                                    parameters.push(query ?? {});
                                }
                            } else if (param.decorator === "params") {
                                const params = context.params;
                                if (param.dto && param.dto instanceof Object) {
                                    const error = await validate(plainToClass(param.dto, params));
                                    let message: string | undefined;
                                    if (error.length > 0) {
                                        const constraints = error[0].constraints;
                                        message = constraints?.[Object.keys(constraints)[0]];
                                        context.response.status = 400;
                                        context.response.body = { code: -1, message };
                                        return;
                                    } else {
                                        parameters.push(params);
                                    }
                                } else {
                                    parameters.push(params ?? {});
                                }
                            } else if (param.decorator === "body") {
                                const body = context.request.body;
                                if (param.dto && param.dto instanceof Object) {
                                    const error = await validate(plainToClass(param.dto, body));
                                    let message: string | undefined;
                                    if (error.length > 0) {
                                        const constraints = error[0].constraints;
                                        message = constraints?.[Object.keys(constraints)[0]];
                                        context.response.status = 400;
                                        context.response.body = { code: -1, message };
                                        return;
                                    } else {
                                        parameters.push(body);
                                    }
                                } else {
                                    parameters.push(body ?? {});
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
                    this.router[method](request.path, handler);
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
