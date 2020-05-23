import { Controller, Meta } from "../Controller";
import { HttpMethod } from "../enums";

export function Get(target: any, key: string, descriptor: PropertyDescriptor): void;
export function Get(path?: string): any;
export function Get(): any {
    if (arguments.length === 0) {
        return decorate;
    } else if (arguments.length === 1) {
        const arg = arguments[0];
        if (typeof arg === "string") {
            const path = arg;
            return function (target: any, key: string, descriptor: PropertyDescriptor) {
                decorate(target, key, descriptor, path);
            };
        } else {
            throw new Error("if error");
        }
    } else if (arguments.length === 3) {
        // @ts-ignore
        decorate(...arguments);
    } else {
        throw new Error("arguments length error.");
    }
}

function factory() {
    if (arguments.length === 0) {
        return decorate;
    } else if (arguments.length === 1) {
        const arg = arguments[0];
        if (typeof arg === "string") {
            const path = arg;
            return function (target: any, key: string, descriptor: PropertyDescriptor) {
                decorate(target, key, descriptor, path);
            };
        } else {
            throw new Error("if error");
        }
    } else if (arguments.length === 3) {
        // @ts-ignore
        decorate(...arguments);
    } else {
        throw new Error("arguments length error.");
    }
}

function decorate(target: any, key: string, descriptor: PropertyDescriptor, path?: string) {
    let meta: Controller.Meta = target[Meta];
    const notValidError = `'${target.constructor.name}' route '${key}' name is not valid.`;
    if (typeof path === "string" && path !== "") {
        const regexp = /^\/*(\w+)\/*$/.exec(path);
        if (regexp?.length === 2) {
            path = '/' + regexp?.[1];
        } else {
            throw new Error(notValidError);
        }
    } else {
        path = '/' + key;
    }

    const regexp = /^\/\w+$/;
    if (!regexp.test(path)) {
        throw new Error(notValidError);
    }

    if (target[Meta] === undefined) {
        meta = target[Meta] = {
            route: "",
            requests: {},
        };
    }
    if (meta.requests[key] === undefined) {
        meta.requests[key] = { methods: [], path: "", parameters: [] };
    }

    meta.requests[key].methods.push(HttpMethod.get);
    meta.requests[key].path = meta.route + path;
}
