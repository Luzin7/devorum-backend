"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSessionController = void 0;
const statusCodeMapper_1 = require("@infra/http/statusCode/statusCodeMapper");
const createSessionUseCase_1 = require("@module/users/useCases/createSessionUseCase");
const config_1 = require("@providers/auth/config");
const ErrorPresenter_1 = require("@shared/presenters/ErrorPresenter");
const tsyringe_1 = require("tsyringe");
const zod_1 = require("zod");
const createSessionBodySchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
});
class CreateSessionController {
    async handle(req, res) {
        const { email, password } = createSessionBodySchema.parse(req.body);
        const createSessionUseCase = tsyringe_1.container.resolve(createSessionUseCase_1.CreateSessionUseCase);
        const response = await createSessionUseCase.execute({
            email,
            password,
        });
        if (response.isLeft()) {
            const error = response.value;
            return ErrorPresenter_1.ErrorPresenter.toHTTP(req, res, error);
        }
        const { accessToken, refreshToken } = response.value;
        res.cookie(config_1.AuthConfig.accessTokenCookie, accessToken, {
            maxAge: 1000 * 60 * 5,
            httpOnly: true,
            path: '/',
            sameSite: false,
            secure: true,
        });
        res.cookie(config_1.AuthConfig.accessTokenCookie, refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            path: '/',
            sameSite: false,
            secure: true,
        });
        return res.status(statusCodeMapper_1.statusCodeMapper.NoContent).end();
    }
}
exports.CreateSessionController = CreateSessionController;
//# sourceMappingURL=index.js.map