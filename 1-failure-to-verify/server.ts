const jwtKind = process.argv[2]
const jwt = require(`./${jwtKind}-jwt`).jwt;

const verify = (token: string) => {
    const [headerB64, payloadB64, signatureB64] = token.split('.');
    const headerStr = Buffer.from(headerB64, 'base64').toString();
    const header = JSON.parse(headerStr);
    const payloadStr = Buffer.from(payloadB64, 'base64').toString();
    const payload = JSON.parse(payloadStr);
    return payload;
}


const userData = verify(jwt);
const adminString = userData.admin 
    ? 'the user \x1b[31mis\x1b[0m an admin'
    :  'the user \x1b[32mis not\x1b[0m an admin';
console.log(`I have successfully verified the user \x1b[33m${userData.username}\x1b[0m, and ${adminString}`);