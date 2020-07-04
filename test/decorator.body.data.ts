import { IsNotEmpty } from "class-validator";

import { Controller, Post, Route } from "../src";
import { Body } from "../src/decorators/Body";

class User {
    @IsNotEmpty()
    // @ts-ignore
    name: string;
}

@Route
export class Body_1_Controller extends Controller {
    @Post
    json_1(@Body(User) user: User) {
        return { name: user.name };
    }

    @Post
    json_2(@Body() user: User) {
        return { name: user.name };
    }

    @Post
    json_3(@Body user: User) {
        return { name: user.name };
    }
}
