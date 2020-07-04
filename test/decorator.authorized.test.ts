import { Controller } from "../src";
import * as Test from "./decorator.authorized.data";
import { Meta } from "../src/Controller";
// import { request } from "./server";

describe("test", () => {
    jest.setTimeout(30000);

    beforeAll(async done => {
        done();
    });

    afterAll(async () => {
    });

    it("meta", async () => {
        let controller: Controller;

        controller = new Test.Auth_1_Controller();
        expect(controller[Meta].authorized).toBe(true);

        controller = new Test.Auth_2_Controller();
        expect(controller[Meta].authorized).toBe(true);

        controller = new Test.Auth_3_Controller();
        expect(controller[Meta].authorized).toBe(true);
        expect(controller[Meta].requests.path_0.authorized).toBe(undefined);
        expect(controller[Meta].requests.path_1.authorized).toBe(true);
        expect(controller[Meta].requests.path_2.authorized).toBe(true);
        expect(controller[Meta].requests.path_3.authorized).toBe(true);
        expect(controller[Meta].requests.path_4.authorized).toBe(false);

        controller = new Test.Auth_4_Controller();
        expect(controller[Meta].authorized).toBe(false);
        expect(controller[Meta].requests.path_0.authorized).toBe(undefined);
        expect(controller[Meta].requests.path_1.authorized).toBe(true);
        expect(controller[Meta].requests.path_2.authorized).toBe(true);
        expect(controller[Meta].requests.path_3.authorized).toBe(true);
        expect(controller[Meta].requests.path_4.authorized).toBe(false);

        controller = new Test.Auth_5_Controller();
        expect(controller[Meta].authorized).toBe(undefined);
        expect(controller[Meta].requests.path_0.authorized).toBe(undefined);
        expect(controller[Meta].requests.path_1.authorized).toBe(true);
        expect(controller[Meta].requests.path_2.authorized).toBe(true);
        expect(controller[Meta].requests.path_3.authorized).toBe(true);
        expect(controller[Meta].requests.path_4.authorized).toBe(false);

    });

    it("request", async () => {
        // expect((await request().get("/auth_3/path_0")).status).toBe(401);
        // expect((await request().get("/auth_3/path_1")).status).toBe(401);
        // expect((await request().get("/auth_3/path_2")).status).toBe(401);
        // expect((await request().get("/auth_3/path_3")).status).toBe(401);

        // expect((await request().get("/auth_3/path_4")).status).toBe(200);
        // expect((await request().get("/body_1/path_4")).body).toBe("1");

    });
});
