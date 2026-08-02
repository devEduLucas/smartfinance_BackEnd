import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.js";

export interface TokenPayload {
  userId: number;
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  } as jwt.SignOptions);
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, jwtConfig.secret) as TokenPayload;
}
