import { Authorized, Controller, Get, Route } from "../src";

@Route
@Authorized
export class Auth_1_Controller extends Controller {
}

@Route
@Authorized()
export class Auth_2_Controller extends Controller {
}

@Route
@Authorized(true)
export class Auth_3_Controller extends Controller {
    @Get
    path_0() { }

    @Get
    @Authorized
    path_1() { }

    @Get
    @Authorized()
    path_2() { }

    @Get
    @Authorized(true)
    path_3() { }

    @Get
    @Authorized(false)
    path_4() { return "1"; }
}

@Route
@Authorized(false)
export class Auth_4_Controller extends Controller {
    @Get
    path_0() { }

    @Get
    @Authorized
    path_1() { }

    @Get
    @Authorized()
    path_2() { }

    @Get
    @Authorized(true)
    path_3() { }

    @Get
    @Authorized(false)
    path_4() { }
}


@Route
export class Auth_5_Controller extends Controller {
    @Get
    path_0() { }

    @Get
    @Authorized
    path_1() { }

    @Get
    @Authorized()
    path_2() { }

    @Get
    @Authorized(true)
    path_3() { }

    @Get
    @Authorized(false)
    path_4() { }
}
