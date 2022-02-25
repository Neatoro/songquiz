import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { map } from 'rxjs';

@Controller('/auth')
export class AuthController {

    constructor(private readonly jwtService: JwtService) {}

    @Get()
    @UseGuards(AuthGuard('spotify'))
    handleAuth() {}

    @Get('/callback')
    @UseGuards(AuthGuard('spotify'))
    callback(@Req() request) {
        return request.user.pipe(
            map((user: object) => ({
                access_token: this.jwtService.sign(user)
            }))
        )
    }

}
