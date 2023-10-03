"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const statusCodeMapper_1 = require("@infra/http/statusCode/statusCodeMapper");
const createUserUseCase_1 = require("@module/users/useCases/createUserUseCase");
const ErrorPresenter_1 = require("@shared/presenters/ErrorPresenter");
const tsyringe_1 = require("tsyringe");
const zod_1 = require("zod");
const createUserBodySchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
    name: zod_1.z.string().min(4),
});
class CreateUserController {
    async handle(req, res) {
        const { email, name, password } = createUserBodySchema.parse(req.body);
        const createUserUseCase = tsyringe_1.container.resolve(createUserUseCase_1.CreateUserUseCase);
        const response = await createUserUseCase.execute({
            email,
            name,
            password,
        });
        if (response.isLeft()) {
            const error = response.value;
            return ErrorPresenter_1.ErrorPresenter.toHTTP(req, res, error);
        }
        return res.status(statusCodeMapper_1.statusCodeMapper.Created).end();
    }
}
exports.CreateUserController = CreateUserController;
//# sourceMappingURL=index.js.map