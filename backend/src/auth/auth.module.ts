import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { SpotifyStrategy } from './spotify.strategy';
import { JwksClient } from 'jwks-rsa';
import { resolve as pathResolver } from 'path';
import { JwtService } from './jwt.service';

const jwksClient = new JwksClient({
    cache: true,
    rateLimit: false,
    jwksUri: 'file://' + pathResolver(__dirname, '.well-known', 'jwks.json')
});

@Module({
    imports: [
        HttpModule,
        PassportModule
    ],
    controllers: [AuthController],
    providers: [SpotifyStrategy, JwtStrategy, JwtService]
})
export class AuthModule {};
