
import jsonwebtoken from 'jsonwebtoken';
import { Authorized, Controller, Get, Jwt, Params, Post, Query, Route, Tskoa } from './index';

@Route
export class UserController extends Controller {

    @Get
    async token() {
        const token = jsonwebtoken.sign({ user: 'jack' }, 'private key', { expiresIn: '10h' });
        return { code: 200, data: token };
    }

    @Get
    @Authorized
    async info(@Jwt jwt: any) {
        return { code: 200, data: { name: jwt.user } };
    }
}

const app = new Tskoa({
    controllers: [
        UserController,
    ],
    jwt: {
        secret: "private key",
    },
});

app.listen(3000);
