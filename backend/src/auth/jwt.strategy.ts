import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtService } from './jwt.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor(jwtService: JwtService) {
        super({
            jwtFromRequest(request) {
                return request.cookies['SQJWT'];
            },
            ignoreExpiration: false,
            async secretOrKeyProvider(_request, _token, done) {
                const key = await jwtService.getPublicKey();
                done(null, key);
            }
        });
    }

    async validate(payload) {
        return payload;
    }

}
