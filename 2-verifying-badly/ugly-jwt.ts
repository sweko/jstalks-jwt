import { encodeUnsigned } from "../0-making-jwts-sensitive-data/jwt-unsigned";
import { toBase64 } from "../0-making-jwts-sensitive-data/utils"
import { jwt as goodJwt } from "./good-jwt"

// const [goodHeader, goodPayload, goodSignature] = goodJwt.split('.');

const badPayload = {
    username: 'dr-evil',
    admin: true
};

export const jwt = encodeUnsigned(badPayload)
