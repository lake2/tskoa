import { request } from "./server";

describe("test", () => {
    jest.setTimeout(30000);

    beforeAll(async done => {
        done();
    });

    afterAll(async () => {
    });

    it("request", async () => {
        expect((await request().get("/post_1/name")).status).toBe(405);
        expect((await request().post("/post_1/name")).status).toBe(200);
        expect((await request().post("/post_1/name")).body).toMatchObject({ name: "1" });
    });
});
