import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { take } from 'rxjs';
import { JwtService } from './jwt.service';
import { resolve as pathResolver } from 'path';

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
            .subscribe(async (user) => {
                response.cookie('SQJWT', await this.jwtService.sign(user));
                response.redirect('/app/');
            });
    }

    @Get('/.well-known/jwks.json')
    async jwks() {
        const jwks = await import(pathResolver(process.cwd(), '.well-known', 'jwks.json'));
        return jwks;
    }

}
