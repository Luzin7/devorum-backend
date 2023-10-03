import { Injectable } from '@infra/containers/Injectable';
import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper';
import { AuthConfig } from '@providers/auth/config';
import { container } from 'tsyringe';
export class AuthMiddleware {
    async middle(req, res, next) {
        const authProvider = container.resolve(Injectable.Providers.Auth);
        const token = req.cookies[AuthConfig.accessTokenCookie];
        if (!token || token === undefined) {
            return res.status(statusCodeMapper.Unauthorized).json({
                message: 'Unauthorized',
                statusCode: statusCodeMapper.Unauthorized,
            });
        }
        const { sub } = await authProvider.decrypt(token);
        if (!sub) {
            return res.status(statusCodeMapper.Unauthorized).json({
                message: 'Unauthorized',
                statusCode: statusCodeMapper.Unauthorized,
            });
        }
        req.user = {
            id: sub,
        };
        next();
    }
}
const authMiddleware = new AuthMiddleware();
export { authMiddleware };
//# sourceMappingURL=index.js.map