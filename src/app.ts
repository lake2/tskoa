import { IsNotEmpty } from "class-validator";

import { Get, Query, Route } from "./decorators";
import { Controller, Meta } from "./Controller";
import { Tskoa } from './Tskoa';

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

    @Get()
    query(@Query(DTO.User) query: DTO.User) {
        return { name: query.name };
    }

    // @Get()
    // query_2(@Query() query: DTO.User) {
    //     return { name: query.name };
    // }

    // @Get()
    // query_3(@Query query: DTO.User) {
    //     return { name: query.name };
    // }
}

console.log(HomeController.prototype[Meta]);

const app = new Tskoa({ controllers: [HomeController] });

app.listen(3000);
