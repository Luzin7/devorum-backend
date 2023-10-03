"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = exports.AuthMiddleware = void 0;
const Injectable_1 = require("@infra/containers/Injectable");
const statusCodeMapper_1 = require("@infra/http/statusCode/statusCodeMapper");
const config_1 = require("@providers/auth/config");
const tsyringe_1 = require("tsyringe");
class AuthMiddleware {
    async middle(req, res, next) {
        const authProvider = tsyringe_1.container.resolve(Injectable_1.Injectable.Providers.Auth);
        const token = req.cookies[config_1.AuthConfig.accessTokenCookie];
        if (!token || token === undefined) {
            return res.status(statusCodeMapper_1.statusCodeMapper.Unauthorized).json({
                message: 'Unauthorized',
                statusCode: statusCodeMapper_1.statusCodeMapper.Unauthorized,
            });
        }
        const { sub } = await authProvider.decrypt(token);
        if (!sub) {
            return res.status(statusCodeMapper_1.statusCodeMapper.Unauthorized).json({
                message: 'Unauthorized',
                statusCode: statusCodeMapper_1.statusCodeMapper.Unauthorized,
            });
        }
        req.user = {
            id: sub,
        };
        next();
    }
}
exports.AuthMiddleware = AuthMiddleware;
const authMiddleware = new AuthMiddleware();
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=index.js.map