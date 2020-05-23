import { request } from "./server";

describe("test", () => {
    jest.setTimeout(30000);

    beforeAll(async done => {
        done();
    });

    afterAll(async () => {
    });

    it("request", async () => {
        await request().get("/post_1/name").expect(405);
        expect((await request().post("/post_1/name").expect(200)).body).toMatchObject({ name: "1" });
    });
});
