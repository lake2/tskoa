import { Controller, Meta } from "../Controller";
import { HttpMethod } from "../enums";

export function Get(target: any, key: string, descriptor: PropertyDescriptor): void;
export function Get(path?: string): any;
export function Get(): any {
    return factory(HttpMethod.get, arguments);
}

export function Post(target: any, key: string, descriptor: PropertyDescriptor): void;
export function Post(path?: string): any;
export function Post(): any {
    return factory(HttpMethod.post, arguments);
}

export function Put(target: any, key: string, descriptor: PropertyDescriptor): void;
export function Put(path?: string): any;
export function Put(): any {
    return factory(HttpMethod.put, arguments);
}

export function Patch(target: any, key: string, descriptor: PropertyDescriptor): void;
export function Patch(path?: string): any;
export function Patch(): any {
    return factory(HttpMethod.patch, arguments);
}

export function Delete(target: any, key: string, descriptor: PropertyDescriptor): void;
export function Delete(path?: string): any;
export function Delete(): any {
    return factory(HttpMethod.delete, arguments);
}

function factory(method: HttpMethod, args: any): any {
    if (args.length === 0) {
        return function (target: any, key: string, descriptor: PropertyDescriptor) {
            decorate(target, key, descriptor, method);
        };
    } else if (args.length === 1) {
        const arg = args[0];
        if (typeof arg === "string") {
            const path = arg;
            return function (target: any, key: string, descriptor: PropertyDescriptor) {
                decorate(target, key, descriptor, method, path);
            };
        } else {
            throw new Error("if error");
        }
    } else if (args.length === 3) {
        // @ts-ignore
        decorate(...args, method);
    } else {
        throw new Error("arguments length error.");
    }
}

function decorate(target: any, key: string, descriptor: PropertyDescriptor, method: HttpMethod, path?: string) {
    let meta: Controller.Meta = target[Meta];
    const notValidError = `'${target.constructor.name}' route '${key}' path '${path}' is not valid.`;
    if (typeof path === "string" && path !== "") {
        const regexp = /^\/*([\w\/:]+?)\/*$/.exec(path);
        if (regexp?.length === 2) {
            path = '/' + regexp?.[1];
        } else {
            throw new Error(notValidError);
        }
    } else {
        path = '/' + key;
    }

    const regexp = /^\/[\w\/:]+$/;
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

    meta.requests[key].methods.push(method);
    meta.requests[key].path = meta.route + path;
}
