import { encodeUnsigned } from "../0-making-jwts-sensitive-data/jwt-unsigned";

const payload = {
    username: 'johndoe',
    admin: true,
    exp: 0
}

export const jwt = encodeUnsigned(payload);