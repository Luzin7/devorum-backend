"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCommentController = void 0;
const statusCodeMapper_1 = require("@infra/http/statusCode/statusCodeMapper");
const commentPresenter_1 = require("@module/comments/presenters/commentPresenter");
const updateCommentUseCase_1 = require("@module/comments/useCases/updateCommentUseCase");
const ErrorPresenter_1 = require("@shared/presenters/ErrorPresenter");
const tsyringe_1 = require("tsyringe");
const zod_1 = require("zod");
const updateCommentBodySchema = zod_1.z.object({
    content: zod_1.z.string().optional(),
});
const updateCommentParamsSchema = zod_1.z.object({
    commentId: zod_1.z.string().uuid(),
});
class UpdateCommentController {
    async handle(req, res) {
        const { id } = req.user;
        const { commentId } = updateCommentParamsSchema.parse(req.params);
        const { content } = updateCommentBodySchema.parse(req.body);
        const updateCommentUseCase = tsyringe_1.container.resolve(updateCommentUseCase_1.UpdateCommentUseCase);
        const response = await updateCommentUseCase.execute({
            authorId: id,
            commentId,
            content,
        });
        if (response.isLeft()) {
            const error = response.value;
            return ErrorPresenter_1.ErrorPresenter.toHTTP(req, res, error);
        }
        const { comment } = response.value;
        return res.status(statusCodeMapper_1.statusCodeMapper.OK).json({
            comment: commentPresenter_1.CommentPresenter.toHTTP(comment),
        });
    }
}
exports.UpdateCommentController = UpdateCommentController;
//# sourceMappingURL=index.js.map