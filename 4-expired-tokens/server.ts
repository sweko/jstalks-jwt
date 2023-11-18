import { hmac } from "../0-making-jwts-sensitive-data/jwt-signed";
import { toBase64 } from "../0-making-jwts-sensitive-data/utils";

const jwtKind = process.argv[2]
const jwt = require(`./${jwtKind}-jwt`).jwt;

const secretKey = 'my-jstalks-secret'; // please, use a better secret key and keep it safe!

const verifications: Record<string, (token: string, keys: any) => boolean> = {
    "none": () => true,
    "HS256": (token: string, secret: string) => {
        const algorithm = 'sha256';
        const [headerB64, payloadB64, signatureB64] = token.split('.');
        const signature = toBase64(hmac(`${headerB64}.${payloadB64}`, secretKey, algorithm));
        return signature === signatureB64;
    }
}

const verify = (token: string) => {
    const [headerB64, payloadB64, signatureB64] = token.split('.');
    const headerStr = Buffer.from(headerB64, 'base64').toString();
    const header = JSON.parse(headerStr);
    const payloadStr = Buffer.from(payloadB64, 'base64').toString();
    const payload = JSON.parse(payloadStr);
    if (payload.exp < Date.now() / 1000) {
        // verification failed because of expired token
        return { success: false, reason: 'expired', payload};
    }

    let verified = false;
    if (header.alg in verifications) {
        verified = verifications[header.alg](token, secretKey);
    }
    if (!verified) {
        // verification failed because of invalid signature
        return {success: false, reason: 'invalid signature'};
    }
    return {success: true, payload};
}

const verification = verify(jwt);

let userData = verification.payload;

if (!verification.success) {
    if (verification.reason === 'expired') {
        console.log('You poor expired token, let me be helpful and refresh you');
        userData = {...verification.payload, exp: Math.floor(Date.now() / 1000) + 60 * 60};
    } else {
        throw new Error('Invalid signature');
    }
}
const adminString = userData.admin 
    ? 'the user \x1b[31mis\x1b[0m an admin'
    :  'the user \x1b[32mis not\x1b[0m an admin';

const expiry = new Date(userData.exp * 1000);

console.log(`I have successfully verified the user \x1b[33m${userData.username}\x1b[0m, and ${adminString}`);
console.log(`The access expires at ${expiry}`);