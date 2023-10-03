"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCommentController = void 0;
const statusCodeMapper_1 = require("@infra/http/statusCode/statusCodeMapper");
const createCommentUseCase_1 = require("@module/comments/useCases/createCommentUseCase");
const ErrorPresenter_1 = require("@shared/presenters/ErrorPresenter");
const tsyringe_1 = require("tsyringe");
const zod_1 = require("zod");
const createCommentBodySchema = zod_1.z.object({
    content: zod_1.z.string().min(6),
});
const createCommentParamsSchema = zod_1.z.object({
    topicId: zod_1.z.string().uuid(),
});
class CreateCommentController {
    async handle(req, res) {
        const { id } = req.user;
        const { content } = createCommentBodySchema.parse(req.body);
        const { topicId } = createCommentParamsSchema.parse(req.params);
        const createCommentUseCase = tsyringe_1.container.resolve(createCommentUseCase_1.CreateCommentUseCase);
        const response = await createCommentUseCase.execute({
            authorId: id,
            content,
            topicId,
        });
        if (response.isLeft()) {
            const error = response.value;
            return ErrorPresenter_1.ErrorPresenter.toHTTP(req, res, error);
        }
        return res.status(statusCodeMapper_1.statusCodeMapper.Created).end();
    }
}
exports.CreateCommentController = CreateCommentController;
//# sourceMappingURL=index.js.map