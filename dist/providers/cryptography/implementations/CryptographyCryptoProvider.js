"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptographyCryptoProvider = void 0;
const crypto_1 = require("crypto");
class CryptographyCryptoProvider {
    async hashCreator(plainText) {
        const salt = (0, crypto_1.randomBytes)(16).toString('hex');
        const hash = (0, crypto_1.pbkdf2Sync)(plainText, salt, 10000, 64, 'sha256').toString('hex');
        return { hash, salt };
    }
    async hashComparer({ hash, plainText, salt, }) {
        const newHash = (0, crypto_1.pbkdf2Sync)(plainText, salt, 10000, 64, 'sha256').toString('hex');
        return newHash === hash;
    }
}
exports.CryptographyCryptoProvider = CryptographyCryptoProvider;
//# sourceMappingURL=CryptographyCryptoProvider.js.map