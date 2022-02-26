import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';

@Module({
    imports: [HttpModule],
    controllers: [SongsController],
    providers: [SongsService]
})
export class SongsModule {};
