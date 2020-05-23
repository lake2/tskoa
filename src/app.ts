import { IsNotEmpty } from "class-validator";

import { Get, Post, Query, Route } from "./decorators";
import { Controller } from "./Controller";
import { Tskoa } from './Tskoa';
import { Body } from "./decorators/Body";

namespace DTO {
    export class User {
        @IsNotEmpty()
        name: string;
    }
}


@Route("/home")
class HomeController extends Controller {

    @Get("/name")
    name() {
        return { name: "1" };
    }

    @Get
    query(@Query(DTO.User) query: DTO.User) {
        return { name: query.name };
    }

    @Post
    post(@Body body: DTO.User) {
        return { name: body.name };
    }
}

const app = new Tskoa({ controllers: [HomeController] });

app.listen(3000);
