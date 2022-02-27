import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/token')
export class TokenController {

    @Get()
    @UseGuards(AuthGuard('jwt'))
    token(@Req() request) {
        return request.user;
    }

};
