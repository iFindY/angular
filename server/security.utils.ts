import * as argo2 from 'argon2';

const util = require('util');
const crypto = require('crypto');

export const randomBytes = util.promisify(crypto.randomBytes);

export async function createCsrfToken(sessionId: string) {
  return argo2.hash(sessionId);
  //return randomBytes(32).then(bytes => bytes.toString('hex'));
}

