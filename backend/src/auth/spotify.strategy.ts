import { Strategy } from 'passport-oauth2';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SpotifyStrategy extends PassportStrategy(Strategy, 'spotify') {

    constructor(private readonly http: HttpService, config: ConfigService) {
        super({
            authorizationURL: 'https://accounts.spotify.com/authorize',
            tokenURL: 'https://accounts.spotify.com/api/token',
            clientID: config.get<string>('SPOTIFY_CLIENT_ID'),
            clientSecret: config.get<string>('SPOTIFY_CLIENT_SECRET'),
            callbackURL: config.get<string>('SPOTIFY_CALLBACK_URL'),
            scope: ['streaming', 'user-read-email', 'user-read-private']
        });
    }

    async validate(accessToken, refreshToken) {
        return await this.http
            .get('https://api.spotify.com/v1/me', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            .pipe(map((response) => ({
                name: response.data.display_name,
                accessToken: accessToken,
                refreshToken: refreshToken
            })));
    }

};
