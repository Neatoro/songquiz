import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { SpotifyStrategy } from './spotify.strategy';
import { JwtService } from './jwt.service';

@Module({
    imports: [
        HttpModule,
        PassportModule
    ],
    controllers: [AuthController],
    providers: [SpotifyStrategy, JwtStrategy, JwtService]
})
export class AuthModule {};
