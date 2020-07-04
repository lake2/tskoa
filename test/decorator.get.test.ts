import { Controller, Meta } from "../src/Controller";
import * as Test from "./decorator.get.data";
import { request } from "./server";

describe("test", () => {
    jest.setTimeout(30000);

    beforeAll(async done => {
        done();
    });

    afterAll(async () => {
    });

    it("get path name", async () => {
        let controller: Controller;

        controller = new Test.Get_1_Controller();
        expect(controller[Meta].requests.path_1.path).toBe("/Get_1/path_1");
        expect(controller[Meta].requests.path_2.path).toBe("/Get_1/path_2");
        expect(controller[Meta].requests.path_3.path).toBe("/Get_1/path_3");
        expect(controller[Meta].requests.path_4.path).toBe("/Get_1/path_4");
        expect(controller[Meta].requests.path_5.path).toBe("/Get_1/path_5");
        expect(controller[Meta].requests.path_6.path).toBe("/Get_1/path_6");
        expect(controller[Meta].requests.path_7.path).toBe("/Get_1/path_7");
        expect(controller[Meta].requests.path_8.path).toBe("/Get_1/path_8");
        expect(controller[Meta].requests.path_9.path).toBe("/Get_1/path_9");
    });

    it("request", async () => {
        expect((await request().get("/get_1/path_1")).status).toBe(204);
        expect((await request().get("/get_1/path_2")).status).toBe(204);
        expect((await request().get("/get_1/path_3")).status).toBe(204);
        expect((await request().get("/get_1/path_4")).status).toBe(204);
        expect((await request().get("/get_1/path_5")).status).toBe(204);
        expect((await request().get("/get_1/path_6")).status).toBe(204);
        expect((await request().get("/get_1/path_7")).status).toBe(204);
        expect((await request().get("/get_1/path_8")).status).toBe(204);
        expect((await request().get("/get_1/path_9")).status).toBe(204);

        expect((await request().get("/get_2/name")).status).toBe(200);
        expect((await request().get("/get_2/name")).body).toMatchObject({ name: "1" });

        expect((await request().get("/get_2/task")).status).toBe(200);
        expect((await request().get("/get_2/task")).body).toMatchObject({ name: "1" });
    });
});
