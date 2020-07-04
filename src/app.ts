
import { Tskoa, Controller, Post, Route, Params, Query } from './index';

import { IsNumberString, IsString } from "class-validator";
import { Body } from "./decorators/Body";

class User {
    @IsNumberString()
    // @ts-ignore
    id: string;
}

class Type {
    @IsString()
    // @ts-ignore
    type: string
}

class Content {
    @IsString()
    // @ts-ignore
    search: string
}

@Route
export class UserController extends Controller {
    @Post("/info/:id")
    public async getInfoById(@Params(User) params: User, @Query(Type) query: Type, @Body(Content) body: Content) {
        return {
            code: 200,
            data: {
                id: params.id,
                type: query.type,
                search: body.search
            }
        };
    }
}

const app = new Tskoa({
    controllers: [
        UserController
    ]
});

app.listen(3000);
