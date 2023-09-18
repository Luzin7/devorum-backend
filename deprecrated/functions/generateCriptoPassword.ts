import { pbkdf2Sync } from 'crypto';

function encryptPassword(password: string, salt: string): string {
  const hash = pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex');
  return hash;
}

export default encryptPassword;
