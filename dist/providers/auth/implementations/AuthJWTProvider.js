import { env } from '@env/index';
import jwt from 'jsonwebtoken';
export class AuthJWTProvider {
    async encrypt(userId, role = 'access') {
        const secretKey = Buffer.from(env.JWT_PRIVATE_KEY, 'base64');
        const token = jwt.sign({ sub: userId }, secretKey, {
            algorithm: 'RS256',
            expiresIn: role === 'access'
                ? 60 * 5
                : 60 * 60 * 24 * 7,
        });
        return token;
    }
    async decrypt(token) {
        const publicKey = Buffer.from(env.JWT_PUBLIC_KEY, 'base64');
        try {
            const { sub } = jwt.verify(token, publicKey, {
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
//# sourceMappingURL=AuthJWTProvider.js.map