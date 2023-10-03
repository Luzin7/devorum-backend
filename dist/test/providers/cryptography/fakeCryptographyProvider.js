"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeCryptographyProvider = void 0;
const crypto_1 = require("crypto");
class FakeCryptographyProvider {
    async hashCreator(plainText) {
        const randomSalt = (0, crypto_1.randomBytes)(8).toString();
        return {
            hash: `${plainText}${randomSalt}-hashed`,
            salt: randomSalt,
        };
    }
    async hashComparer({ hash, plainText, salt, }) {
        return `${plainText}${salt}-hashed` === hash;
    }
}
exports.FakeCryptographyProvider = FakeCryptographyProvider;
//# sourceMappingURL=fakeCryptographyProvider.js.map