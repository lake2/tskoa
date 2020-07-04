import { IsNumberString, IsString } from "class-validator";
import { Controller, Route, Put, Patch, Delete, Get, Post, Params, Query, Body } from "../src";

@Route
export class Request_1_Controller extends Controller {
    @Put
    put_1() {
        return { method: "put" };
    }

    @Patch
    patch_1() {
        return { method: "patch" };
    }

    @Delete
    delete_1() {
        return { method: "delete" };
    }

    @Get
    @Post
    request_1() {
        return { method: "request_1" };
    }
}

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
export class Request_2_Controller extends Controller {
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
