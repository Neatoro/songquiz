import { HttpService } from '@nestjs/axios';
import { ExecutionContext, Global, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from './jwt.service';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {

    constructor(private readonly jwtService: JwtService, private readonly httpService: HttpService, private readonly config: ConfigService) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const jwt = request.cookies['SQJWT'];

        try {
            const jwtData = (await this.jwtService.verify(jwt)).payload;
            const timeUntilExp = Math.floor(jwtData.exp - (Date.now() / 1000));
            if (timeUntilExp < 60) {
                const response = context.switchToHttp().getResponse();
                response.cookie('SQJWT', await this.jwtService.sign({
                    ...jwtData,
                    accessToken: await this.refreshAccessToken(jwtData.refreshToken)
                }));
            }

            return super.canActivate(context) as Promise<boolean>;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    refreshAccessToken(refreshToken) {
        return new Promise((resolve) => {
            const body = new URLSearchParams();
            body.append('grant_type', 'refresh_token');
            body.append('refresh_token', refreshToken);

            this.httpService.post('https://accounts.spotify.com/api/token', body, {
                auth: {
                    username: this.config.get<string>('SPOTIFY_CLIENT_ID'),
                    password: this.config.get<string>('SPOTIFY_CLIENT_SECRET')
                }
            }).subscribe((response) => resolve(response.data.access_token));
        });
    }

};
