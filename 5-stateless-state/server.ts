import { hmac } from "../0-making-jwts-sensitive-data/jwt-signed";
import { toBase64 } from "../0-making-jwts-sensitive-data/utils";
const jwtKind = process.argv[2]
const jwt = require(`./${jwtKind}-jwt`).jwt;

const verifications: Record<string, (token: string, keys: any) => boolean> = {
    "none": () => true,
    "HS256": (token: string, secret: string) => {
        const algorithm = 'sha256';
        const [headerB64, payloadB64, signatureB64] = token.split('.');
        const signature = toBase64(hmac(`${headerB64}.${payloadB64}`, secretKey, algorithm));
        return signature === signatureB64;
    }
}

const secretKey = 'my-jstalks-secret'; // please, use a better secret key and keep it safe!

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getKey = async (username: string) => {
    console.log(`Fetching key for user ${username}`);
    await delay(3000); // simulate a slow database
    return secretKey + username;
};

const getAdditionalData = async (username: string) => {
    console.log(`Fetching additional data for user ${username}`);
    await delay(3000); // simulate a slow database

    if (username === 'johndoe') {
        return { 
            fullName: 'John Doe',
            email: 'john.doe@example.com'
        };
    } else {
        return {
            fullName: 'Douglas Powers',
            email: 'dr@evil.net'
        };
    }
}

const verify = async (token: string) => {
    const [headerB64, payloadB64, _] = token.split('.');
    const headerStr = Buffer.from(headerB64, 'base64').toString();
    const header = JSON.parse(headerStr);
    const payloadStr = Buffer.from(payloadB64, 'base64').toString();
    const payload = JSON.parse(payloadStr);
    const key = await getKey(payload.username);

    if (payload.exp < Date.now() / 1000) {
        // verification failed because of expired token
        return { success: false, reason: 'expired', payload};
    }

    let verified = false;
    if (header.alg in verifications) {
        verified = verifications[header.alg](token, key);
    }
    if (!verified) {
        // verification failed because of invalid signature
        return {success: false, reason: 'invalid signature'};
    }
    return {success: true, payload};
}


(async () => {
    const verification = await verify(jwt);

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

    const additionalData = await getAdditionalData(userData.username);
    const fullProfile = {...userData, ...additionalData};

    console.log(`I have successfully verified the user \x1b[33m${fullProfile.fullName}\x1b[0m, and ${adminString}`);
})();