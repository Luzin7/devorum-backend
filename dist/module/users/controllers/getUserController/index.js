import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper';
import { UserWithNotificationsPresenter } from '@module/users/presenters/userWithNotificationsPresenter';
import { GetUserUseCase } from '@module/users/useCases/getUserUseCase';
import { ErrorPresenter } from '@shared/presenters/ErrorPresenter';
import { container } from 'tsyringe';
export class GetUserController {
    async handle(req, res) {
        const { id } = req.user;
        const getUserUseCase = container.resolve(GetUserUseCase);
        const response = await getUserUseCase.execute({
            id,
        });
        if (response.isLeft()) {
            const error = response.value;
            return ErrorPresenter.toHTTP(req, res, error);
        }
        const { user } = response.value;
        return res.status(statusCodeMapper.OK).json({
            user: UserWithNotificationsPresenter.toHTTP(user),
        });
    }
}
//# sourceMappingURL=index.js.map