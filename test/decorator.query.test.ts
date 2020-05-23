import { Controller, Meta } from "../src/Controller";
import { Query_1_Controller } from "./decorator.query.data";
import { HttpMethod } from "../src/enums";
import { request } from "./server";

describe("test", () => {
    jest.setTimeout(30000);

    beforeAll(async done => {
        done();
    });

    afterAll(async () => {
    });

    it("query", async () => {
        const meta = new Query_1_Controller()[Meta];
        let request: Controller.Request;
        let parameter: Controller.Request.Parameter;

        expect(meta.route).toBe("/Query_1");

        // #region query_1
        request = meta.requests.query_1;
        expect(request.path).toBe("/Query_1/query_1");
        expect(request.methods).toMatchObject([HttpMethod.get]);
        expect(request.parameters.length).toBe(1);

        parameter = request.parameters[0];
        expect(parameter.index).toBe(0);
        expect(parameter.decorator).toBe("query");
        expect(parameter.dto).not.toBe(undefined);
        // #endregion

        // #region query_2
        request = meta.requests.query_2;
        expect(request.path).toBe("/Query_1/query_2");
        expect(request.methods).toMatchObject([HttpMethod.get]);
        expect(request.parameters.length).toBe(1);

        parameter = request.parameters[0];
        expect(parameter.index).toBe(0);
        expect(parameter.decorator).toBe("query");
        expect(parameter.dto).toBe(undefined);
        // #endregion

        // #region query_3
        request = meta.requests.query_3;
        expect(request.path).toBe("/Query_1/query_3");
        expect(request.methods).toMatchObject([HttpMethod.get]);
        expect(request.parameters.length).toBe(1);

        parameter = request.parameters[0];
        expect(parameter.index).toBe(0);
        expect(parameter.decorator).toBe("query");
        expect(parameter.dto).toBe(undefined);
        // #endregion
    });

    it("request", async () => {
        expect((await request().get("/query_1/query_1").expect(400)).body).toMatchObject({ message: "name should not be empty" });
        expect((await request().get("/query_1/query_1").query({ name: "2" }).expect(200)).body).toMatchObject({ name: "2" });

        expect((await request().get("/query_1/query_2").expect(200)).body).toMatchObject({});
        expect((await request().get("/query_1/query_2").query({ name: "2" }).expect(200)).body).toMatchObject({ name: "2" });

        expect((await request().get("/query_1/query_3").expect(200)).body).toMatchObject({});
        expect((await request().get("/query_1/query_3").query({ name: "2" }).expect(200)).body).toMatchObject({ name: "2" });
    });
});
