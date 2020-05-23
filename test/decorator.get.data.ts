import { Controller, Get, Route } from "../src";
import { sleep } from "./utils";

@Route
export class Get_1_Controller extends Controller {
    @Get("/path_1")
    path_1() { }

    @Get("path_2")
    path_2() { }

    @Get("path_3/")
    path_3() { }

    @Get("//path_4")
    path_4() { }

    @Get("path_5//")
    path_5() { }

    @Get("//path_6//")
    path_6() { }

    @Get("")
    path_7() { }

    @Get()
    path_8() { }

    @Get
    path_9() { }
}

@Route
export class Get_2_Controller extends Controller {
    @Get
    name() {
        return { name: "1" };
    }

    @Get
    async task() {
        await sleep(100);
        return { name: "1" };
    }
}
