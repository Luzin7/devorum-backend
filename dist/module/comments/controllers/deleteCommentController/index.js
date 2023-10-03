"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCommentController = void 0;
const statusCodeMapper_1 = require("@infra/http/statusCode/statusCodeMapper");
const deleteCommentUseCase_1 = require("@module/comments/useCases/deleteCommentUseCase");
const ErrorPresenter_1 = require("@shared/presenters/ErrorPresenter");
const tsyringe_1 = require("tsyringe");
const zod_1 = require("zod");
const deleteCommentParamsSchema = zod_1.z.object({
    commentId: zod_1.z.string().uuid(),
    topicId: zod_1.z.string().uuid(),
});
class DeleteCommentController {
    async handle(req, res) {
        const { id } = req.user;
        const { commentId, topicId } = deleteCommentParamsSchema.parse(req.params);
        const deleteCommentUseCase = tsyringe_1.container.resolve(deleteCommentUseCase_1.DeleteCommentUseCase);
        const response = await deleteCommentUseCase.execute({
            authorId: id,
            commentId,
            topicId,
        });
        if (response.isLeft()) {
            const error = response.value;
            return ErrorPresenter_1.ErrorPresenter.toHTTP(req, res, error);
        }
        return res.status(statusCodeMapper_1.statusCodeMapper.NoContent).end();
    }
}
exports.DeleteCommentController = DeleteCommentController;
//# sourceMappingURL=index.js.map