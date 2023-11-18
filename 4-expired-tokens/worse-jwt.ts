import { encodeUnsigned } from "../0-making-jwts-sensitive-data/jwt-unsigned";

const payload = {
    username: 'johndoe',
    admin: true,
    exp: 2**31 - 1 // 2038, that's the real end of time
}

export const jwt = encodeUnsigned(payload);