import { encodeSignedHmac } from "../0-making-jwts-sensitive-data/jwt-signed"

const payload = {
    username: 'johndoe',
    admin: false,
    exp: Math.floor(Date.now() / 1000) + (60 * 60)
}

export const jwt = encodeSignedHmac(payload);