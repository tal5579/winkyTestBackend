import * as jwt from 'jsonwebtoken';
import { Request } from "express";

export const ACCESS_TOKEN_KEY = "ACCESS_TOKEN"

export class JWTHelper {
    private SECRET_KEY = "wn5hTz2vHihcS83Y_7LYZEzHnlCTSYKpwHHA8vmF21TdERo1heWN"
    constructor() {
    }

    public generateToken(payload) {
        return jwt.sign(payload, this.SECRET_KEY, {
            algorithm: "HS512",
            expiresIn: 7200, // 2 hours
            issuer: "winkytest",
        });
    }

    public verify(token: string, secret): object | string {
        if (!token) {
            throw new Error('Authorization token is not provided');
        }
        try {
            return jwt.verify(token, secret);
        } catch (err) {
                throw new Error('Token access restricted');
        }
    }

    public parse = (token: string): string => {
        try {
            const payload: any = this.verify(token, this.SECRET_KEY);
            return payload.email.toString();

        } catch (err) {
            throw new Error(err.message);
        }
    };
    public getAccessToken = (req: Request): string => req.headers[ACCESS_TOKEN_KEY] as string || req.headers[ACCESS_TOKEN_KEY.toLowerCase()] as string;

}
