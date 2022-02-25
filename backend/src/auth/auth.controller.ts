import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { map, take } from 'rxjs';

@Controller('/auth')
export class AuthController {

    constructor(private readonly jwtService: JwtService) {}

    @Get()
    @UseGuards(AuthGuard('spotify'))
    handleAuth() {}

    @Get('/callback')
    @UseGuards(AuthGuard('spotify'))
    callback(@Req() request, @Res() response) {
        return request.user
            .pipe(take(1))
            .subscribe((user) => {
                response.cookie('SQJWT', {
                    access_token: this.jwtService.sign(user)
                });
                response.redirect('/app');
            });
    }

}
