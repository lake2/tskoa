import { Controller, Meta } from "../Controller";
import { Class } from "../types";

export function Route(target: Class<Controller>): void;
export function Route(path?: string): any;
export function Route(): any {
    if (arguments.length === 0) {
        return decorate;
    } else if (arguments.length === 1) {
        const arg = arguments[0];
        if (typeof arg === "string") {
            return function (target: Class<Controller>) {
                decorate(target, arg);
            };
        } else if (typeof arg === "function") {
            decorate(arg);
        } else {
            throw new Error("if error");
        }
    } else {
        throw new Error("arguments length error.");
    }
}

function decorate(target: Class<Controller>, path?: string) {
    let meta: Controller.Meta = target.prototype[Meta];
    const notValidError = `${target.name} route name is not valid.`;
    if (typeof path === "string" && path !== "") {
        const regexp = /^\/*(\w+)\/*$/.exec(path);
        if (regexp?.length === 2) {
            path = '/' + regexp?.[1];
        } else {
            throw new Error(notValidError);
        }
    } else {
        const regexp = /^(\w+?)_?controller/i.exec(target.name);
        if (regexp?.length === 2) {
            path = '/' + regexp?.[1];
        } else {
            throw new Error(notValidError);
        }
    }

    const regexp = /^\/*\w+\/*$/;
    if (!regexp.test(path)) {
        throw new Error(notValidError);
    }

    if (target.prototype[Meta] === undefined) {
        meta = target.prototype[Meta] = {
            route: "",
            requests: {},
        };
    }

    meta.route = path;
    Object.values(meta.requests).forEach(request => {
        request.path = path + request.path;
    });
}
