import { Injectable } from '@nestjs/common';
import * as jose from 'jose';
import { resolve as pathResolver } from 'path';
import { readFileSync } from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtService {

    private privateKey;
    private publicKey;

    constructor(private readonly config: ConfigService) {
        const keyContent = readFileSync(pathResolver(process.cwd(), '.well-known', 'key.pem'), 'utf-8');
        this.privateKey = jose.importPKCS8(keyContent, 'RSA512');

        this.publicKey = import(pathResolver(process.cwd(), '.well-known', 'jwks.json'))
            .then((jwks) => jwks.keys[0])
            .then((key) => jose.importJWK(key, 'RS512'))
            .then((key: jose.KeyLike) => jose.exportSPKI(key));
    }

    async getPublicKey() {
        return await this.publicKey;
    }

    async sign(payload) {
        return await new jose.SignJWT(payload)
            .setProtectedHeader({ alg: 'RS512', kid: this.config.get<string>('JWT_KID') })
            .sign(await this.privateKey);
    }

};
