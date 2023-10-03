import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper';
import { DeleteUserUseCase } from '@module/users/useCases/deleteUserUseCase';
import { ErrorPresenter } from '@shared/presenters/ErrorPresenter';
import { container } from 'tsyringe';
export class DeleteUserController {
    async handle(req, res) {
        const { id } = req.user;
        const deleteUserUseCase = container.resolve(DeleteUserUseCase);
        const response = await deleteUserUseCase.execute({
            id,
        });
        if (response.isLeft()) {
            const error = response.value;
            return ErrorPresenter.toHTTP(req, res, error);
        }
        return res.status(statusCodeMapper.NoContent).end();
    }
}
//# sourceMappingURL=index.js.map