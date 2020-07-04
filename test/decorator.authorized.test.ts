import { Controller } from "../src";
import * as Test from "./decorator.authorized.data";
import { Meta } from "../src/Controller";

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
        expect(controller[Meta].authorized).toBe(undefined);

        controller = new Test.Auth_2_Controller();
        expect(controller[Meta].authorized).toBe(undefined);

        controller = new Test.Auth_3_Controller();
        expect(controller[Meta].authorized).toBe(true);
        expect(controller[Meta].requests["path_0"].authorized).toBe(undefined);
        expect(controller[Meta].requests["path_1"].authorized).toBe(undefined);
        expect(controller[Meta].requests["path_2"].authorized).toBe(undefined);
        expect(controller[Meta].requests["path_3"].authorized).toBe(true);
        expect(controller[Meta].requests["path_4"].authorized).toBe(false);

        controller = new Test.Auth_4_Controller();
        expect(controller[Meta].authorized).toBe(false);
        expect(controller[Meta].requests["path_0"].authorized).toBe(undefined);
        expect(controller[Meta].requests["path_1"].authorized).toBe(undefined);
        expect(controller[Meta].requests["path_2"].authorized).toBe(undefined);
        expect(controller[Meta].requests["path_3"].authorized).toBe(true);
        expect(controller[Meta].requests["path_4"].authorized).toBe(false);

    });
});
