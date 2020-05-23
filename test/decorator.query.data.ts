import { IsNotEmpty } from "class-validator";

import { Controller, Get, Query, Route } from "../src";

class User {
    @IsNotEmpty()
    name: string;
}

@Route
export class Query_1_Controller extends Controller {
    @Get
    query_1(@Query(User) query: User) {
        return { name: query.name };
    }

    @Get
    query_2(@Query() query: User) {
        return { name: query.name };
    }

    @Get
    query_3(@Query query: User) {
        return { name: query.name };
    }
}
