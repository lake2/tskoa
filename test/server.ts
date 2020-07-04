import supertest from "supertest";

import { Tskoa } from "../src/Tskoa";
import * as Test_01 from "./decorator.get.data";
import * as Test_02 from "./decorator.query.data";
import * as Test_03 from "./decorator.post.data";
import * as Test_04 from "./decorator.body.data";
import * as Test_05 from "./decorator.request.data";
import * as Test_06 from "./decorator.params.data";

const app = new Tskoa({
    controllers: [
        Test_01.Get_1_Controller,
        Test_01.Get_2_Controller,
        Test_02.Query_1_Controller,
        Test_03.Post_1_Controller,
        Test_04.Body_1_Controller,
        Test_05.Request_1_Controller,
        Test_05.Request_2_Controller,
        Test_06.Params_1_Controller,
        Test_06.Params_2_Controller,
    ],
});

export function request() {
    // https://hackernoon.com/async-testing-koa-with-jest-1b6e84521b71
    return supertest((app as any).koa.callback());
}
