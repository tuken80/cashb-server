import { Request, Response } from "express";
import SignJWT from 'jose/jwt/sign';
import parseJwk from 'jose/jwk/parse';

export class AuthController {
    public signin(req: Request, res: Response) {
        const user_id = 'un_id';

        return parseJwk({
            alg: 'ES256',
            crv: 'P-256',
            kty: 'EC',
            d: 'VhsfgSRKcvHCGpLyygMbO_YpXc7bVKwi12KQTE4yOR4',
            x: 'ySK38C1jBdLwDsNWKzzBHqKYEE5Cgv-qjWvorUXk9fw',
            y: '_LeQBw07cf5t57Iavn4j-BqJsAD1dpoz8gokd3sBsOo'
        })
        .then(privateKey => new SignJWT({ 'urn:public:claim': true })
            .setProtectedHeader({ alg: 'ES256' })
            .setIssuedAt()
            .setIssuer('urn:jose:issuer')
            .setAudience(`urn:${user_id}:audience`)
            .setExpirationTime('2h')
            .sign(privateKey)
        )
        .then(jwt => res.status(200).json({
            token: jwt
        }));
    }
}
