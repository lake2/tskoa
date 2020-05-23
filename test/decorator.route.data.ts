import { Controller, Route } from "../src";

@Route("/RouteController_1")
export class RouteController_1 extends Controller {
}

@Route("RouteController_1_1")
export class RouteController_1_1 extends Controller {
}

@Route("RouteController_1_2/")
export class RouteController_1_2 extends Controller {
}

@Route("RouteController_1_3//")
export class RouteController_1_3 extends Controller {
}

@Route("//RouteController_1_4")
export class RouteController_1_4 extends Controller {
}

@Route("//RouteController_1_5//")
export class RouteController_1_5 extends Controller {
}

@Route("/custom")
export class RouteController_1_6 extends Controller {
}

@Route("")
export class RouteController_2 extends Controller {
}

@Route()
export class RouteController_3 extends Controller {
}

@Route
export class RouteController_4 extends Controller {
}

@Route
export class Route_Controller_5 extends Controller {
}
