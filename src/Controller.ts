import { HttpMethod } from "./enums";
import { Class } from "./types";

export const Meta = Symbol("Controller.meta");

export class Controller {
    [Meta]: Controller.Meta;
}

export declare namespace Controller {
    interface Meta {
        route: string
        requests: Requests
    }

    interface Request {
        methods: Array<keyof typeof HttpMethod>,
        path: string,
        parameters: Array<Request.Parameter>
    }

    namespace Request {
        interface Parameter {
            index: number,
            decorator: "query" | "body",
            dto?: Class<any>
        }
    }

    type Requests = { [fn: string]: Request };
}
