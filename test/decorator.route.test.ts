import { Controller, Meta } from "../src/Controller";
import * as Test from "./decorator.route.data";

describe("test", () => {
    jest.setTimeout(30000);

    beforeAll(async done => {
        done();
    });

    afterAll(async () => {
    });

    it("controller name", () => {
        let controller: Controller;

        controller = new Test.RouteController_1();
        expect(controller[Meta].route).toBe("/RouteController_1");

        controller = new Test.RouteController_1_1();
        expect(controller[Meta].route).toBe("/RouteController_1_1");

        controller = new Test.RouteController_1_2();
        expect(controller[Meta].route).toBe("/RouteController_1_2");

        controller = new Test.RouteController_1_3();
        expect(controller[Meta].route).toBe("/RouteController_1_3");

        controller = new Test.RouteController_1_4();
        expect(controller[Meta].route).toBe("/RouteController_1_4");

        controller = new Test.RouteController_1_5();
        expect(controller[Meta].route).toBe("/RouteController_1_5");

        controller = new Test.RouteController_1_6();
        expect(controller[Meta].route).toBe("/custom");

        controller = new Test.RouteController_2();
        expect(controller[Meta].route).toBe("/Route");

        controller = new Test.RouteController_3();
        expect(controller[Meta].route).toBe("/Route");

        controller = new Test.RouteController_4();
        expect(controller[Meta].route).toBe("/Route");

        controller = new Test.Route_Controller_5();
        expect(controller[Meta].route).toBe("/Route");
    });
});
