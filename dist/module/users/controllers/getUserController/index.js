"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserController = void 0;
const statusCodeMapper_1 = require("@infra/http/statusCode/statusCodeMapper");
const userWithNotificationsPresenter_1 = require("@module/users/presenters/userWithNotificationsPresenter");
const getUserUseCase_1 = require("@module/users/useCases/getUserUseCase");
const ErrorPresenter_1 = require("@shared/presenters/ErrorPresenter");
const tsyringe_1 = require("tsyringe");
class GetUserController {
    async handle(req, res) {
        const { id } = req.user;
        const getUserUseCase = tsyringe_1.container.resolve(getUserUseCase_1.GetUserUseCase);
        const response = await getUserUseCase.execute({
            id,
        });
        if (response.isLeft()) {
            const error = response.value;
            return ErrorPresenter_1.ErrorPresenter.toHTTP(req, res, error);
        }
        const { user } = response.value;
        return res.status(statusCodeMapper_1.statusCodeMapper.OK).json({
            user: userWithNotificationsPresenter_1.UserWithNotificationsPresenter.toHTTP(user),
        });
    }
}
exports.GetUserController = GetUserController;
//# sourceMappingURL=index.js.map