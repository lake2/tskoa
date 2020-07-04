import { Controller, Meta } from "../Controller";
import { Class } from "../types";

export function Authorized(target: Class<Controller>): void;
export function Authorized(target: any, key: string, descriptor: PropertyDescriptor): void;
export function Authorized(value?: boolean): any;
export function Authorized(): any {
    if (arguments.length === 0) {
        return function () {
            // @ts-ignore
            decorate(...arguments, true);
        };
    } else if (arguments.length === 1) {
        const arg = arguments[0];
        if (typeof arg === "boolean") {
            return function () {
                // @ts-ignore
                decorate(...arguments, arg);
            };
        } else if (typeof arg === "function") {
            decorate(arg, true);
        } else {
            throw new Error("if error");
        }
    } else if (arguments.length === 3) {
        // @ts-ignore
        decorate(...arguments, true);
    } else {
        throw new Error("arguments length error.");
    }
}

function decorate(target: any, key: string, descriptor: PropertyDescriptor, authorized?: boolean): void;
function decorate(target: Class<Controller>, authorized: boolean): void;
function decorate(): any {
    if (arguments.length <= 2) {
        const target: Class<Controller> = arguments[0];
        const authorized: boolean | undefined = arguments[1];
        let meta: Controller.Meta = target.prototype[Meta];

        if (target.prototype[Meta] === undefined) {
            meta = target.prototype[Meta] = {
                route: "",
                requests: {},
            };
        }

        meta.authorized = authorized;
    } else {
        const target: any = arguments[0];
        const key: string = arguments[1];
        const authorized: boolean | undefined = arguments[3];

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

        meta.requests[key].authorized = authorized;
    }
}
