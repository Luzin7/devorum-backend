import { pbkdf2Sync, randomBytes } from 'crypto';
export class CryptographyCryptoProvider {
    async hashCreator(plainText) {
        const salt = randomBytes(16).toString('hex');
        const hash = pbkdf2Sync(plainText, salt, 10000, 64, 'sha256').toString('hex');
        return { hash, salt };
    }
    async hashComparer({ hash, plainText, salt, }) {
        const newHash = pbkdf2Sync(plainText, salt, 10000, 64, 'sha256').toString('hex');
        return newHash === hash;
    }
}
//# sourceMappingURL=CryptographyCryptoProvider.js.map