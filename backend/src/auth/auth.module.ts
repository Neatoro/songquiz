import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { SpotifyStrategy } from './spotify.strategy';

@Module({
    imports: [
        HttpModule,
        PassportModule,
        JwtModule.registerAsync({
            useFactory(config: ConfigService) {
                return {
                    secret: config.get<string>('JWT_SECRET'),
                    signOptions: { expiresIn: '60m' }
                }
            },
            inject: [ConfigService]
        })
    ],
    controllers: [AuthController],
    providers: [SpotifyStrategy, JwtStrategy]
})
export class AuthModule {};
