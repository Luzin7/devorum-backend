"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTopicController = void 0;
const statusCodeMapper_1 = require("@infra/http/statusCode/statusCodeMapper");
const createTopicUseCase_1 = require("@module/topics/useCases/createTopicUseCase");
const ErrorPresenter_1 = require("@shared/presenters/ErrorPresenter");
const tsyringe_1 = require("tsyringe");
const zod_1 = require("zod");
const createTopicBodySchema = zod_1.z.object({
    content: zod_1.z.string().min(6),
    title: zod_1.z.string().min(6).max(60),
});
class CreateTopicController {
    async handle(req, res) {
        const { id } = req.user;
        const { content, title } = createTopicBodySchema.parse(req.body);
        const createTopicUseCase = tsyringe_1.container.resolve(createTopicUseCase_1.CreateTopicUseCase);
        const response = await createTopicUseCase.execute({
            authorId: id,
            content,
            title,
        });
        if (response.isLeft()) {
            const error = response.value;
            return ErrorPresenter_1.ErrorPresenter.toHTTP(req, res, error);
        }
        return res.status(statusCodeMapper_1.statusCodeMapper.Created).end();
    }
}
exports.CreateTopicController = CreateTopicController;
//# sourceMappingURL=index.js.map