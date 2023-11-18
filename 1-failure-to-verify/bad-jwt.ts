import { encodeUnsigned } from "../0-making-jwts-sensitive-data/jwt-unsigned";

const payload = {
    username: 'johndoe',
    admin: true
}

export const jwt = encodeUnsigned(payload);