import { Controller, Meta } from "../Controller";
import { Class } from "../types";

export function Params(target: any, key: string, index: number): void;
export function Params<T>(dto?: Class<T>): any;
export function Params(): any {
    if (arguments.length === 0) {
        return decorate;
    } else if (arguments.length === 1) {
        const arg = arguments[0];
        return function (target: any, key: string, index: number) {
            decorate(target, key, index, arg);
        };
    } else if (arguments.length === 3) {
        // @ts-ignore
        decorate(...arguments);
    } else {
        throw new Error("arguments length error.");
    }
}

function decorate(target: any, key: string, index: number, dto?: Class<any>) {
    let meta: Controller.Meta = target[Meta];

    if (target[Meta] === undefined) {
        meta = target[Meta] = {
            route: "",
            requests: {},
        };
    }
    if (meta.requests[key] === undefined) {
        meta.requests[key] = { methods: [], path: "", parameters: [] };
    }
    const parameters = meta.requests[key].parameters;

    if (parameters.some(t => t.decorator === "params")) {
        throw new Error(`'${target.constructor.name}.${key}()' has multiple Query decorator.`);
    }

    parameters.push({ index, decorator: "params", dto });
    parameters.sort((a, b) => a.index - b.index);
}
