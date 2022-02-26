import { Injectable } from '@nestjs/common';
import * as jose from 'jose';
import { resolve as pathResolver } from 'path';
import { readFileSync } from 'fs';

@Injectable()
export class JwtService {

    private privateKey;

    constructor() {
        const keyContent = readFileSync(pathResolver(process.cwd(), '.well-known', 'key.pem'), 'utf-8');
        this.privateKey = jose.importPKCS8(keyContent, 'RSA512');
    }

    async sign(payload) {
        return await new jose.SignJWT(payload)
            .setProtectedHeader({ alg: 'RS512' })
            .sign(await this.privateKey);
    }

};
