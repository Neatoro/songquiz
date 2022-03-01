import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/jwt.guard';
import { CategoriesService } from './categories.service';

@Controller('/api/categories')
export class CategoriesController {

    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    @UseGuards(JwtGuard)
    async list(@Req() request) {
        const { accessToken } = request.user;
        return await this.categoriesService.list(accessToken);
    }

    @Get('/:id/playlists')
    @UseGuards(JwtGuard)
    async getPlaylists(@Req() request, @Param('id') id: string) {
        const { accessToken } = request.user;
        return await this.categoriesService.getPlaylists(accessToken, id);
    }

};
