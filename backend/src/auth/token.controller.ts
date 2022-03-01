import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from './jwt.guard';

@Controller('/api/token')
export class TokenController {

    @Get()
    @UseGuards(JwtGuard)
    token(@Req() request) {
        return {
            accessToken: request.user.accessToken
        };
    }

};
