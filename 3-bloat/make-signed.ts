import { encodeSignedHmac } from "../0-making-jwts-sensitive-data/jwt-signed";
import { payload, bloatedPayload } from "./data";

const signed = encodeSignedHmac(payload);
console.log('Signed JWT:');
console.log(signed);
console.log(`JWT length: ${signed.length}`);

const signedBloated = encodeSignedHmac(bloatedPayload);
console.log('Signed JWT with bloated data:');
console.log(signedBloated);
console.log(`JWT length: ${signedBloated.length}`);