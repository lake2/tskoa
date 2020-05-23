import { Controller, Post, Route } from "../src";

@Route
export class Post_1_Controller extends Controller {
    @Post
    name() {
        return { name: "1" };
    }
}
