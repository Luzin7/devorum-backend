import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper';
import { CreateSessionUseCase } from '@module/users/useCases/createSessionUseCase';
import { AuthConfig } from '@providers/auth/config';
import { ErrorPresenter } from '@shared/presenters/ErrorPresenter';
import { container } from 'tsyringe';
import { z } from 'zod';
const createSessionBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});
export class CreateSessionController {
    async handle(req, res) {
        const { email, password } = createSessionBodySchema.parse(req.body);
        const createSessionUseCase = container.resolve(CreateSessionUseCase);
        const response = await createSessionUseCase.execute({
            email,
            password,
        });
        if (response.isLeft()) {
            const error = response.value;
            return ErrorPresenter.toHTTP(req, res, error);
        }
        const { accessToken, refreshToken } = response.value;
        res.cookie(AuthConfig.accessTokenCookie, accessToken, {
            maxAge: 1000 * 60 * 5,
            httpOnly: true,
            path: '/',
            sameSite: false,
            secure: true,
        });
        res.cookie(AuthConfig.accessTokenCookie, refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            path: '/',
            sameSite: false,
            secure: true,
        });
        return res.status(statusCodeMapper.NoContent).end();
    }
}
//# sourceMappingURL=index.js.map