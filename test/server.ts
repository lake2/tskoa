import supertest from "supertest";

import { Tskoa } from "../src/Tskoa";
import * as Test_1 from "./decorator.get.data";
import * as Test_2 from "./decorator.query.data";
import * as Test_3 from "./decorator.post.data";
import * as Test_4 from "./decorator.body.data";

const app = new Tskoa({
    controllers: [
        Test_1.Get_1_Controller,
        Test_1.Get_2_Controller,
        Test_2.Query_1_Controller,
        Test_3.Post_1_Controller,
        Test_4.Body_1_Controller,
    ],
});

export function request() {
    // https://hackernoon.com/async-testing-koa-with-jest-1b6e84521b71
    return supertest((app as any).koa.callback());
}
