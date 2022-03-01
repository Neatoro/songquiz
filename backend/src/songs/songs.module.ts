import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';

@Module({
    imports: [AuthModule, HttpModule],
    controllers: [SongsController],
    providers: [SongsService]
})
export class SongsModule {};
