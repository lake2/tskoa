import { request } from "./server";

describe("test", () => {
    jest.setTimeout(30000);

    beforeAll(async done => {
        done();
    });

    afterAll(async () => {
    });

    it("request", async () => {
        expect((await request().get("/params_1/params_1")).status).toBe(404);
        expect((await request().get("/params_1/params_1/1")).status).toBe(200);
        expect((await request().get("/params_1/params_1/1")).body).toMatchObject({ id: "1" });

        expect((await request().get("/params_1/params_2")).status).toBe(404);
        expect((await request().get("/params_1/params_2/1")).status).toBe(200);
        expect((await request().get("/params_1/params_2/1")).body).toMatchObject({ id: "1" });

        expect((await request().get("/params_1/params_3")).status).toBe(404);
        expect((await request().get("/params_1/params_3/1")).status).toBe(200);
        expect((await request().get("/params_1/params_3/1")).body).toMatchObject({ id: "1" });

        expect((await request().get("/params_2/params_1")).status).toBe(200);
        expect((await request().get("/params_2/params_1")).body).toMatchObject({ id: "" });

        expect((await request().get("/params_2/params_1/1")).status).toBe(200);
        expect((await request().get("/params_2/params_1/1")).body).toMatchObject({ id: "1" });
    });
});
