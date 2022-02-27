import { Controller, Get, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SongsService } from './songs.service';

@Controller('/api/songs')
export class SongsController {

    constructor(private readonly songsService: SongsService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    list(@Query('playlists') playlists: string, @Req() request) {
        const { accessToken } = request.user;
        const playlistArray = playlists.split(',');
        return this.songsService.list(accessToken, playlistArray);
    }

    @Put('/play')
    @UseGuards(AuthGuard('jwt'))
    play(@Query('song') song: string, @Query('device_id') deviceId: string, @Req() request) {
        const { accessToken } = request.user;
        return this.songsService.play(accessToken, song, deviceId);
    }

};
