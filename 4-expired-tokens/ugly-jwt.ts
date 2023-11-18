import { toBase64 } from "../0-making-jwts-sensitive-data/utils"
import { jwt as goodJwt } from "./good-jwt"

const [goodHeader, goodPayload, goodSignature] = goodJwt.split('.');

const badPayload = toBase64(JSON.stringify({
    username: 'dr-evil',
    admin: true,
    exp: 0
}));

export const jwt = `${goodHeader}.${badPayload}.${goodSignature}`;





