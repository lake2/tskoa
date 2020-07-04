import { request } from "./server";

describe("test", () => {
    jest.setTimeout(30000);

    beforeAll(async done => {
        done();
    });

    afterAll(async () => {
    });

    it("request", async () => {
        expect((await request().post("/body_1/json_1")).status).toBe(400);

        expect((await request().post("/body_1/json_1").send({ name: "1" })).status).toBe(200);
        expect((await request().post("/body_1/json_1").send({ name: "1" })).body).toMatchObject({ name: "1" });

        expect((await request().post("/body_1/json_2").send({ name: "1" })).status).toBe(200);
        expect((await request().post("/body_1/json_2").send({ name: "1" })).body).toMatchObject({ name: "1" });

        expect((await request().post("/body_1/json_3").send({ name: "1" })).status).toBe(200);
        expect((await request().post("/body_1/json_3").send({ name: "1" })).body).toMatchObject({ name: "1" });
    });
});
