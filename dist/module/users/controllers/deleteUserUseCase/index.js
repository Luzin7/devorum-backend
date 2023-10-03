"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserController = void 0;
const statusCodeMapper_1 = require("@infra/http/statusCode/statusCodeMapper");
const deleteUserUseCase_1 = require("@module/users/useCases/deleteUserUseCase");
const ErrorPresenter_1 = require("@shared/presenters/ErrorPresenter");
const tsyringe_1 = require("tsyringe");
class DeleteUserController {
    async handle(req, res) {
        const { id } = req.user;
        const deleteUserUseCase = tsyringe_1.container.resolve(deleteUserUseCase_1.DeleteUserUseCase);
        const response = await deleteUserUseCase.execute({
            id,
        });
        if (response.isLeft()) {
            const error = response.value;
            return ErrorPresenter_1.ErrorPresenter.toHTTP(req, res, error);
        }
        return res.status(statusCodeMapper_1.statusCodeMapper.NoContent).end();
    }
}
exports.DeleteUserController = DeleteUserController;
//# sourceMappingURL=index.js.map