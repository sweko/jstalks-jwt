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
    let verified = false;
    if (header.alg in verifications) {
        verified = verifications[header.alg](token, secretKey);
    }
    if (!verified) {
        throw new Error('Invalid signature');
    }
    const payloadStr = Buffer.from(payloadB64, 'base64').toString();
    const payload = JSON.parse(payloadStr);
    return payload;
}


const userData = verify(jwt);
const adminString = userData.admin 
    ? 'the user \x1b[31mis\x1b[0m an admin'
    :  'the user \x1b[32mis not\x1b[0m an admin';
console.log(`I have successfully verified the user \x1b[33m${userData.username}\x1b[0m, and ${adminString}`);