import { encodeSignedHmac } from "../0-making-jwts-sensitive-data/jwt-signed"

const payload = {
    username: 'johndoe',
    admin: false
}

export const jwt = encodeSignedHmac(payload);