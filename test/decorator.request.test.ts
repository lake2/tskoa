import { request } from "./server";

describe("test", () => {
    jest.setTimeout(30000);

    beforeAll(async done => {
        done();
    });

    afterAll(async () => {
    });

    it("request 1", async () => {
        expect((await request().put("/request_1/put_1")).status).toBe(200);
        expect((await request().put("/request_1/put_1")).body).toMatchObject({ method: "put" });

        expect((await request().patch("/request_1/patch_1")).status).toBe(200);
        expect((await request().patch("/request_1/patch_1")).body).toMatchObject({ method: "patch" });

        expect((await request().delete("/request_1/delete_1")).status).toBe(200);
        expect((await request().delete("/request_1/delete_1")).body).toMatchObject({ method: "delete" });

        expect((await request().get("/request_1/request_1")).status).toBe(200);
        expect((await request().get("/request_1/request_1")).body).toMatchObject({ method: "request_1" });
        expect((await request().post("/request_1/request_1")).status).toBe(200);
        expect((await request().post("/request_1/request_1")).body).toMatchObject({ method: "request_1" });
    });

    it("request 2", async () => {
        expect((await request().post("/request_2/info/1?type=abc").send({ "search": "key" })).status).toBe(200);
        expect((await request().post("/request_2/info/1?type=abc").send({ "search": "key" })).body).toMatchObject(
            {
                code: 200,
                data: {
                    id: "1",
                    type: "abc",
                    search: "key"
                }
            }
        );
    });
});
