import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { SpotifyStrategy } from './spotify.strategy';
import { JwtService } from './jwt.service';
import { TokenController } from './token.controller';
import { JwtGuard } from './jwt.guard';

@Module({
    imports: [
        HttpModule,
        PassportModule
    ],
    controllers: [AuthController, TokenController],
    providers: [SpotifyStrategy, JwtStrategy, JwtService, JwtGuard],
    exports: [JwtGuard]
})
export class AuthModule {};
