import { randomBytes } from 'crypto';
export class FakeCryptographyProvider {
    async hashCreator(plainText) {
        const randomSalt = randomBytes(8).toString();
        return {
            hash: `${plainText}${randomSalt}-hashed`,
            salt: randomSalt,
        };
    }
    async hashComparer({ hash, plainText, salt, }) {
        return `${plainText}${salt}-hashed` === hash;
    }
}
//# sourceMappingURL=fakeCryptographyProvider.js.map