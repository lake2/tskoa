import { IsNumberString } from "class-validator";

import { Controller, Get, Params, Route } from "../src";

class User {
    @IsNumberString()
    // @ts-ignore
    id: string;
}

@Route
export class Params_1_Controller extends Controller {
    @Get("/params_1/:id")
    path_1(@Params(User) params: User) {
        return { id: params.id };
    }

    @Get("/params_2/:id")
    path_2(@Params() params: User) {
        return { id: params.id };
    }

    @Get("/params_3/:id")
    path_3(@Params params: User) {
        return { id: params.id };
    }
}


@Route
export class Params_2_Controller extends Controller {
    @Get("/params_1/")
    path_1() {
        return { id: "" };
    }

    @Get("/params_1/:id")
    path_2(@Params(User) params: User) {
        return { id: params.id };
    }
}
