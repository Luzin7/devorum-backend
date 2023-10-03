"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthJWTProvider = void 0;
const index_1 = require("@env/index");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthJWTProvider {
    async encrypt(userId, role = 'access') {
        const secretKey = Buffer.from(index_1.env.JWT_PRIVATE_KEY, 'base64');
        const token = jsonwebtoken_1.default.sign({ sub: userId }, secretKey, {
            algorithm: 'RS256',
            expiresIn: role === 'access'
                ? 60 * 5
                : 60 * 60 * 24 * 7,
        });
        return token;
    }
    async decrypt(token) {
        const publicKey = Buffer.from(index_1.env.JWT_PUBLIC_KEY, 'base64');
        try {
            const { sub } = jsonwebtoken_1.default.verify(token, publicKey, {
                algorithms: ['RS256'],
            });
            return {
                sub: sub ? sub.toString() : null,
            };
        }
        catch (err) {
            return {
                sub: null,
            };
        }
    }
}
exports.AuthJWTProvider = AuthJWTProvider;
//# sourceMappingURL=AuthJWTProvider.js.map