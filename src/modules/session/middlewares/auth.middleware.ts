import {NextFunction, Request, RequestHandler, Response} from "express";
import jwtVerify from 'jose/jwt/verify';
import parseJwk from 'jose/jwk/parse';
import { JWTVerifyResult } from "jose/webcrypto/types";

export const AuthMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  /*  if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        const user_id = 'un_id';

        parseJwk({
            alg: 'ES256',
            crv: 'P-256',
            kty: 'EC',
            x: 'ySK38C1jBdLwDsNWKzzBHqKYEE5Cgv-qjWvorUXk9fw',
            y: '_LeQBw07cf5t57Iavn4j-BqJsAD1dpoz8gokd3sBsOo'
        })
            .then(publicKey => jwtVerify(token, publicKey, {
                issuer: 'urn:jwt:issuer',
                audience: `urn:${user_id}:audience`
            }))
            .then((result: JWTVerifyResult) => {
                console.log(result);
            })
            .catch(err => {
                if (err.code === 'ERR_JWS_INVALID')
                    res.status(403).end();
            })
    }
    else if (req.originalUrl === '/ws/auth/sign') */next();
   // else res.status(403).end();
};